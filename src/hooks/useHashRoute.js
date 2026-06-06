import { useEffect, useState } from 'react'
import { readRoute } from '../utils/navigation'

export function useHashRoute() {
  const [route, setRoute] = useState(readRoute)

  useEffect(() => {
    const syncRoute = () => setRoute(readRoute())
    window.addEventListener('hashchange', syncRoute)
    return () => window.removeEventListener('hashchange', syncRoute)
  }, [])

  return route
}
