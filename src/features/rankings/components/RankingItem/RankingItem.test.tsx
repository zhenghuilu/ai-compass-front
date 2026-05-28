import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import RankingItem from './RankingItem'

const mockItem = {
  rank: 1,
  title: 'Test AI商业化热点',
  score: 95,
  reason: '这是一个测试理由',
  url: 'https://example.com',
  dimensions: null,
}

describe('RankingItem', () => {
  it('renders rank and title', () => {
    render(<RankingItem item={mockItem} sourceColor="#3b82f6" />)
    expect(screen.getByText('01')).toBeInTheDocument()
    expect(screen.getByText('Test AI商业化热点')).toBeInTheDocument()
  })

  it('renders score', () => {
    render(<RankingItem item={mockItem} sourceColor="#3b82f6" />)
    expect(screen.getByText('95')).toBeInTheDocument()
  })

  it('renders tier badge', () => {
    render(<RankingItem item={mockItem} sourceColor="#3b82f6" />)
    expect(screen.getByText('现象级')).toBeInTheDocument()
  })

  it('toggles reason panel on click', () => {
    render(<RankingItem item={mockItem} sourceColor="#3b82f6" />)
    expect(screen.queryByText('这是一个测试理由')).not.toBeInTheDocument()

    fireEvent.click(screen.getByLabelText('展开评分理由'))
    expect(screen.getByText('这是一个测试理由')).toBeInTheDocument()

    fireEvent.click(screen.getByLabelText('收起评分理由'))
    expect(screen.queryByText('这是一个测试理由')).not.toBeInTheDocument()
  })

  it('opens in new tab', () => {
    render(<RankingItem item={mockItem} sourceColor="#3b82f6" />)
    const link = screen.getByText('Test AI商业化热点').closest('a')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
