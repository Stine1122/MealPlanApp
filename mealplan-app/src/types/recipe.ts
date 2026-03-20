export type Ingredient = {
  name: string
  quantity: string
}

export type Recipe = {
  day: string
  recipe_name: string
  servings: number
  allergies: string[] | null
  prep_time_minutes: number | null
  cooking_time_minutes: number | null
  total_time_minutes: number | null
  ingredients: Ingredient[]
  instructions: string[]
  shoppinglist: Ingredient[]
}

export type RecipeProps = {
  response: Recipe
}

export type ShoppingListProps = {
  shoppinglist: Ingredient[]
}
