using Microsoft.Extensions.FileProviders;
using Google.GenAI;
using MyApp.Services;

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

app.Run();
