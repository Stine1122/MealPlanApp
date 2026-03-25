import { useState } from 'react'
import { type ListProps } from "../../types/food"
import { type InputProps } from "../../types/food"
import DropdownInput from './DropDown';
import { type ErrorMessageProps } from '../../types/mealplan';
import ErrorMessage from '../ErrorMessages';

function handleInput({input, setInput} : InputProps, { setList }: ListProps, num : number | "", opt: string, { setError }: ErrorMessageProps) {
    if (num === "") {
        setError("Du skal vælge mængde før du kan tilføje ingrediens")

        return
    }
    if (opt === "") {
        setError("Du skal vælge enhed før du kan tilføje ingrediens")
        return
    }
    if (input.trim() === "") {
        setError("Du skal indtaste den ingrediens, som du ønsker at tilføje")
        return
    }
    const str = input.trim().toLowerCase()
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
    const total_item = num + " " + opt + " " + capitalized

    setList(prev => {
        if (prev.some(item => item === total_item)) {
            return prev
        }
        return [total_item, ...prev]
    })

    setInput("")
    setError("")
}

function Input({ list, setList }: ListProps) {
    const [input, setInput] = useState("")
    const [num, setNum] = useState<number| "">("")
    const [opt, setOpt] = useState("")
    const [error, setError] = useState("")

    return (
        <div className="flex flex-col w-full self-center">
            <div className="flex flex-row w-full gap-3 self-center">

                <input className={`bg-amber-50/90 p-2 border border-amber-50 rounded-2xl w-15`}
                    type="number"
                    min={1}
                    value={num}
                    placeholder='...'
                    onChange = {(e) => { 
                        const value = e.target.value

                        if (value === "") {
                            setNum("")
                        } else {
                            setNum(Math.max(1, Number(value)))
                        }
                    }}
                />

                <DropdownInput opt={opt} setOpt={setOpt}/>

                <input className="bg-amber-50/90 p-2 border border-amber-50 rounded-2xl self-center w-full"
                    placeholder="Tilføj ingrediens..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {if (e.key === "Enter") {handleInput({input, setInput}, {list, setList}, num, opt, {error, setError})}}}
                />

                <button className="self-center cursor-pointer bg-olive-800 hover:bg-olive-600 text-amber-50/80 font-headline p-2 rounded-2xl w-1/6"
                    onClick={() => {handleInput({input, setInput}, {list, setList}, num, opt, {error, setError})}}>
                    Tilføj
                </button>

            </div>

        {error && (<ErrorMessage error={error} setError={setError}/>)}

        </div>
    )
}

export default Input