import React from 'react'
import type { Source } from '@/types/source'
import type { RankingItem as RankingItemType } from '@/types/ranking'
import { SOURCE_META } from '@/types/source'
import { SourceCard } from '@/features/rankings/components/SourceCard'
import { SourceTabs } from '@/features/rankings/components/SourceTabs'
import { RankingItem } from '@/features/rankings/components/RankingItem'
import { Methodology } from '@/features/rankings/components/Methodology'
import styles from './RankingsPage.module.css'

interface RankingsPageProps {
  sources: Source[]
  rankings: RankingItemType[]
  sourceTopScore: Record<string, number>
  selectedSource: string
  loading: boolean
  error: string | null
  onSelectSource: (id: string) => void
}

const RankingsPage: React.FC<RankingsPageProps> = ({
  sources,
  rankings,
  sourceTopScore,
  selectedSource,
  loading,
  error,
  onSelectSource,
}) => {
  const selectedSourceMeta = sources.find((s) => s.id === selectedSource)
  const sourceMeta = selectedSourceMeta ? SOURCE_META[selectedSourceMeta.id] : undefined
  const sourceColor = sourceMeta?.color ?? '#666'
  const top1 = rankings[0]

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.title}>
          国内 AI 商业化<br />
          <span className={styles.titleAccent}>资讯热度榜单</span>
        </h1>
        <p className={styles.subtitle}>
          聚合36氪、雷峰网、量子位、钛媒体四大信源，由
          {' '}<span className={styles.subtitleAccent}>大模型</span>{' '}
          基于商业影响力、讨论密度、时效性、信源权威性四维度评分，每日更新各平台 TOP 10。
        </p>

        <div className={styles.cardsGrid}>
          {sources.map((source) => (
            <SourceCard
              key={source.id}
              source={source}
              topScore={sourceTopScore[source.id] ?? 0}
              isActive={source.id === selectedSource}
              onClick={() => onSelectSource(source.id)}
            />
          ))}
        </div>
      </section>

      <SourceTabs
        sources={sources}
        activeId={selectedSource}
        onSelect={onSelectSource}
      />

      {selectedSourceMeta && top1 && (
        <div
          className={styles.pinnedItem}
          style={{ borderLeftColor: sourceColor }}
        >
          <span className={styles.pinnedTag} style={{ color: sourceColor }}>
            本周置顶
          </span>
          {top1.title}
        </div>
      )}

      {loading && (
        <div className={styles.loading}>加载中...</div>
      )}

      {error && (
        <div className={styles.error}>{error}</div>
      )}

      {!loading && !error && (
        <div className={styles.rankingList}>
          {rankings.map((item) => (
            <RankingItem
              key={item.rank}
              item={item}
              sourceColor={sourceColor}
            />
          ))}
        </div>
      )}

      <Methodology />
    </div>
  )
}

export default RankingsPage
