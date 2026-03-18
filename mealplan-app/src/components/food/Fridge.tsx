import Input from './Input'
import List from './List'
import { type FridgeProps } from "../../types/food"
import { useLocalStorage } from "../../storage/useLocalStorage"
import { DeleteButtonList } from './Buttons'
import snowflake from '../../pictures/snowflake.png'
import fridge from '../../pictures/fridge.png'
import wheat from '../../pictures/wheat.png'

function Fridge({ type }: FridgeProps) {
    type ApplianceType = "fridge" | "freezer" | "pantry"

    const titles: Record<ApplianceType, string> = {
        fridge: "Køleskab",
        freezer: "Fryser",
        pantry: "Tørvarer",
    }

    const images: Record<ApplianceType, string> = {
        fridge: fridge,
        freezer: snowflake,
        pantry: wheat,
    }

    const title = titles[type]
    const image = images[type]

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
            {list.length !== 0 && (
                <DeleteButtonList list={list} setList={setList} str={title.toLowerCase()}/>
            )}
        </div>
    )
}

export default Fridge
