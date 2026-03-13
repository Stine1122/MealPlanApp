import { type Recipe as RecipeType } from "./recipe"

export type InputProps = {
  num: number | ""
  setNum: React.Dispatch<React.SetStateAction<number | "">>
}

export type GenerateResponseProp = {
    generate_response: (mode: "eachday" | "twoday") => Promise<void>
}

export type ResponseProps = {
    response: RecipeType[] | null
    setResponse: React.Dispatch<React.SetStateAction<RecipeType[] | null>>
}

export type ErrorMessageProps = {
    error: string
    setError: React.Dispatch<React.SetStateAction<string>>
}

export type StepProps = {
    step: number
    setStep: React.Dispatch<React.SetStateAction<number>>
}

export type TheBoxProps = {
  name: string
}
