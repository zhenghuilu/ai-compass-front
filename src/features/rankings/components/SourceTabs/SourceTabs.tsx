import React from 'react'
import type { Source } from '@/types/source'
import { RefreshCw } from 'lucide-react'
import styles from './SourceTabs.module.css'

interface SourceTabsProps {
  sources: Source[]
  activeId: string
  onSelect: (id: string) => void
}

const SourceTabs: React.FC<SourceTabsProps> = ({ sources, activeId, onSelect }) => {
  return (
    <div className={styles.wrapper}>
      {sources.map((source) => (
        <button
          key={source.id}
          onClick={() => onSelect(source.id)}
          className={activeId === source.id ? styles.tabActive : styles.tab}
        >
          {source.name}
        </button>
      ))}
      <div className={styles.spacer} />
      <div className={styles.updateHint}>
        <RefreshCw size={11} />
        每日更新
      </div>
    </div>
  )
}

export default SourceTabs
