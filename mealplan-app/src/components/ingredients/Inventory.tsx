import Input from './Input'
import List from './List'
import { type InventoryProps } from "../../types/food"
import { useLocalStorage } from "../../storage/useLocalStorage"
import { DeleteButtonList } from './Buttons'
import snowflake from '../../pictures/snowflake.png'
import fridge from '../../pictures/fridge.png'
import wheat from '../../pictures/wheat.png'

function Inventory({ type }: InventoryProps) {
    type ApplianceType = "fridge" | "freezer" | "pantry"

    const titles: Record<ApplianceType, string> = {
        fridge: "Køleskab",
        freezer: "Fryser",
        pantry: "Spisekammer",
    }
    const title = titles[type]

    const images: Record<ApplianceType, string> = {
        fridge: fridge,
        freezer: snowflake,
        pantry: wheat,
    }
    const image = images[type]

    const main_descriptions: Record<ApplianceType, string> = {
        fridge: "Køleskabet er tomt",
        freezer: "Fryseren er tomt",
        pantry: "Spisekammeret er tomt"
    }
    const main_description = main_descriptions[type]

    const sub_descriptions: Record<ApplianceType, string> = {
        fridge: "Tilføj varer du har liggende, så madplanen kan tage det i brug",
        freezer: "Tilføj hvad du har på frost, så madplanen kan planlægge ud fra det",
        pantry: "Tilføj hvad du har stående, så madplanen ved hvad den har at arbejde med"
    }
    const sub_description = sub_descriptions[type]

    const storageKey = `${type}-items`
    const [list, setList] = useLocalStorage<string[]>(storageKey,[])

    return (
        <div className="flex flex-col gap-2">

            <div className="flex flex-row self-center text-center gap-2">
                <img src={image} className="self-center h-7 w-7 transition-transform"/>
                <h1 className="text-3xl font-headline self-center text-center">{title}</h1>
                <img src={image} className="self-center h-7 w-7 transition-transform"/>
            </div>

            <Input list={list} setList={setList}/>
            
            <List list={list} setList={setList}/>

            {list.length === 0 && (
                <div className="font-items text-olive-700 text-2xl list-none flex flex-col gap-2 bg-amber-50/30 p-3 rounded-2xl w-full self-center overflow-y-auto h-full">
                    <p className="text-2xl ">{main_description}</p>
                    <p className="text-xl">{sub_description}</p>
                </div>
            )}

            <DeleteButtonList list={list} setList={setList} str={title.toLowerCase()}/>

        </div>
    )
}

export default Inventory
