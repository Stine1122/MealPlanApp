import { useState, useEffect } from "react"
import { type Recipe as RecipeType } from "../types/recipe"

export function useStoredRecipes(setVisibleRecipes : React.Dispatch<React.SetStateAction<RecipeType[]>>) {
    const [response, setResponse] = useState<RecipeType[] | null>(null)

    // Load saved recipe on page load
    useEffect(() => {
        const saved = localStorage.getItem("mealplan-recipe")
        if (saved) {
            const recipes = JSON.parse(saved)
            setResponse(recipes)
            setVisibleRecipes(recipes)
        }
    }, [])

    // Save recipe whenever it changes
    useEffect(() => {
        if (response) {
            localStorage.setItem("mealplan-recipe", JSON.stringify(response))
        }
    }, [response])

    return { response, setResponse }
}