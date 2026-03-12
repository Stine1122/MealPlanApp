import { useState } from 'react'
import { type Recipe as RecipeType } from "../../../types/recipe"
import { useStoredRecipes } from "../../../hooks/useStoredRecipes"
import { useStoredPeople } from "../../../hooks/useStoredPeople"

async function GenerateResponse(mode: "eachday" | "twoday") {
    const [input, setInput] = useState("")
    const [error, setError] = useState("")
    const [visibleRecipes, setVisibleRecipes] = useState<RecipeType[]>([])
    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState(0)

    const { response, setResponse } = useStoredRecipes(setVisibleRecipes)
    const { num, setNum } = useStoredPeople()

    if (num === "") {
            setError("Du skal vælge antal personer før du kan generere en madplan.")
            return
        }
        setError("")
        setResponse(null)
        setVisibleRecipes([])

        setLoading(true)
        setStep(0)
        setTimeout(() => setStep(1), 5000)
        setTimeout(() => setStep(2), 10000)

        try {
            const fridgeItems = JSON.parse(localStorage.getItem("fridge-items") || "[]");
            const freezerItems = JSON.parse(localStorage.getItem("freezer-items") || "[]");

            const r = await fetch("http://localhost:5043/generatecontent", {        
                method: "POST",       
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    prompt: input,
                    persons: num,
                    fridge: fridgeItems,
                    freezer: freezerItems,
                    mode: mode
                })
            });
            if (!r.ok) {
                const text = await r.text()
                throw new Error(text)
            }
            const recipes = await r.json();
            // console.log(recipe);
            setResponse(recipes);

            // reveal recipes one-by-one
            recipes.forEach((recipe: RecipeType, index: number) => {
                setTimeout(() => {
                    setVisibleRecipes(prev => [...prev, recipe])
                }, index * 500)
            })

        } catch (err) {
            console.error(err)
            setResponse(null);
        } finally {
            setInput("")
            setLoading(false)
    }
}

export default GenerateResponse