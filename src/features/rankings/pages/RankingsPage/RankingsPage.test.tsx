import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import RankingsPage from './RankingsPage'

const mockSources = [
  { id: '36kr', name: '36氪 - AI频道', url: 'https://36kr.com', tag: '创投', updateFrequency: '每日', crawlRange: '近1-2周' },
  { id: 'qbitai', name: '量子位', url: 'https://qbitai.com', tag: '动态', updateFrequency: '每日', crawlRange: '近1-2周' },
]

const mockRankings = [
  { rank: 1, title: '热点一', score: 95, reason: '理由一', url: 'https://example.com/1', dimensions: null },
  { rank: 2, title: '热点二', score: 80, reason: '理由二', url: 'https://example.com/2', dimensions: null },
]

const mockTopScores = {
  '36kr': 95,
  'qbitai': 88,
}

describe('RankingsPage', () => {
  it('renders hero title', () => {
    render(
      <RankingsPage
        sources={mockSources}
        rankings={mockRankings}
        sourceTopScore={mockTopScores}
        selectedSource="36kr"
        loading={false}
        error={null}
        onSelectSource={() => {}}
      />
    )
    expect(screen.getByText('国内 AI 商业化')).toBeInTheDocument()
  })

  it('renders loading state', () => {
    render(
      <RankingsPage
        sources={mockSources}
        rankings={[]}
        sourceTopScore={{}}
        selectedSource="36kr"
        loading={true}
        error={null}
        onSelectSource={() => {}}
      />
    )
    expect(screen.getByText('加载中...')).toBeInTheDocument()
  })

  it('renders error state', () => {
    render(
      <RankingsPage
        sources={mockSources}
        rankings={[]}
        sourceTopScore={{}}
        selectedSource="36kr"
        loading={false}
        error="网络错误"
        onSelectSource={() => {}}
      />
    )
    expect(screen.getByText('网络错误')).toBeInTheDocument()
  })

  it('renders ranking items', () => {
    render(
      <RankingsPage
        sources={mockSources}
        rankings={mockRankings}
        sourceTopScore={mockTopScores}
        selectedSource="36kr"
        loading={false}
        error={null}
        onSelectSource={() => {}}
      />
    )
    expect(screen.getByText('热点二')).toBeInTheDocument()
  })

  it('renders pinned top item', () => {
    render(
      <RankingsPage
        sources={mockSources}
        rankings={mockRankings}
        sourceTopScore={mockTopScores}
        selectedSource="36kr"
        loading={false}
        error={null}
        onSelectSource={() => {}}
      />
    )
    expect(screen.getByText('本周置顶')).toBeInTheDocument()
    expect(screen.getAllByText('热点一')).toHaveLength(2)
  })

  it('renders each source card with its own top score', () => {
    render(
      <RankingsPage
        sources={mockSources}
        rankings={mockRankings}
        sourceTopScore={mockTopScores}
        selectedSource="36kr"
        loading={false}
        error={null}
        onSelectSource={() => {}}
      />
    )
    expect(screen.getAllByText('95')).toHaveLength(2)
    expect(screen.getByText('88')).toBeInTheDocument()
  })
})
