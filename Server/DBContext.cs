using Microsoft.EntityFrameworkCore;

public class MealPlanContext : DbContext
{
    public MealPlanContext(DbContextOptions<MealPlanContext> options) : base(options) { }

    public DbSet<Ingredient> Ingredients { get; set; }
    public DbSet<Recipe> Recipes { get; set; }
    public DbSet<RecipeIngredient> RecipeIngredients { get; set; }
    private List<string> model_builder_entity_jsonb = [nameof(Recipe.Allergies), nameof(Recipe.Ingredients), nameof(Recipe.Instructions)];

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<RecipeIngredient>()
            .HasKey(ri => new { ri.RecipeId, ri.IngredientId });

        modelBuilder.Entity<RecipeIngredient>()
            .HasOne(ri => ri.Recipe)
            .WithMany(r => r.RecipeIngredients)
            .HasForeignKey(ri => ri.RecipeId);

        modelBuilder.Entity<RecipeIngredient>()
            .HasOne(ri => ri.Ingredient)
            .WithMany(i => i.RecipeIngredients)
            .HasForeignKey(ri => ri.IngredientId);

        foreach (var property in model_builder_entity_jsonb)
        {
            modelBuilder.Entity<Recipe>()
                .Property(property)
                .HasColumnType("jsonb");
        }
    }
}