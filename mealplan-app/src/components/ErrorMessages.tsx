import { type ErrorMessageProps as ErrorType } from "../types/mealplan"

function ErrorMessage({ error } : ErrorType) {
    return (
        <p className="text-red-800 self-center text-center font-headline font-semibold text-sm">{error}</p>
    )
}

export default ErrorMessage