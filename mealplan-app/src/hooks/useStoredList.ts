import { useState, useEffect } from "react"

export function useStoredList(key: string) {

  const [list, setList] = useState<string[]>(() => {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(list))
  }, [list, key])

  return { list, setList }
}