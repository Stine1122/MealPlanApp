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

    public async Task<List<Recipe>> GenerateMealPlan(GenerateContentRequest request)
    {
        var schema = RecipeSchema.Value;

        var prompt = request.Mode == "twoday"
        ? MealPlanPrompts.TwoDay(request.Fridge, request.Freezer, request.Prompt, request.Persons, request.Allergies)
        : MealPlanPrompts.EachDay(request.Fridge, request.Freezer, request.Prompt, request.Persons, request.Allergies);

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

        return JsonSerializer.Deserialize<List<Recipe>>(json ?? "[]") ?? [];
    }
}

public record GenerateContentRequest(
    string Prompt,
    int Persons,
    List<string> Fridge,
    List<string> Freezer,
    List<string> Allergies,
    string Mode
);