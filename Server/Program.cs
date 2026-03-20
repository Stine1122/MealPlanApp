using Microsoft.Extensions.FileProviders;
using Google.GenAI;
using MyApp.Services;
using Microsoft.EntityFrameworkCore;
using Npgsql;

var builder = WebApplication.CreateBuilder();

// Add services to the container
builder.Services.AddOpenApi();

// allow everything via CORS so external clients can call the API
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod());
});

// configure a single shared GenAI client instance with the API key from configuration
builder.Services.AddSingleton(sp =>
{
    var apiKey = builder.Configuration["GoogleApiKey"]
             ?? throw new InvalidOperationException("GoogleApiKey is missing");
    return new Client(apiKey: apiKey);
});

builder.Services.AddDbContext<MealPlanContext>(options =>
    options.UseNpgsql(
        new NpgsqlDataSourceBuilder(builder.Configuration.GetConnectionString("DefaultConnection"))
            .EnableDynamicJson()
            .Build()
    ));


// register the meal plan service that wraps the GenAI calls and JSON parsing
builder.Services.AddScoped<MealPlanService>();

var app = builder.Build();

// Serve files from ../ClientApp if it exists (simple CDN‑served React app)
var clientAppPath = Path.Combine(builder.Environment.ContentRootPath, "..", "ClientApp");
if (Directory.Exists(clientAppPath))
{
    var provider = new PhysicalFileProvider(clientAppPath);
    var defaultFilesOptions = new DefaultFilesOptions { FileProvider = provider };
    var staticFilesOptions = new StaticFileOptions { FileProvider = provider };
    app.UseDefaultFiles(defaultFilesOptions);
    app.UseStaticFiles(staticFilesOptions);
}

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// enable CORS middleware early in the pipeline
app.UseCors();

app.MapPost("/generatecontent", async (MealPlanService mealPlanService, GenerateContentRequest request) =>
{
    try
    {
        var recipes = await mealPlanService.GenerateMealPlan(request);
        return Results.Ok(recipes);
    }
    catch (ServerError ex)
    {
        Console.WriteLine($"Gemini overload: {ex.Message}");
        return Results.Problem("Gemini API is overloaded. Please try again.");
    }
    catch (Exception ex)
    {
        Console.WriteLine(ex);
        return Results.Problem("Unexpected server error.");
    }
});

app.MapPost("/saverecipes", async (MealPlanContext db, Recipe recipe) =>
{
    try
    {
        var savedRecipe = new Recipe
        {
            RecipeName = recipe.RecipeName,
            Allergies = recipe.Allergies,
            Servings = recipe.Servings,
            PrepTimeMinutes = recipe.PrepTimeMinutes,
            CookingTimeMinutes = recipe.CookingTimeMinutes,
            TotalTimeMinutes = recipe.TotalTimeMinutes,
            Instructions = recipe.Instructions,
            Ingredients = recipe.Ingredients,
            ShoppingList = recipe.ShoppingList,
            Day = recipe.Day
        };

        db.Recipes.Add(savedRecipe);
        await db.SaveChangesAsync(); // Save recipe first to get its Id

        foreach (var ing in recipe.Ingredients)
        {
            // Check if ingredient already exists in the database
            var existing = await db.Ingredients
                .FirstOrDefaultAsync(i => i.Name.ToLower() == ing.Name.ToLower());

            if (existing == null)
            {
                existing = new Ingredient { Name = ing.Name, Quantity = ing.Quantity };
                db.Ingredients.Add(existing);
                await db.SaveChangesAsync();
            }

            // Link ingredient to recipe in join table
            db.RecipeIngredients.Add(new RecipeIngredient
            {
                RecipeId = savedRecipe.Id,
                IngredientId = existing.Id,
                Quantity = ing.Quantity
            });
        }

        await db.SaveChangesAsync();
        return Results.Ok(savedRecipe.Id);
    }
    catch (Exception ex)
    {
        Console.WriteLine(ex);
        return Results.Problem("Failed to save recipe.");
    }
});

app.MapDelete("/recipes/{id}", async (MealPlanContext db, int id) =>
{
    var recipe = await db.Recipes.FindAsync(id);
    if (recipe == null) return Results.NotFound();

    db.Recipes.Remove(recipe);
    await db.SaveChangesAsync();
    return Results.Ok("Recipe deleted");
});

app.Run();
