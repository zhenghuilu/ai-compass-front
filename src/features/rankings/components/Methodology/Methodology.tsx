import React, { useState } from 'react'
import { Info, ChevronDown, ChevronUp } from 'lucide-react'
import styles from './Methodology.module.css'

const DIMENSIONS = [
  { name: '商业影响力', weight: '40%', color: '#ef4444', desc: '对相关行业/公司的实质商业影响' },
  { name: '讨论密度', weight: '30%', color: '#f0a500', desc: '有多少篇文章在讨论该议题' },
  { name: '时效性', weight: '20%', color: '#38bdf8', desc: '议题的新鲜度' },
  { name: '信源权威性', weight: '10%', color: '#a78bfa', desc: '报道该议题的信源质量' },
]

const Methodology: React.FC = () => {
  const [expanded, setExpanded] = useState(false)

  return (
    <section className={styles.section}>
      <button
        className={styles.trigger}
        onClick={() => setExpanded((prev) => !prev)}
      >
        <div className={styles.triggerLeft}>
          <Info size={15} style={{ color: 'var(--color-primary)' }} />
          <span className={styles.triggerTitle}>LLM 评分方法论</span>
          <span className={styles.versionBadge}>V2.0</span>
        </div>
        {expanded ? (
          <ChevronUp size={14} style={{ color: 'var(--color-muted-foreground)' }} />
        ) : (
          <ChevronDown size={14} style={{ color: 'var(--color-muted-foreground)' }} />
        )}
      </button>

      {expanded && (
        <div className={styles.panel}>
          <div className={styles.grid}>
            {DIMENSIONS.map((dim) => (
              <div key={dim.name} className={styles.dimensionCard}>
                <div className={styles.dimensionHeader}>
                  <span className={styles.dimensionName} style={{ color: dim.color }}>
                    {dim.name}
                  </span>
                  <span
                    className={styles.dimensionWeight}
                    style={{ color: dim.color, backgroundColor: `${dim.color}18` }}
                  >
                    {dim.weight}
                  </span>
                </div>
                <p className={styles.dimensionDesc}>{dim.desc}</p>
              </div>
            ))}
          </div>

          <p className={styles.disclaimer}>
            以上排名和热度由 大模型综合评估生成，评估维度包括商业影响力、讨论密度、时效性和信源权威性。榜单每日更新一次，反映近1-2周内AI商业化领域的核心动态。点击标题可跳转至原始文章页面。
          </p>
        </div>
      )}
    </section>
  )
}

export default Methodology
