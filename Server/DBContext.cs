using Microsoft.EntityFrameworkCore;

public class MealPlanContext : DbContext
{
    public MealPlanContext(DbContextOptions<MealPlanContext> options) : base(options) { }

    public DbSet<Ingredient> Ingredients { get; set; }
    public DbSet<Recipe> Recipes { get; set; }
    public DbSet<RecipeIngredient> RecipeIngredients { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Composite primary key for join table
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

        modelBuilder.Entity<Recipe>()
            .Property(r => r.Allergies)
            .HasColumnType("jsonb");

        modelBuilder.Entity<Recipe>()
            .Property(r => r.Instructions)
            .HasColumnType("jsonb");

        modelBuilder.Entity<Recipe>()
            .Property(r => r.ShoppingList)
            .HasColumnType("jsonb");
    }
}