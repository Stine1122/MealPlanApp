import Input from './Input'
import List from './List'
import { type FridgeProps } from "../../types/food"
import { useLocalStorage } from "../../storage/useLocalStorage"
import { ArrowRightEndOnRectangleIcon, ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";

function Fridge({ type }: FridgeProps) {
    const title = type === "fridge" ? "Køleskab" : "Fryser"
    const storageKey = `${type}-items`
    const [list, setList] = useLocalStorage<string[]>(storageKey,[])

    return (
        <div className="flex flex-col">
            <div className="flex flex-row self-center text-center gap-3">
                <ArrowRightEndOnRectangleIcon className="self-center h-9 w-9 transition-transform"/>
                <h1 className="text-4xl font-headline self-center text-center">{title}</h1>
                <ArrowLeftEndOnRectangleIcon className="self-center h-9 w-9 transition-transform"/>
            </div>
            <Input list={list} setList={setList}/>
            <List list={list} setList={setList}/>
        </div>
    )
}

export default Fridge
