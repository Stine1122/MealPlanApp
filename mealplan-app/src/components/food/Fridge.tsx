import Input from './Input'
import List from './List'
import { type FridgeProps } from "../../types/food"
import { useLocalStorage } from "../../storage/useLocalStorage"

function Fridge({ type }: FridgeProps) {
    const title = type === "fridge" ? "Køleskab" : "Fryser"
    const storageKey = `${type}-items`
    const [list, setList] = useLocalStorage<string[]>(storageKey,[])

    return (
        <div className="flex flex-col">
            <h1 className="text-4xl font-headline self-center text-center mt-13">{title}</h1>
            <Input list={list} setList={setList}/>
            <List list={list} setList={setList}/>
        </div>
    )
}

export default Fridge
