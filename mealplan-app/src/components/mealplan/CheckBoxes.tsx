import { useEffect, useState } from "react"
import { type TheBoxProps } from "../../types/mealplan"
import { type AllergiesProps } from "../../types/mealplan"

function TheBox({ name, checked, onChange }: TheBoxProps) {
    return (
        <label className="flex flex-row gap-1 self-center text-center p-2 text-lg font-semibold font-headline">
            {name}:
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(name, e.target.checked)}
                className="w-4 h-4 accent-olive-600 cursor-pointer rounded border-2 border-olive-700 transition hover:scale-110 mt-1.5"
            />
        </label>
    )
}

const OPTIONS = ["Glutenfri", "Laktosefri", "Mælkefri", "Vegetarisk", "Vegansk"] as const

function CheckBoxes({ allergies, setAllergies }: AllergiesProps) {

    const [checked, setChecked] = useState<Record<string, boolean>>(
        Object.fromEntries(OPTIONS.map((name) => [name, allergies.includes(name)]))
    )

    const handleChange = (name: string, value: boolean) => {
        setChecked((prev) => ({ ...prev, [name]: value }))
    }

    useEffect(() => {
        setAllergies(
            Object.entries(checked)
                .filter(([, value]) => value)
                .map(([name]) => name)
        )
    }, [checked,setAllergies])

    return (
        <div className="flex flex-row flex-wrap self-center text-center items-center gap-3 bg-amber-50/50 rounded-3xl p-1">
            {OPTIONS.map((name) => (
                <TheBox
                    key={name}
                    name={name}
                    checked={checked[name]}
                    onChange={handleChange}
                />
            ))}
        </div>
    )
}

export default CheckBoxes