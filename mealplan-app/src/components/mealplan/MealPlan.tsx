import { useState } from 'react'
import Recipe from "./Recipe"
import { type Recipe as RecipeType } from "../../types/recipe"
import { useLocalStorage } from "../../storage/useLocalStorage"
import Input from "./Input"
import { GenerateButtons, DeleteButton } from "./Buttons"
import ErrorMessage from "./ErrorMessage"
import Loading from './Loading'

function MealPlan() {
    const [input, setInput] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState(0)
    const [response, setResponse] = useLocalStorage<RecipeType[] | null>("mealplan-recipe", null)
    const [visibleRecipes, setVisibleRecipes] = useState<RecipeType[]>([])
    const [num, setNum] = useLocalStorage<number | "">("number-people", "")

    const generate_response = async (mode: "eachday" | "twoday") => {
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

    return (
        <div className="overflow-auto flex flex-col w-1/2">
            <h1 className="text-center text-5xl mt-10 font-headline text-brown-900">
                Din ugentlige madplan
            </h1>
            <div className="rounded p-3 flex flex-col gap-3 self-center m-3 w-11/12">
                <Input num={num} setNum={setNum}/>
                <GenerateButtons generate_response={generate_response}/>
                <ErrorMessage error={error} setError={setError}/>
                {loading && (<Loading step={step} setStep={setStep} />)}

                {response !== null && (
                    <>
                        {visibleRecipes.map((recipe, index) => (
                            <Recipe key={index} response={recipe} />
                        ))}
                        <DeleteButton response={null} setResponse={setResponse}/>
                    </>
                )}
            </div>
        </div>
    )
}

export default MealPlan