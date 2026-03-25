import { useEffect } from 'react'
import Input from './Input'
import List from './List'
import { type ShoppingListProps } from "../../types/recipe"
import { useLocalStorage } from "../../storage/useLocalStorage"
import shoppingcart from "../../pictures/shopping_cart.png"
import { DeleteButtonList } from './Buttons'

function ShoppingList({ shoppinglist }: ShoppingListProps) {
    const [list, setList] = useLocalStorage<string[]>("shopping-list",[])
    const [deletedItems, setDeletedItems] = useLocalStorage<string[]>("shopping-list-deleted", [])

    useEffect(() => {
        if (shoppinglist.length === 0) return
        const newItems = shoppinglist
            .map(item => item.quantity + " " + item.name)
            .filter(item => !deletedItems.includes(item))
        setList(prev => [...new Set([...prev, ...newItems])])
    }, [setList, shoppinglist])

    const handleDelete = (item: string) => {
        setList(prev => prev.filter(i => i !== item))
        setDeletedItems(prev => [...prev, item])
    }

    const handleDeleteList = (list: string[]) => {
        setList([])
        setDeletedItems(prev => [...prev, ...list])
    }

    return (
        <div className="flex flex-col h-full overflow-hidden">

            <div className="flex flex-row self-center text-center gap-3 shrink-0 pb-2">
                <img src={shoppingcart} className="self-center h-9 w-9 transition-transform"/>
                <h1 className="text-4xl font-headline self-center text-center">Indkøbsliste</h1>
                <img src={shoppingcart} className="self-center h-9 w-9 transition-transform"/>
            </div>

            <div className="shrink-0">
                <Input list={list} setList={setList}/>
            </div>

            <div className="min-h-0 flex-1 mt-3 flex flex-col">
                <List list={list} setList={setList} onDelete={handleDelete}/>
            </div>

            {list.length === 0 && (
                <div className="font-items text-olive-700 bg-amber-50/30 p-3 rounded-2xl w-full self-center overflow-y-auto h-full">
                    <p className="text-2xl ">Din indkøbsliste er tom</p>
                    <p className="text-xl">Tilføj noget eller generer en madplan</p>
                </div>
            )}

            <div className="sticky bottom-0 pt-2 self-center">
                <DeleteButtonList list={list} setList={setList} onDeleteList={handleDeleteList} str={"indkøbsliste"}/>
            </div>

        </div>
    )
}

export default ShoppingList
