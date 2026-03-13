import { type StepProps } from "../../types/mealplan"

function Loading({step} : StepProps) {
    return (
        <p className="text-2xl font-headline text-center text-olive-800 mt-4">
            <p className={`${step === 0 ? "animate-pulse" : ""}`}>
                {step >= 1 ? "✔" : "⏳"} Analyserer ingredienser
            </p>
            <p className={`${step === 1 ? "animate-pulse" : ""}`}>
                {step <= 0 ? "" : ` ${step >= 2 ? "✔" : "⏳"} Finder opskrifter`}
            </p>
            <p className={`${step === 2 ? "animate-pulse" : ""}`}>
                {step <= 1 ? "" : ` ${step >= 3 ? "✔" : "⏳"} Genererer madplan`}
            </p>
        </p>
    )
}

export default Loading