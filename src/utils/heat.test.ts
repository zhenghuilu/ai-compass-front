import { describe, it, expect } from 'vitest'
import { heatColor, heatTier } from './heat'

describe('heatColor', () => {
  it.each([
    [100, '#ef4444'],
    [95, '#ef4444'],
    [85, '#ef4444'],
    [84, '#f0a500'],
    [70, '#f0a500'],
    [60, '#f0a500'],
    [59, '#38bdf8'],
    [40, '#38bdf8'],
    [39, '#5d6d8a'],
    [0, '#5d6d8a'],
  ])('heatColor(%i) should return %s', (score, expected) => {
    expect(heatColor(score)).toBe(expected)
  })
})

describe('heatTier', () => {
  it.each([
    [100, { text: '现象级', tier: 'A' }],
    [85, { text: '现象级', tier: 'A' }],
    [84, { text: '核心热点', tier: 'B' }],
    [60, { text: '核心热点', tier: 'B' }],
    [59, { text: '常规议题', tier: 'C' }],
    [40, { text: '常规议题', tier: 'C' }],
    [39, { text: '低热', tier: 'D' }],
    [0, { text: '低热', tier: 'D' }],
  ])('heatTier(%i) should return %j', (score, expected) => {
    expect(heatTier(score)).toEqual(expected)
  })
})
