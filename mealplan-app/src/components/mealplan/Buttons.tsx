import { type GenerateResponseProp, type LoadingProps } from "../../types/mealplan"
import { type ResponseProps } from "../../types/mealplan"

export function GenerateButtons({generate_response, loading} : GenerateResponseProp & LoadingProps) {
    return (
        <div className="flex flex-row gap-3 self-center">

            <button disabled={loading}
                    className="self-center cursor-pointer bg-olive-800 hover:bg-olive-600 
                            text-amber-50/80 font-headline p-2 rounded-2xl
                            disabled:opacity-50 disabled:cursor-not-allowed" 
                    onClick={() => generate_response("eachday")}>
                Generer opskrifter til hver dag
            </button>

            <button disabled={loading}
                    className="self-center cursor-pointer bg-olive-800 hover:bg-olive-600
                            text-amber-50/80 font-headline p-2 rounded-2xl
                            disabled:opacity-50 disabled:cursor-not-allowed" 
                    onClick={() => generate_response("twoday")}>
                Generer opskrifter til hver anden dag
            </button>
            
        </div>
    )
}

export function DeleteButtonMealPlan({ setResponse } : ResponseProps) {
    return (
        <button className="font-headline self-center cursor-pointer text-amber-50/80 bg-red-400 hover:bg-red-500 p-2 rounded-2xl"
                onClick={() => {setResponse(null)}}>
            Ryd madplan
        </button>
    )
}