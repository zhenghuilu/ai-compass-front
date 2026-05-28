export type HeatTier = 'A' | 'B' | 'C' | 'D'

export interface HeatTierInfo {
  text: string
  tier: HeatTier
}

export function heatColor(score: number): string {
  if (score >= 85) return '#ef4444'
  if (score >= 60) return '#f0a500'
  if (score >= 40) return '#38bdf8'
  return '#5d6d8a'
}

export function heatTier(score: number): HeatTierInfo {
  if (score >= 85) return { text: '现象级', tier: 'A' }
  if (score >= 60) return { text: '核心热点', tier: 'B' }
  if (score >= 40) return { text: '常规议题', tier: 'C' }
  return { text: '低热', tier: 'D' }
}
