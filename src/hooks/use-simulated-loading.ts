import { useEffect, useState } from 'react'

export function useSimulatedLoading(delayMs = 400): boolean {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), delayMs)

    return () => clearTimeout(timer)
  }, [delayMs])

  return isLoading
}
