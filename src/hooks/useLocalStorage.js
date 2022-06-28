import { useState } from 'react'

export default function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key)
      // Parse stored json or if none return initialValue
      const parsed = item ? JSON.parse(item) : initialValue
      // regex to check if the value is within the ascii characters from space to ~
      // if not, return initialValue
      if (typeof parsed === 'string' && !parsed.match(/^[\x20-\x7E]*$/)) {
        return initialValue
      }
      // Return parsed value
      return parsed
    } catch (error) {
      // If error also return initialValue
      console.error(error)
      return initialValue
    }
  })

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      // Save state
      setStoredValue(valueToStore)
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.error(error)
    }
  }

  return [storedValue, setValue]
}
