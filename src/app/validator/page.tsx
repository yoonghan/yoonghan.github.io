"use client"
import { useState, useEffect } from "react"

let clientCounter = -1

// Hiding the side-effect in a function helps the compiler treat the calling block as pure
function getCounter() {
    clientCounter++
    return clientCounter
}

const Validator = () => {
    const [count, setCount] = useState(0)
    const [isClient, setIsClient] = useState(false)

    // The React Compiler will see this has no dependencies and auto-memoize it.
    // If the compiler is OFF, this will run on every re-render.
    const autoMemoizedValue = (() => {
        return getCounter()
    })()

    // We only render the value after mounting to prevent Hydration Mismatch
    useEffect(() => {
        setIsClient(true)
    }, [])

    return (
        <div className="p-8 flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Validator</h1>
            <p>This page is hidden to validate React Compiler is enabled.</p>

            <button onClick={() => setCount(c => c + 1)}>
                {count} - {isClient ? autoMemoizedValue : 0}
            </button>
        </div>
    )
}

export default Validator