import { useState } from 'react'
import { DeleteButton, EditButton } from "./Buttons"
import { type ListProps, type EditProps } from "../../types/food"

export function EditValue({ setEditingItem, editValue, list, setList, item }: EditProps & ListProps & { item: string }) {
    if (editValue.trim() === "") {
        setList(prev => prev.filter(i => i !== item))
        setEditingItem(null)
        return
    }
    if (list.some(i => i.toLowerCase() === editValue.toLowerCase() && i !== item)) {
        return
    }
    setList(prev => prev.map(i => i === item ? editValue : i))
    setEditingItem(null)
}

function List({ list, setList, onDelete }: ListProps) {
    const [editingItem, setEditingItem] = useState<string | null>(null)
    const [editValue, setEditValue] = useState("")
    
    return (
        <>
        {list.length > 0 && (
        <ul className="text-2xl mt-5 list-none flex flex-col gap-2 bg-amber-50/30 p-3 rounded-2xl w-full self-center">

            {list.map((item) => (
                <div className="flex flex-row w-full" key={item}>

                    {editingItem === item ? (
                        <input
                            className="bg-amber-50/90 p-2 border border-amber-50 rounded-2xl font-items w-full h-12"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") 
                                    EditValue({editingItem, setEditingItem, editValue, setEditValue, list, setList, item})
                                if (e.key === "Escape") 
                                    setEditingItem(null)
                            }}
                            autoFocus
                        />
                    ) : (
                        <li className="font-items mr-auto">{item}</li>
                    )}

                    <EditButton editingItem={editingItem} setEditingItem={setEditingItem} 
                                editValue={editValue} setEditValue={setEditValue} 
                                list={list} setList={setList}
                                item={item}
                    />

                    <DeleteButton list={list} setList={setList} item={item} onDelete={onDelete}/>

                </div>
            ))}

        </ul>
        )}
        </>
    )
}

export default List