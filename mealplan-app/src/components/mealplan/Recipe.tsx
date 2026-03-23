import { type RecipeProps } from "../../types/recipe"
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import SaveRecipes from "../db/SaveRecipes"
import DeleteRecipes from "../db/DeleteRecipes";
import check_circle from "../../pictures/check_circle.png"

function formatTime(minutes: number): string {
  if (minutes < 60) return `${minutes} minutter`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes === 0
    ? `${hours} ${hours === 1 ? "time" : "timer"}`
    : `${hours} ${hours === 1 ? "time" : "timer"} ${remainingMinutes} minutter`;
}

export default function Recipe({ response, onSaved }: RecipeProps) {
  
  const savedId = response.savedId ?? null;
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full rounded-lg self-center animate-fade-in">
      <button
          onClick={() => setOpen(!open)}
          className={`border border-black cursor-pointer flex flex-row w-full items-center justify-between p-4 text-amber-50 rounded-t-lg transition-colors
          ${open ? "bg-olive-700 rounded-t-lg" : "bg-olive-600/90 hover:bg-olive-700 rounded-lg"}`}
      >

          <div className="flex justify-start w-1/4">
              <p className="text-lg font-semibold font-headline">{response.day}</p>
          </div>

          <div className="flex flex-row gap-3 w-1/2 justify-center items-center">
              <p className="font-headline text-2xl text-center">{response.recipe_name}</p>
              {savedId !== null && (<img src={check_circle} className="h-7 w-7"/> )}
          </div>

          <div className="flex justify-end w-1/4">
              <ChevronDownIcon
                  className={`h-5 w-5 transition-transform ${
                      open ? "rotate-180" : ""
                  }`}
              />
          </div>

      </button>

      {open && (
        <div className="p-7 pt-4 border-t bg-amber-50/80 rounded-b-lg">
          <div>
            <p className="font-bold text-xl">{response.recipe_name}</p>

            {(response.allergies ?? []).length > 0 && (
              <p className="italic">{(response.allergies ?? []).join(", ")}</p>
            )}

            <p className="font-semibold" >Til {response.servings} personer</p>

            {response.prep_time_minutes !== null && (
              <p>Forberedelsestid: {formatTime(response.prep_time_minutes)}</p>
            )}
            {response.cooking_time_minutes !== null && (
              <p>Tilberedningstid: {formatTime(response.cooking_time_minutes)}</p>
            )}
            {response.total_time_minutes !== null && (
              <p>Total tid: {formatTime(response.total_time_minutes)}</p>
            )}

            <p className="font-semibold mt-2">Ingredienser:</p>

            <ul className="list-disc list-inside ml-2">
              {(response.ingredients ?? []).map((ing) => (
                <li>{ing.quantity} {ing.name.toLowerCase()}</li>
              ))}
            </ul>

            <p className="font-semibold mt-2">Instruktioner:</p>
            <ol className="list-disc list-inside ml-2">
              {(response.instructions ?? []).map((step) => (
                <li>{step}</li>
              ))}
            </ol>
          </div>

          <div className="self-center text-center mt-5">
            {savedId === null ? (
              <SaveRecipes response={response} onSaved={onSaved} />
            ) : (
              <DeleteRecipes response={response} onSaved={onSaved} />
            )}
          </div>

        </div>
      )}
    </div>
  );
}