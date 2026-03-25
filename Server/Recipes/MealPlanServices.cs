using System.Text.Json;
using Google.GenAI;
using Google.GenAI.Types;
using MyApp.Prompts;
using MyApp.RSchema;

namespace MyApp.Services;

public class MealPlanService
{
    private readonly Client _client;

    public MealPlanService(Client client)
    {
        _client = client;
    }

    private static string CombineQuantities(IEnumerable<string> quantities)
    {
        double total = 0;
        string unit = "";

        foreach (var q in quantities)
        {
            var match = System.Text.RegularExpressions.Regex.Match(q.Trim(), @"^([\d,.]+)\s*([a-zA-Z]*)$");
            if (match.Success)
            {
                total += double.Parse(match.Groups[1].Value, System.Globalization.CultureInfo.InvariantCulture);
                unit = match.Groups[2].Value;
            }
        }

        return total > 0 ? $"{total} {unit}" : string.Join(" + ", quantities);
    }

    public async Task<MealPlan> GenerateMealPlan(GenerateContentRequest request)
    {
        var schema = RecipeSchema.Value;

        var prompt = request.Mode == "eachday"
        ? MealPlanPrompts.EachDay(request.Fridge, request.Freezer, request.Pantry, request.Persons, request.Allergies, request.ShoppingList, request.ExtraPrompt)
        : MealPlanPrompts.TwoDay(request.Fridge, request.Freezer, request.Pantry, request.Persons, request.Allergies, request.ShoppingList, request.ExtraPrompt);

        var response = await _client.Models.GenerateContentAsync(
            model: "models/gemini-3-flash-preview",
            contents: prompt,
            config: new GenerateContentConfig
            {
                ResponseMimeType = "application/json",
                ResponseSchema = schema
            }
        );

        var json = response.Text?.Trim();

        if (json?.StartsWith("```") == true)
        {
            json = json.Replace("```json", "").Replace("```", "").Trim();
        }

        var mealPlan = JsonSerializer.Deserialize<MealPlan>(json ?? "{}") ?? new MealPlan { Recipes = [] };
        var recipes = mealPlan.Recipes;

        var combinedShoppingList = recipes
            .SelectMany(r => r.ShoppingList)
            .GroupBy(ing => ing.Name.ToLower())
            .Select(g => new IngredientDto
            {
                Name = g.First().Name,
                Quantity = CombineQuantities(g.Select(i => i.Quantity))
            })
            .ToList();

        if (recipes.Count > 0)
            recipes[0].ShoppingList = combinedShoppingList;

        return mealPlan;
    }
}

public record GenerateContentRequest(
    string ExtraPrompt,
    int Persons,
    List<string> Fridge,
    List<string> Freezer,
    List<string> Pantry,
    List<string> Allergies,
    string Mode,
    List<string> ShoppingList 
);