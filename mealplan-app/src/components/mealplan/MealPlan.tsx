import { useState, useMemo } from 'react'
import { type Recipe as RecipeType } from "../../types/recipe"
import Recipe from "./Recipe"
import Input from "./Input"
import ErrorMessage from "../ErrorMessages"
import Loading from './Loading'
import CheckBoxes from './CheckBoxes'
import ShoppingList from '../ingredients/ShoppingList'
import { useLocalStorage } from "../../storage/useLocalStorage"
import { GenerateButtons, DeleteButtonMealPlan } from "./Buttons"
import burger from '../../pictures/burger.png'
import ramen from '../../pictures/ramen.png'

function MealPlan() {
    const [input, setInput] = useState("")
    const [num, setNum] = useLocalStorage<number | "">("number-people", "")
    const [allergies, setAllergies] = useLocalStorage<string[]>("allergy-names", [])

    const [message, setMessage] = useLocalStorage<string>("message", "")
    const [response, setResponse] = useLocalStorage<RecipeType[] | null>("mealplan-recipe", null)
    const [visibleRecipes, setVisibleRecipes] = useState<RecipeType[]>(response ?? [])

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const generate_response = async (mode: "eachday" | "twoday") => {
        if (num === "") {
            setError("Du skal vælge antal personer før du kan generere en madplan.")
            return
        }
        setError("")
        setLoading(true)
        setMessage("")
        setResponse(null)
        setVisibleRecipes([])

        try {
            const fridgeItems = JSON.parse(localStorage.getItem("fridge-items") || "[]");
            const freezerItems = JSON.parse(localStorage.getItem("freezer-items") || "[]");
            const pantryItems = JSON.parse(localStorage.getItem("pantry-items") || "[]")
            const shoppinglist = JSON.parse(localStorage.getItem("shopping-list") || "[]");

            const r = await fetch("http://localhost:5043/generatecontent", {        
                method: "POST",       
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    extraPrompt: input,
                    persons: num,
                    fridge: fridgeItems,
                    freezer: freezerItems,
                    pantry: pantryItems,
                    allergies: allergies,
                    shoppinglist: shoppinglist,
                    mode: mode
                })
            })

            if (!r.ok) {
                const err = await r.text()
                throw new Error(err)
            };

            const mealplan = await r.json()
            const recipes = mealplan.recipes ?? []
            const message = mealplan.message ?? ""

            setMessage(message)
            setResponse(recipes)
            setInput("")

            console.log(mealplan)
            console.log(recipes)

            recipes.forEach((recipe: RecipeType, index: number) => {
                setTimeout(() => {
                    setVisibleRecipes(prev => [...prev, recipe])
                }, index * 500)
            })

        } catch (err) {
            console.error(err)
            setError("Der opstod en fejl. Prøv venligst igen.")
            setResponse(null)
        } finally {
            setLoading(false)
        }
    }

    const allShoppingItems = useMemo(
        () => (response ?? [])[0]?.shoppinglist ?? [],
        [response]
    )

    return (
        <div className="flex flex-row flex-1 h-full overflow-hidden">

            <div className="flex flex-col w-2/3 h-full overflow-hidden items-center">

                <div className="flex flex-row self-center text-center gap-3 shrink-0">
                    <img src={burger} className="self-center h-15 w-15 transition-transform mt-7"/>
                    <h1 className="text-center text-5xl mt-10 font-headline text-brown-900">Din ugentlige madplan</h1>
                    <img src={ramen} className="self-center h-15 w-15 transition-transform mt-7"/>
                </div>

                <div className="rounded p-3 flex flex-col gap-3 self-center w-11/12 items-center shrink-0">
                    <Input num={num} setNum={setNum} input={input} setInput={setInput}/>
                    <CheckBoxes allergies={allergies} setAllergies={setAllergies}/>
                    <GenerateButtons generate_response={generate_response} loading={loading}/>
                    {error && (<ErrorMessage error={error} setError={setError}/>)}
                    {loading && (<Loading/>)}
                </div>

                <div className="flex flex-col flex-1 min-h-0 overflow-y-auto w-11/12 gap-3 pt-2">
                    <div className="flex flex-col gap-3 pr-5 pl-5 self-center">
                        {message && (
                            <p className="bg-olive-500/40 text-center rounded-xl p-2 w-full font-headline font-bold text-lg">
                                {message}
                            </p>
                        )}
                        {response !== null && (
                            visibleRecipes.map((recipe, index) => (
                                <Recipe
                                    key={index}
                                    response={recipe}
                                    onSaved={(id) => {
                                        setResponse(prev => prev?.map((r, i) =>
                                            i === index ? { ...r, savedId: id } : r
                                        ) ?? null)
                                        setVisibleRecipes(prev => prev.map((r, i) =>
                                            i === index ? { ...r, savedId: id } : r
                                        ))
                                    }}
                                />
                            ))
                        )}
                    </div>
                </div>

                {response !== null && (
                    <div className="shrink-0 mt-auto pt-2 pb-12 w-11/12 self-center flex justify-center">
                        <DeleteButtonMealPlan response={null} setResponse={setResponse} message={message} setMessage={setMessage}/>
                    </div>
                )}

            </div>

            {/* Shopping list column */}
            <div className="flex flex-col w-1/3 h-full overflow-hidden pb-20 mt-13">
                <ShoppingList shoppinglist={allShoppingItems}/>
            </div>

        </div>
    )
}

export default MealPlan