import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from './Footer'

const mockSources = [
  { id: '36kr', name: '36氪', url: 'https://36kr.com', tag: '', updateFrequency: '', crawlRange: '' },
  { id: 'qbitai', name: '量子位', url: 'https://qbitai.com', tag: '', updateFrequency: '', crawlRange: '' },
]

describe('Footer', () => {
  it('renders brand text', () => {
    render(<Footer sources={mockSources} />)
    expect(screen.getByText('AI商业化热榜')).toBeInTheDocument()
  })

  it('renders source links', () => {
    render(<Footer sources={mockSources} />)
    expect(screen.getByText('36氪')).toBeInTheDocument()
    expect(screen.getByText('量子位')).toBeInTheDocument()
  })

  it('links open in new tab', () => {
    render(<Footer sources={mockSources} />)
    const link = screen.getByText('36氪')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
