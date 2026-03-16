import { type RecipeProps } from "../../types/recipe"
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

function formatTime(minutes: number): string {
  if (minutes < 60) return `${minutes} minutter`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes === 0
    ? `${hours} ${hours === 1 ? "time" : "timer"}`
    : `${hours} ${hours === 1 ? "time" : "timer"} ${remainingMinutes} minutter`;
}

export default function Recipe({ response }: RecipeProps) {

  const [open, setOpen] = useState(false);

  return (
    <div className="w-full rounded-lg self-center animate-fade-in">
      <button
        onClick={() => setOpen(!open)}
        className={`border border-black cursor-pointer flex flex-row w-full items-center justify-between p-4 text-amber-50 rounded-t-lg transition-colors
        ${open ? "bg-olive-700 rounded-t-lg" : "bg-olive-600/90 hover:bg-olive-700 rounded-lg"}`}
      >
        <p className="text-lg font-semibold font-headline">{response.day}</p>
        <p className="font-headline text-2xl">{response.recipe_name}</p>
        <ChevronDownIcon
          className={`h-5 w-5 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="p-4 border-t bg-amber-50/80 rounded-b-lg">
          <div>
            <p className="font-bold text-xl">{response.recipe_name}</p>

            {response.allergies !== null && (
              <p className="italic">Allergier: {response.allergies.join(", ")}</p>
            )}

            <p className="font-semibold" >Til {response.servings} personer</p>

            {response.prep_time_minutes !== null && (
              <p>Forberedelsestid: {formatTime(response.prep_time_minutes)}</p>
            )}
            {response.bake_time_minutes !== null && (
              <p>Tilberedningstid: {formatTime(response.bake_time_minutes)}</p>
            )}
            {response.total_time_minutes !== null && (
              <p>Total tid: {formatTime(response.total_time_minutes)}</p>
            )}

            <p className="font-semibold mt-2">Ingredienser:</p>

            <ul className="list-disc list-inside ml-2">
              {response.ingredients.map((ing, i) => (
                <li key={i}>{ing.quantity} {ing.name}</li>
              ))}
            </ul>

            <p className="font-semibold mt-2">Instruktioner:</p>
            <ol className="list-disc list-inside ml-2">
              {response.instructions.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}