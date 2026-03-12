import Input from './small components/Input'
import List from './small components/List'
import { type FridgeProps } from "../../types/fridge"
import { useStoredList } from "../../hooks/useStoredList"

function Fridge({ type }: FridgeProps) {
    const title = type === "fridge" ? "Køleskab" : "Fryser"
    const storageKey = `${type}-items`
    const { list, setList } = useStoredList(storageKey)

    return (
        <div className="flex flex-col">
            <h1 className="text-4xl font-headline self-center text-center mt-13">{title}</h1>
            <Input list={list} setList={setList}/>
            <List list={list} setList={setList}/>
        </div>
    )
}

export default Fridge
