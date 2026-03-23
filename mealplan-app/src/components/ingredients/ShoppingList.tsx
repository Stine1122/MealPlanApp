import { useEffect } from 'react'
import Input from './Input'
import List from './List'
import { type ShoppingListProps } from "../../types/recipe"
import { useLocalStorage } from "../../storage/useLocalStorage"
import shoppingcart from "../../pictures/shopping_cart.png"
import { DeleteButtonList } from './Buttons'

function ShoppingList({ shoppinglist }: ShoppingListProps) {
    const [list, setList] = useLocalStorage<string[]>("shopping-list",[])

    useEffect(() => {
        if (shoppinglist.length === 0) return
        const newItems = shoppinglist.map(item => item.quantity + " " + item.name)
        setList(prev => [...new Set([...prev, ...newItems])])
    }, [setList, shoppinglist])

    return (
        <div className="flex flex-col">

            <div className="flex flex-row self-center text-center gap-3">
                <img src={shoppingcart} className="self-center h-9 w-9 transition-transform"/>
                <h1 className="text-4xl font-headline self-center text-center">Indkøbsliste</h1>
                <img src={shoppingcart} className="self-center h-9 w-9 transition-transform"/>
            </div>

            <Input list={list} setList={setList}/>

            <List list={list} setList={setList}/>

            {list.length !== 0 && (
                <DeleteButtonList list={list} setList={setList} str={"indkøbsliste"}/>
            )}

        </div>
    )
}

export default ShoppingList
