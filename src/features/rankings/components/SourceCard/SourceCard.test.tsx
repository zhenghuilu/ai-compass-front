import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SourceCard from './SourceCard'

const mockSource = {
  id: '36kr',
  name: '36氪 - AI频道',
  url: 'https://36kr.com',
  tag: '创投',
  updateFrequency: '每日',
  crawlRange: '近1-2周',
}

describe('SourceCard', () => {
  it('renders source name', () => {
    render(<SourceCard source={mockSource} topScore={95} isActive={false} onClick={vi.fn()} />)
    expect(screen.getByText('36氪')).toBeInTheDocument()
  })

  it('renders top score', () => {
    render(<SourceCard source={mockSource} topScore={95} isActive={false} onClick={vi.fn()} />)
    expect(screen.getByText('95')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const onClick = vi.fn()
    render(<SourceCard source={mockSource} topScore={95} isActive={false} onClick={onClick} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })
})
