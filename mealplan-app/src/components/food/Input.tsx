import { useState } from 'react'
import { type ListProps } from "../../types/food"

function handleInput(input : string, 
                     setInput: React.Dispatch<React.SetStateAction<string>>,
                     setList: React.Dispatch<React.SetStateAction<string[]>>) {
    if (input.trim() !== "") {
        const value = input.trim().toLowerCase()

        setList(prev => {
            if (prev.some(item => item.toLowerCase() === value)) return prev
            return [...prev, input.trim()]
        })

        setInput("")
    }
}

function Input({ setList }: ListProps) {
    const [input, setInput] = useState("")

    return (
        <div className="flex flex-row w-full gap-3 self-center">
            <input className="bg-amber-50/90 p-2 border border-amber-50 rounded-2xl self-center mt-5 w-full"
                placeholder="Tilføj ingrediens..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {if (e.key === "Enter") {handleInput(input, setInput, setList)}}}
            />
            <button className="self-center cursor-pointer bg-olive-800 hover:bg-olive-600 mt-5 text-amber-50/80 font-headline p-2 rounded-2xl w-1/6"
                onClick={() => {handleInput(input, setInput, setList)}}>
                Tilføj
            </button>
        </div>
    )
}

export default Input