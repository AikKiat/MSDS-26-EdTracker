import { useEffect, useState } from "react"

interface Settled<T> {
  load: () => Promise<T>
  data?: T
  error?: Error
}

// Runs `load` whenever its identity changes, so callers memoize it with
// useCallback over the values it depends on.
export function useResource<T>(load: () => Promise<T>) {
  const [settled, setSettled] = useState<Settled<T>>()

  useEffect(() => {
    let active = true
    load().then(
      (data) => active && setSettled({ load, data }),
      (error: Error) => active && setSettled({ load, error })
    )
    return () => {
      active = false
    }
  }, [load])

  const current = settled?.load === load ? settled : undefined
  return { data: current?.data, error: current?.error, loading: !current }
}
