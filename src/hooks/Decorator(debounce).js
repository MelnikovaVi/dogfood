import { useEffect } from "react"
import { useState } from "react"


export default function useDebounce (query, delay) {
    const [debounceQuery, setDebounce] = useState(query);
    
    useEffect ( () => {
        const timer = setTimeout(()=> {
            setDebounce(query)
        }, delay)
        return () => clearTimeout(timer)
    }, [query, delay])
    return debounceQuery
}