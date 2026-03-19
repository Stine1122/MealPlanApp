using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations.Schema;

public class Ingredient
{
    public int Id { get; set; }

    [JsonPropertyName("name")]
    public required string Name { get; set; }

    [JsonPropertyName("quantity")]
    public required string Quantity { get; set; }

    // Navigation
    public List<RecipeIngredient> RecipeIngredients { get; set; } = [];
}

public class Recipe
{
    public int Id { get; set; }

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

    [NotMapped]
    [JsonPropertyName("ingredients")]
    public required List<Ingredient> Ingredients { get; set; }

    [JsonPropertyName("instructions")]
    public required List<string> Instructions { get; set; }

    [JsonPropertyName("shoppinglist")]
    public required List<Ingredient> ShoppingList { get; set; }

    // For database navigation 👇
    [NotMapped]
    public List<RecipeIngredient> RecipeIngredients { get; set; } = [];
}

// Explicit join table (allows extra fields like Quantity per recipe)
public class RecipeIngredient
{
    public int RecipeId { get; set; }
    public Recipe Recipe { get; set; } = null!;

    public int IngredientId { get; set; }
    public Ingredient Ingredient { get; set; } = null!;

    public required string Quantity { get; set; } // quantity is per-recipe, not global
}