import React from 'react'
import { TrendingUp, Sparkles, Download } from 'lucide-react'
import styles from './Header.module.css'

interface HeaderProps {
  onExport?: () => void
  latestUpdateTime?: string | null
}

function formatTime(iso: string): string {
  const d = new Date(iso)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

const Header: React.FC<HeaderProps> = ({ onExport, latestUpdateTime }) => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logoRow}>
            <div className={styles.logoIcon}>
              <TrendingUp size={13} color="white" strokeWidth={2.5} />
            </div>
            <span className={styles.logoText}>AI商业化热榜</span>
          </div>
          <div className={styles.badges}>
            <span className={styles.versionBadge}>V2.0</span>
            <span className={styles.llmBadge}>
              <Sparkles size={9} />
              LLM 评分
            </span>
          </div>
        </div>

        <div className={styles.actions}>
          <div className={styles.updateInfo}>
            <div className={styles.updateDot} />
            <span>更新于 {latestUpdateTime ? formatTime(latestUpdateTime) : '--'}</span>
          </div>
          <button className={styles.exportButton} onClick={onExport}>
            <Download size={13} />
            导出
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
