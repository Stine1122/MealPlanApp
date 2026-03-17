export type FridgeProps = {
    type: "fridge" | "freezer"
}

export type ListProps = {
  list: string[]
  setList: React.Dispatch<React.SetStateAction<string[]>>
}

export type InputProps = {
  input: string
  setInput: React.Dispatch<React.SetStateAction<string>>
}

export type OptionProps = {
  opt: string
  setOpt: React.Dispatch<React.SetStateAction<string>>
}