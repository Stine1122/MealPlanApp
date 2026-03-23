export type Ingredient = {
  name: string
  quantity: string
}

export type Recipe = {
  savedId?: number | null
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
  onSaved: (id: number | null) => void
}

export type ShoppingListProps = {
  shoppinglist: Ingredient[]
}
