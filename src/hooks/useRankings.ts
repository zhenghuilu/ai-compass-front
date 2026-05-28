import { useState, useEffect } from 'react'
import type { RankingItem } from '@/types/ranking'
import { fetchRankings } from '@/services/api'

interface UseRankingsResult {
  rankings: RankingItem[]
  loading: boolean
  error: string | null
}

export function useRankings(sourceId: string | null): UseRankingsResult {
  const [rankings, setRankings] = useState<RankingItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!sourceId) {
      setRankings([])
      return
    }

    const id = sourceId
    let cancelled = false

    async function load() {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchRankings(id)
        if (!cancelled) {
          const items = data[id]
          if (items) {
            setRankings(items)
          } else {
            setError(`未找到数据源: ${id}`)
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : '获取榜单失败')
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
  }, [sourceId])

  return { rankings, loading, error }
}
