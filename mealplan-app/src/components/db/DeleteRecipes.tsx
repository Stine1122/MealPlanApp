import { type RecipeProps as RecipeType } from "../../types/recipe";

function DeleteRecipes({ response, onSaved }: RecipeType) {

    const deleteRecipe = async () => {
        if (response.savedId === null) return;
        await fetch(`/recipes/${response.savedId}`, { method: "DELETE" });
        onSaved(null);
    }

    return (
        <button
            className="cursor-pointer bg-red-700 hover:bg-red-500 text-amber-50/80 font-headline p-2 rounded-2xl"
            onClick={deleteRecipe}>
            Slet opskrift
        </button>
    )
}

export default DeleteRecipes