import { useEffect, useState } from 'react'
import { fetchSpecialists, type CatalogResult } from '@/api/catalog'
import { SPECIALISTS } from '@/data/specialists'

export const useSpecialists = (): CatalogResult => {
  const [result, setResult] = useState<CatalogResult>({
    specialists: SPECIALISTS,
    isLive: false,
  })

  useEffect(() => {
    let active = true
    fetchSpecialists().then((next) => {
      if (active) setResult(next)
    })
    return () => {
      active = false
    }
  }, [])

  return result
}
