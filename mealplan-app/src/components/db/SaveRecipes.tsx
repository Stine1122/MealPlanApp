import { type RecipeProps as RecipeType } from "../../types/recipe"

function SaveRecipes({ response, onSaved }: RecipeType) {

    const saveRecipes = async () => {
        const res = await fetch("/saverecipes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response)
        });
        const savedId = await res.json();
        onSaved(savedId);
        console.log(savedId)
    }

    return (
        <button className="self-center text-center cursor-pointer bg-olive-800 hover:bg-olive-600 
                        text-amber-50/80 font-headline p-2 rounded-2xl" 
                onClick={saveRecipes}>
            Gem opskrift
        </button>
    )
}



export default SaveRecipes