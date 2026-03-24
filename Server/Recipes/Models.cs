using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations.Schema;

public class Ingredient
{
    public int Id { get; set; }

    [JsonPropertyName("name")]
    public required string Name { get; set; }

    [NotMapped]
    [JsonPropertyName("quantity")]
    public required string Quantity { get; set; }

    public List<RecipeIngredient> RecipeIngredients { get; set; } = [];
}

public class IngredientDto
{
    [JsonPropertyName("name")]
    public required string Name { get; set; }

    [JsonPropertyName("quantity")]
    public required string Quantity { get; set; }
}

public class Recipe
{
    public int Id { get; set; }

    [NotMapped]
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

    [JsonPropertyName("cooking_time_minutes")]
    public int? CookingTimeMinutes { get; set; }

    [JsonPropertyName("total_time_minutes")]
    public int? TotalTimeMinutes { get; set; }

    [JsonPropertyName("ingredients")]
    public required List<IngredientDto> Ingredients { get; set; }

    [JsonPropertyName("instructions")]
    public required List<string> Instructions { get; set; }

    [NotMapped]
    [JsonPropertyName("shoppinglist")]
    public required List<IngredientDto> ShoppingList { get; set; }

    public List<RecipeIngredient> RecipeIngredients { get; set; } = [];
}

public class RecipeIngredient
{
    public int RecipeId { get; set; }
    public Recipe Recipe { get; set; } = null!;

    public int IngredientId { get; set; }
    public Ingredient Ingredient { get; set; } = null!;

    public required string Quantity { get; set; }
}