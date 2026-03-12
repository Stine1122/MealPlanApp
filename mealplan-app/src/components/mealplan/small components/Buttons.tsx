import { type GenerateResponseProp } from "../../../types/mealplan"

function GenerateButtons({generate_response} : GenerateResponseProp ) {
    return (
        <div className="flex flex-row gap-3 self-center">
            <button className="self-center cursor-pointer bg-olive-800 hover:bg-olive-600 
                            text-amber-50/80 font-headline p-2 rounded-2xl" 
                    onClick={() => generate_response("eachday")}>
                Generer opskrifter til hver dag
            </button>
            <button className="self-center cursor-pointer bg-olive-800 hover:bg-olive-600
                            text-amber-50/80 font-headline p-2 rounded-2xl" 
                    onClick={() => generate_response("twoday")}>
                Generer opskrifter til hver anden dag
            </button>
        </div>
    )
}

// function DeleteButton({ setResponse } : ResponseProps) {
//     <button
//         className="font-headline self-center cursor-pointer text-amber-50/80 bg-red-400 hover:bg-red-500 
//         p-2 rounded-2xl"
//         onClick={() => {
//             setResponse(null)
//             localStorage.removeItem("mealplan-recipe")
//         }}
//     >
//         Ryd madplan
//     </button>
// }

export default GenerateButtons