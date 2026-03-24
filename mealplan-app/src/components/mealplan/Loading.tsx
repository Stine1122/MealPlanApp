import { useState, useEffect } from 'react'

function Loading() {
    const [step, setStep] = useState(0)

    useEffect(() => {
        setStep(0)
        const t1 = setTimeout(() => setStep(1), 5000)
        const t2 = setTimeout(() => setStep(2), 10000)

        return () => {
            clearTimeout(t1)
            clearTimeout(t2)
        }
    }, [])

    return (
        <span className="text-2xl font-headline text-center text-olive-800 mt-4">
            <p className={`${step === 0 ? "animate-pulse" : ""}`}>
                {step >= 1 ? "✔" : "⏳"} Analyserer ingredienser
            </p>
            <p className={`${step === 1 ? "animate-pulse" : ""}`}>
                {step <= 0 ? "" : ` ${step >= 2 ? "✔" : "⏳"} Finder opskrifter`}
            </p>
            <p className={`${step === 2 ? "animate-pulse" : ""}`}>
                {step <= 1 ? "" : ` ${step >= 3 ? "✔" : "⏳"} Genererer madplan`}
            </p>
        </span>
    )
}

export default Loading