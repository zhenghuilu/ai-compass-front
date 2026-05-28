import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SourceTabs from './SourceTabs'

const mockSources = [
  { id: '36kr', name: '36氪', url: '', tag: '', updateFrequency: '', crawlRange: '' },
  { id: 'qbitai', name: '量子位', url: '', tag: '', updateFrequency: '', crawlRange: '' },
]

describe('SourceTabs', () => {
  it('renders all source tabs', () => {
    render(<SourceTabs sources={mockSources} activeId="36kr" onSelect={vi.fn()} />)
    expect(screen.getByText('36氪')).toBeInTheDocument()
    expect(screen.getByText('量子位')).toBeInTheDocument()
  })

  it('calls onSelect when tab clicked', () => {
    const onSelect = vi.fn()
    render(<SourceTabs sources={mockSources} activeId="36kr" onSelect={onSelect} />)
    fireEvent.click(screen.getByText('量子位'))
    expect(onSelect).toHaveBeenCalledWith('qbitai')
  })

  it('shows update hint', () => {
    render(<SourceTabs sources={mockSources} activeId="36kr" onSelect={vi.fn()} />)
    expect(screen.getByText('每日更新')).toBeInTheDocument()
  })
})
