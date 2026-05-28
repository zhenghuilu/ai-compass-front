import React from 'react'
import { heatColor } from '@/utils/heat'
import styles from './HeatBar.module.css'

interface HeatBarProps {
  value: number
}

const HeatBar: React.FC<HeatBarProps> = ({ value }) => {
  return (
    <div className={styles.track}>
      <div
        className={styles.bar}
        style={{ width: `${value}%`, backgroundColor: heatColor(value) }}
      />
    </div>
  )
}

export default HeatBar
