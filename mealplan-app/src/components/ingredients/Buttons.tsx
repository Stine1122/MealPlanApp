import { type ListProps, type EditProps } from "../../types/food"
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { EditValue } from './List'

export function DeleteButtonList({ setList, str }: ListProps & { str: string }) {
    return (
        <button className="font-headline self-center cursor-pointer text-amber-50/80 bg-red-700/80 hover:bg-red-600 p-2 rounded-2xl mt-3"
                onClick={() => {setList([])}}>
            Ryd {str}
        </button>
    )
}

export function DeleteButton({ list, setList, item, onDelete }: ListProps & { item: string }) {
    return (
        <button className="text-right text-right text-red-800 ml-2 hover:bg-red-600/50 cursor-pointer p-2 rounded-4xl" 
                onClick={() => onDelete ? onDelete(item) : setList(list.filter(i => i !== item))}>
            <TrashIcon className="h-5 w-5 transition-transform"/>
        </button>
    )
}

export function EditButton({ editingItem, setEditingItem, editValue, setEditValue, list, setList, item }: EditProps & ListProps & { item: string }) {
    return (
        <button className="text-olive-800 ml-2 hover:bg-olive-600/50 cursor-pointer p-2 rounded-4xl"
                onClick={() => {
                    if (editingItem === item) {
                        EditValue({editingItem, setEditingItem, editValue, setEditValue, list, setList, item})
                    } else {
                        setEditingItem(item)
                        setEditValue(item)
                    }
                }}>
            <PencilSquareIcon className="h-5 w-5 transition-transform"/>
        </button>
    )
}

