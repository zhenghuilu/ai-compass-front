import React, { useState } from 'react'
import { ChevronDown, ChevronUp, ExternalLink, Sparkles } from 'lucide-react'
import type { RankingItem as RankingItemType } from '@/types/ranking'
import { heatColor, heatTier } from '@/utils/heat'
import { HeatBar } from '@/features/rankings/components/HeatBar'
import styles from './RankingItem.module.css'

interface RankingItemProps {
  item: RankingItemType
  sourceColor: string
}

const DIMENSION_META: {
  key: 'business_impact' | 'discussion_density' | 'timeliness' | 'authority'
  label: string
  weight: string
  max: number
  color: string
}[] = [
  { key: 'business_impact', label: '商业影响力', weight: '40%', max: 40, color: '#ef4444' },
  { key: 'discussion_density', label: '讨论密度', weight: '30%', max: 30, color: '#f0a500' },
  { key: 'timeliness', label: '时效性', weight: '20%', max: 20, color: '#38bdf8' },
  { key: 'authority', label: '信源权威性', weight: '10%', max: 10, color: '#a78bfa' },
]

const RankingItem: React.FC<RankingItemProps> = ({ item, sourceColor }) => {
  const [expanded, setExpanded] = useState(false)
  const isTop3 = item.rank <= 3
  const tier = heatTier(item.score)
  const color = heatColor(item.score)

  return (
    <div className={isTop3 ? styles.itemTop3 : styles.item}>
      <div className={styles.content}>
        <div className={styles.rank} style={{ color: isTop3 ? sourceColor : '#5d6d8a' }}>
          {String(item.rank).padStart(2, '0')}
        </div>

        <div className={styles.info}>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.titleRow}
          >
            <p className={styles.title}>{item.title}</p>
            <ExternalLink size={11} className={styles.externalIcon} />
          </a>
          <div className={styles.meta}>
            <HeatBar value={item.score} />
          </div>
        </div>

        <div className={styles.score} style={{ color }}>
          {item.score}
        </div>

        <div>
          <span
            className={styles.tierBadge}
            style={{ color, backgroundColor: `${color}18` }}
          >
            {tier.text}
          </span>
        </div>

        <button
          className={styles.expandButton}
          onClick={() => setExpanded((prev) => !prev)}
          aria-label={expanded ? '收起评分理由' : '展开评分理由'}
        >
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {expanded && (
        <div className={styles.reasonPanel}>
          <div className={styles.reasonContent}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <Sparkles size={11} className="shrink-0" style={{ color: 'var(--color-primary)', marginTop: 2 }} />
              <p style={{ fontSize: 11, color: 'var(--color-muted-foreground)', lineHeight: 1.6 }}>
                {item.reason}
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 6,
              marginTop: 10,
            }}>
              {DIMENSION_META.map((dim) => {
                const value = item.dimensions?.[dim.key] ?? null
                return (
                  <div
                    key={dim.key}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 4,
                      padding: 6,
                      backgroundColor: 'rgba(255,255,255,0.02)',
                      borderRadius: 4,
                      textAlign: 'center',
                    }}
                  >
                    <span style={{ fontSize: 9, color: 'var(--color-muted-foreground)', lineHeight: 1.2 }}>
                      {dim.label}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                      <span style={{
                        fontSize: 13,
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 600,
                        color: value !== null ? dim.color : 'var(--color-muted-foreground)',
                      }}>
                        {value !== null ? value : '-'}
                      </span>
                      {value !== null && (
                        <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'rgba(241,241,243,0.4)' }}>
                          / {dim.max}
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <p style={{
              marginTop: 8,
              fontSize: 10,
              color: 'rgba(255,255,255,0.2)',
              fontFamily: 'var(--font-mono)',
            }}>
              由大模型综合评分
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default RankingItem
