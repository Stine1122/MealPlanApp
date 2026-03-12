export type FridgeProps = {
    type: "fridge" | "freezer"
}

export type ListProps = {
  list: string[]
  setList: React.Dispatch<React.SetStateAction<string[]>>
}