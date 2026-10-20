// usePersistentState works like useState, but also saves the value under a name
// in localStorage and reads it back when the app opens again.
import { useEffect, useState } from 'react'
import { loadValue, saveValue } from './storage'

// { key } is the name the value is saved under. { initial } is used the first time,
// or when nothing has been saved yet (it can be a function, like with useState).
// { onLoad } is optional: it can update the value once, when the app opens.
export function usePersistentState(key, initial, onLoad) {
    const [value, setValue] = useState(() => {
        const fallback = typeof initial === 'function' ? initial() : initial
        const loaded = loadValue(key, fallback)
        return onLoad ? onLoad(loaded) : loaded
    })

    // Save whenever the value changes.
    useEffect(() => {
        saveValue(key, value)
    }, [key, value])

    return [value, setValue]
}
