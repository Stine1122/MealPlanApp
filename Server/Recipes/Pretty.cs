using System.Text.Json.Serialization;

public class Ingredient
{
    [JsonPropertyName("name")]
    public required string Name { get; set; }

    [JsonPropertyName("quantity")]
    public required string Quantity { get; set; }
}

public class Recipe
{
    [JsonPropertyName("day")]
    public required string Day { get; set; }

    [JsonPropertyName("recipe_name")]
    public required string RecipeName { get; set; }

    [JsonPropertyName("allergies")]
    public string[]? Allergies { get; set; }

    [JsonPropertyName("servings")]
    public required int Servings { get; set; }

    [JsonPropertyName("prep_time_minutes")]
    public int? PrepTimeMinutes { get; set; }

    [JsonPropertyName("bake_time_minutes")]
    public int? BakeTimeMinutes { get; set; }

    [JsonPropertyName("total_time_minutes")]
    public int? TotalTimeMinutes { get; set; }

    [JsonPropertyName("ingredients")]
    public required List<Ingredient> Ingredients { get; set; }

    [JsonPropertyName("instructions")]
    public required List<string> Instructions { get; set; }
}