import React from 'react'
import type { Source } from '@/types/source'
import { SOURCE_META } from '@/types/source'
import { heatColor } from '@/utils/heat'
import styles from './SourceCard.module.css'

interface SourceCardProps {
  source: Source
  topScore: number
  isActive: boolean
  onClick: () => void
}

const SourceCard: React.FC<SourceCardProps> = ({ source, topScore, isActive, onClick }) => {
  const meta = SOURCE_META[source.id]
  const color = meta?.color ?? '#666'

  return (
    <button
      onClick={onClick}
      className={isActive ? styles.cardActive : styles.card}
      style={isActive ? { borderColor: color } : undefined}
    >
      <div className={styles.header}>
        <span className={styles.dot} style={{ backgroundColor: color }} />
        <span className={styles.name}>{meta?.shortName ?? source.name}</span>
      </div>
      <div className={styles.score} style={{ color: heatColor(topScore) }}>
        {topScore}
      </div>
      <div className={styles.label}>榜首热度</div>
    </button>
  )
}

export default SourceCard
