import { type TheBoxProps } from "../../types/mealplan"

function TheBox({ name } : TheBoxProps) {  
    return(
        <label className="flex flex-row gap-1 self-center text-center p-2 text-lg font-semibold font-headline">
            {name}: <input type="checkbox" className="w-4 h-4 accent-olive-600 cursor-pointer rounded border-2 border-olive-700 transition hover:scale-110 mt-1.5" />
        </label>
    )
}

function CheckBoxes() {
    return (
        <div className="flex flex-row flex-wrap self-center text-center gap-3 bg-amber-50/50 rounded-3xl p-1">
            <TheBox name="Glutenfri"/>
            <TheBox name="Laktosefri"/>
            <TheBox name="Mælkefri"/>
            <TheBox name="Nøddefri"/>
        </div>
    )
}

export default CheckBoxes