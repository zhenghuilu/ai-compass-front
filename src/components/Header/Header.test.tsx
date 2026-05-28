import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Header from './Header'

describe('Header', () => {
  it('renders brand name', () => {
    render(<Header />)
    expect(screen.getByText('AI商业化热榜')).toBeInTheDocument()
  })

  it('renders version badge', () => {
    render(<Header />)
    expect(screen.getByText('V2.0')).toBeInTheDocument()
  })

  it('renders LLM badge', () => {
    render(<Header />)
    expect(screen.getByText('LLM 评分')).toBeInTheDocument()
  })

  it('renders export button', () => {
    render(<Header />)
    expect(screen.getByText('导出')).toBeInTheDocument()
  })

  it('calls onExport when export button clicked', () => {
    const onExport = vi.fn()
    render(<Header onExport={onExport} />)
    fireEvent.click(screen.getByText('导出'))
    expect(onExport).toHaveBeenCalledOnce()
  })
})
