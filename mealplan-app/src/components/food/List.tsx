import { useState } from 'react'
import { type ListProps } from "../../types/food"
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";


function List({ list, setList }: ListProps) {
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
                            className="bg-amber-50/90 p-2 border border-amber-50 rounded-2xl font-items w-full"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
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
                                if (e.key === "Escape") setEditingItem(null)
                            }}
                            autoFocus
                        />
                    ) : (
                        <li className="rounded p-1 font-items mr-auto">{item}</li>
                    )}

                    <button className="text-olive-800 ml-2 hover:bg-olive-600/50 cursor-pointer p-2 rounded-4xl"
                        onClick={() => {
                            if (editingItem === item) {
                                setEditingItem(null)
                            } else {
                                setEditingItem(item)
                                setEditValue(item)
                            }
                        }}>
                        <PencilSquareIcon className="h-5 w-5 transition-transform"/>
                    </button>

                    <button className="text-right text-right text-red-800 ml-2 hover:bg-red-600/50 cursor-pointer p-2 rounded-4xl" 
                            onClick={() => setList(list.filter(i => i !== item))}>
                            <TrashIcon className="h-5 w-5 transition-transform"/>
                    </button>

                </div>
            ))}

        </ul>
        )}
        </>
    )
}

export default List