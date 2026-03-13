import { type ErrorMessageProps as ErrorType } from "../../types/mealplan"

function ErrorMessage({ error } : ErrorType) {
    return (
        <p className="text-red-600 text-center font-headline font-semibold">{error}</p>
    )
}

export default ErrorMessage