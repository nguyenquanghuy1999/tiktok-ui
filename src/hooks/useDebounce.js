import { useState, useEffect } from "react"

function useDebounce(value, delay) {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const times = setTimeout(() => setDebounceValue(value), delay);

        return () => clearTimeout(times);

    }, [value])

    return debounceValue;
}
export default useDebounce;