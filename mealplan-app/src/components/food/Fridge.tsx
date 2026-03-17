import Input from './Input'
import List from './List'
import { type FridgeProps } from "../../types/food"
import { useLocalStorage } from "../../storage/useLocalStorage"
import snowflake from '../../pictures/snowflake.png'
import fridge from '../../pictures/fridge.png'

function Fridge({ type }: FridgeProps) {
    const title = type === "fridge" ? "Køleskab" : "Fryser"
    const image = type === "fridge" ? fridge : snowflake
    const storageKey = `${type}-items`
    const [list, setList] = useLocalStorage<string[]>(storageKey,[])

    return (
        <div className="flex flex-col">
            <div className="flex flex-row self-center text-center gap-3">
                <img src={image} className="self-center h-9 w-9 transition-transform"/>
                <h1 className="text-4xl font-headline self-center text-center">{title}</h1>
                <img src={image} className="self-center h-9 w-9 transition-transform"/>
            </div>
            <Input list={list} setList={setList}/>
            <List list={list} setList={setList}/>
        </div>
    )
}

export default Fridge
