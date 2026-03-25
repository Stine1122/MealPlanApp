export type InventoryProps = {
    type: "fridge" | "freezer" | "pantry"
}

export type ListProps = {
  list: string[]
  setList: React.Dispatch<React.SetStateAction<string[]>>
  onDelete?: (item: string) => void
  onDeleteList?: (list: string[]) => void
}

export type InputProps = {
  input: string
  setInput: React.Dispatch<React.SetStateAction<string>>
}

export type OptionProps = {
  opt: string
  setOpt: React.Dispatch<React.SetStateAction<string>>
}

export type EditProps = {
  editingItem: string | null
  setEditingItem: React.Dispatch<React.SetStateAction<string | null>>
  editValue: string
  setEditValue: React.Dispatch<React.SetStateAction<string>>
}