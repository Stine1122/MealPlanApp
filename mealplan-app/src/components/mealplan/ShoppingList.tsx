import { useEffect } from 'react'
import Input from '../food/Input'
import List from '../food/List'
import { type ShoppingListProps } from "../../types/recipe"
import { useLocalStorage } from "../../storage/useLocalStorage"
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

function ShoppingList({ shoppinglist }: ShoppingListProps) {
    const [list, setList] = useLocalStorage<string[]>("shopping-list",[])

    useEffect(() => {
        const newItems = shoppinglist.map(item => item.quantity + ", " + item.name)
        setList(prev => [...new Set([...prev, ...newItems])])
    }, [setList, shoppinglist])

    return (
        <div className="flex flex-col">
            <div className="flex flex-row self-center text-center gap-3">
                <ShoppingCartIcon className="self-center h-9 w-9 transition-transform"/>
                <h1 className="text-4xl font-headline self-center text-center">Indkøbsliste</h1>
                <ShoppingCartIcon className="self-center h-9 w-9 transition-transform"/>
            </div>
            <Input list={list} setList={setList}/>
            <List list={list} setList={setList}/>
        </div>
    )
}

export default ShoppingList
