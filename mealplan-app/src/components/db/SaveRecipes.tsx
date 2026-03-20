import { type RecipeProps as RecipeType } from "../../types/recipe"

interface SaveRecipesProps extends RecipeType {
    onSaved: (id: number) => void;
}

function SaveRecipes({ response, onSaved }: SaveRecipesProps) {

    const saveRecipes = async () => {
        const res = await fetch("/saverecipes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response)
        });
        const id = await res.json();
        onSaved(id);
        console.log("Saved recipe with id: ", id)
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