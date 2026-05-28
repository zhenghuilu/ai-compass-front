import { useState, useEffect } from 'react'
import type { Source } from '@/types/source'
import { fetchSources } from '@/services/api'

interface UseSourcesResult {
  sources: Source[]
  loading: boolean
  error: string | null
}

export function useSources(): UseSourcesResult {
  const [sources, setSources] = useState<Source[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchSources()
        if (!cancelled) {
          setSources(data)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : '获取数据源失败')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [])

  return { sources, loading, error }
}
