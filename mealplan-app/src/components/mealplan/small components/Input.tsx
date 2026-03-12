import { useState } from 'react'
import { type InputProps } from "../../../types/mealplan"

function Input({num, setNum} : InputProps) {
    const [input, setInput] = useState("")

    return (
        <div className="flex flex-row w-full gap-3 self-center">
            <input className="bg-amber-50/90 p-2 border border-amber-50 rounded-2xl self-center w-full"
                placeholder="Tilføj ekstra ønsker eller præferencer..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <input className="bg-amber-50/90 p-1 border border-amber-50 rounded-2xl self-center text-center "
                style={{ width: `${Math.max(input.length, 6)}ch` }}
                type="number"
                min={1}
                value={num}
                onChange = {(e) => { 
                    const value = e.target.value

                    if (value === "") {
                        setNum("")
                    } else {
                        setNum(Math.max(1, Number(value)))
                    }
                }}
            />
            <span className="font-semibold self-center font-headline">personer</span>
        </div>
    )
}

export default Input