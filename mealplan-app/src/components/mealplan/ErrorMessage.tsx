import { type ErrorMessageProps as ErrorType } from "../../types/mealplan"

function ErrorMessage({ error } : ErrorType) {
    return (
        <p className="text-red-600 bg-red-200/80 self-center p-2 rounded-2xl text-center font-headline font-semibold">{error}</p>
    )
}

export default ErrorMessage