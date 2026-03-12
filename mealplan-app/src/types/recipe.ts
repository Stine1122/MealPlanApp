export type Ingredient = {
  name: string
  quantity: string
}

export type Recipe = {
  day: string
  recipe_name: string
  servings: number
  prep_time_minutes: number | null
  bake_time_minutes: number | null
  total_time_minutes: number | null
  ingredients: Ingredient[]
  instructions: string[]
}