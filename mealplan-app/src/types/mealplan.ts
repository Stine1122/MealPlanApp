import { type Recipe as RecipeType } from "./recipe"

export type InputProps = {
  num: number | ""
  setNum: React.Dispatch<React.SetStateAction<number | "">>
  input: string
  setInput: React.Dispatch<React.SetStateAction<string>>
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

export type TheBoxProps = {
  name: string
  checked: boolean
  onChange: (name: string, checked: boolean) => void
}

export type AllergiesProps = {
    allergies: string[]
    setAllergies: React.Dispatch<React.SetStateAction<string[]>>
}

export type LoadingProps = {
    loading: boolean
}