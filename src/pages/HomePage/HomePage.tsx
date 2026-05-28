import React, { useState, useCallback, useEffect } from 'react'
import type { RankingItem } from '@/types/ranking'
import type { RankingsData } from '@/types/ranking'
import { SOURCE_META } from '@/types/source'
import { useSources } from '@/hooks/useSources'
import { fetchRankings, fetchUpdateTime } from '@/services/api'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { RankingsPage } from '@/features/rankings/pages/RankingsPage'

function generateTSV(
  sourceName: string,
  items: RankingItem[]
): void {
  const header = ['排名', '标题', '热度', '评分理由', 'URL']
  const rows = items.map((item) =>
    [item.rank, item.title, item.score, item.reason, item.url].join('\t')
  )
  const content = [header.join('\t'), ...rows].join('\n')
  const blob = new Blob([content], { type: 'text/tab-separated-values;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `AI商业化热榜_${sourceName}_2026-05-26.tsv`
  a.click()
  URL.revokeObjectURL(url)
}

const HomePage: React.FC = () => {
  const { sources, loading: sourcesLoading } = useSources()
  const defaultSource = sources.length > 0 ? sources[0]!.id : '36kr'
  const [selectedSource, setSelectedSource] = useState(defaultSource)
  const [allRankings, setAllRankings] = useState<RankingsData | null>(null)
  const [rankingsLoading, setRankingsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [latestUpdateTime, setLatestUpdateTime] = useState<string | null>(null)

  useEffect(() => {
    if (sources.length > 0 && !sources.find((s) => s.id === selectedSource)) {
      setSelectedSource(sources[0]!.id)
    }
  }, [sources, selectedSource])

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        setRankingsLoading(true)
        setError(null)
        const [rankData, timeData] = await Promise.all([
          fetchRankings(),
          fetchUpdateTime(),
        ])
        if (!cancelled) {
          setAllRankings(rankData)
          setLatestUpdateTime(timeData.latestUpdateTime)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : '获取榜单失败')
        }
      } finally {
        if (!cancelled) {
          setRankingsLoading(false)
        }
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [])

  const rankings: RankingItem[] = allRankings?.[selectedSource] ?? []

  const sourceTopScore: Record<string, number> = {}
  if (allRankings) {
    for (const [sourceId, items] of Object.entries(allRankings)) {
      sourceTopScore[sourceId] = items[0]?.score ?? 0
    }
  }

  const handleExport = useCallback(() => {
    if (rankings.length > 0) {
      const meta = SOURCE_META[selectedSource]
      generateTSV(meta?.shortName ?? selectedSource, rankings)
    }
  }, [rankings, selectedSource])

  return (
    <>
      <Header onExport={handleExport} latestUpdateTime={latestUpdateTime} />
      <RankingsPage
        sources={sources}
        rankings={rankings}
        sourceTopScore={sourceTopScore}
        selectedSource={selectedSource}
        loading={sourcesLoading || rankingsLoading}
        error={error}
        onSelectSource={setSelectedSource}
      />
      <Footer sources={sources} />
    </>
  )
}

export default HomePage
