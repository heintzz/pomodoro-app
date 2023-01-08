import { useState } from 'react'

export default function useInput(value) {
    const [input, setInput] = useState(value)

    function inputHandler(e) {
        setInput(e.target.value)
    }

    return {
        value: input,
        onChange: inputHandler,
    }
}
