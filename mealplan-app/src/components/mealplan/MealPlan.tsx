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
                    prompt: input,
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

            const recipes = await r.json()
            setResponse(recipes)
            setInput("")

            recipes.forEach((recipe: RecipeType, index: number) => {
                setTimeout(() => {
                    setVisibleRecipes(prev => [...prev, recipe])
                }, index * 500)
            })

        } catch (err) {
            console.error(err)
            setResponse(null)
        } finally {
            setLoading(false)
        }
    }

    const allShoppingItems = useMemo(
        () => (response ?? []).flatMap(recipe => recipe.shoppinglist),
        [response]
    )

    return (
        <>
        <div className="overflow-auto flex flex-col w-1/2 items-center">

            <div className="flex flex-row self-center text-center gap-3">
                <img src={burger} className="self-center h-15 w-15 transition-transform mt-7"/>
                <h1 className="text-center text-5xl mt-10 font-headline text-brown-900"> Din ugentlige madplan</h1>
                <img src={ramen} className="self-center h-15 w-15 transition-transform mt-7"/>
            </div>

            <div className="rounded p-3 flex flex-col gap-3 self-center m-3 w-11/12 items-center">

                <Input num={num} setNum={setNum}/>
                <CheckBoxes allergies={allergies} setAllergies={setAllergies}/>
                <GenerateButtons generate_response={generate_response}/>
                {error && (<ErrorMessage error={error} setError={setError}/>)}
                {loading && (<Loading/>)}

                {response !== null && (
                    <>
                    {visibleRecipes.map((recipe, index) => (
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