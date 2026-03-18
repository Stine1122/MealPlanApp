import { useState, useMemo } from 'react'
import { type Recipe as RecipeType } from "../../types/recipe"
import Recipe from "./Recipe"
import Input from "./Input"
import ErrorMessage from "./ErrorMessages"
import Loading from './Loading'
import CheckBoxes from './CheckBoxes'
import ShoppingList from '../food/ShoppingList'
import { useLocalStorage } from "../../storage/useLocalStorage"
import { GenerateButtons, DeleteButtonMealPlan } from "./Buttons"
import burger from '../../pictures/burger.png'
import ramen from '../../pictures/ramen.png'

function MealPlan() {
    const [input, setInput] = useState("")
    const [num, setNum] = useLocalStorage<number | "">("number-people", "")
    const [error, setError] = useState("")

    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState(0)

    const [response, setResponse] = useLocalStorage<RecipeType[] | null>("mealplan-recipe", null)
    const [visibleRecipes, setVisibleRecipes] = useState<RecipeType[]>(response ?? [])

    const [allergies, setAllergies] = useLocalStorage<string[]>("allergy-names", [])

    const generate_response = async (mode: "eachday" | "twoday") => {
        if (num === "") {
            setError("Du skal vælge antal personer før du kan generere en madplan.")
            return
        }
        setError("")

        setLoading(true)
        setStep(0)
        setTimeout(() => setStep(1), 5000)
        setTimeout(() => setStep(2), 10000)

        setResponse(null)
        setVisibleRecipes([])
        localStorage.removeItem("shopping-list-deleted")

        try {
            const fridgeItems = JSON.parse(localStorage.getItem("fridge-items") || "[]");
            const freezerItems = JSON.parse(localStorage.getItem("freezer-items") || "[]");
            const pantryItems = JSON.parse(localStorage.getItem("pantry-items") || "[]")
            const shoppinglist = JSON.parse(localStorage.getItem("shopping-list") || "[]");

            const r = await fetch("http://localhost:5043/generatecontent", {        
                method: "POST",       
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    prompt: input,
                    persons: num,
                    fridge: fridgeItems,
                    freezer: freezerItems,
                    pantry: pantryItems,
                    allergies: allergies,
                    shoppinglist: shoppinglist,
                    mode: mode
                })
            });
            if (!r.ok) {
                const text = await r.text()
                throw new Error(text)
            }
            const recipes = await r.json();
            setResponse(recipes);

            console.log(recipes);

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

    const allShoppingItems = useMemo(
        () => visibleRecipes.flatMap(recipe => recipe.shoppinglist),
        [visibleRecipes]
    )

    return (
        <>
        <div className="overflow-auto flex flex-col w-1/2">

            <div className="flex flex-row self-center text-center gap-3">
                <img src={burger} className="self-center h-15 w-15 transition-transform mt-7"/>
                <h1 className="text-center text-5xl mt-10 font-headline text-brown-900">
                    Din ugentlige madplan
                </h1>
                <img src={ramen} className="self-center h-15 w-15 transition-transform mt-7"/>
            </div>

            <div className="rounded p-3 flex flex-col gap-3 self-center m-3 w-11/12">

                <Input num={num} setNum={setNum}/>
                <CheckBoxes allergies={allergies} setAllergies={setAllergies}/>
                <GenerateButtons generate_response={generate_response}/>
                {error && (<ErrorMessage error={error} setError={setError}/>)}
                {loading && (<Loading step={step} setStep={setStep} />)}

                {response !== null && (
                    <>
                        {visibleRecipes.map((recipe, index) => (
                            <Recipe key={index} response={recipe} />
                        ))}
                        <DeleteButtonMealPlan response={null} setResponse={setResponse}/>
                    </>
                )}
            </div>

        </div>

        <div className="overflow-auto flex flex-col w-1/4 mb-15 mt-13 gap-10">
            <ShoppingList shoppinglist={allShoppingItems}/>
        </div>
        </>
    )
}

export default MealPlan