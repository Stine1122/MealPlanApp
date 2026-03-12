import { useState, useEffect } from "react"

export function useStoredPeople() {
    const [num, setNum] = useState<number | "">("")

    // Load saved number of people
    useEffect(() => {
        const saved = localStorage.getItem("number-people")
        if (saved) {
            setNum(JSON.parse(saved))
        }
    }, [])

    // Save whenever it changes
    useEffect(() => {
        if (num !== "") {
            localStorage.setItem("number-people", JSON.stringify(num))
        }
    }, [num])

    return { num, setNum }
}