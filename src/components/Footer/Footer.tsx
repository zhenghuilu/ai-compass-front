import React from 'react'
import type { Source } from '@/types/source'
import styles from './Footer.module.css'

interface FooterProps {
  sources: Source[]
}

const Footer: React.FC<FooterProps> = ({ sources }) => {
  return (
    <footer className={styles.footer}>
      <div>
        <span className={styles.brand}>AI商业化热榜</span>
        {' '}— 聚焦国内AI商业化进程的独立资讯工具
      </div>
      <div className={styles.links}>
        {sources.map((source) => (
          <a
            key={source.id}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            {source.name}
          </a>
        ))}
      </div>
    </footer>
  )
}

export default Footer
