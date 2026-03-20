import { type SavedIdProps } from "../../types/recipe";

function DeleteRecipes({ savedId, setSavedId }: SavedIdProps) {

    const deleteRecipe = async () => {
        if (savedId === null) return;
        await fetch(`/recipes/${savedId}`, { method: "DELETE" });
        setSavedId(null);
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