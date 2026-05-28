import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Methodology from './Methodology'

describe('Methodology', () => {
  it('renders trigger button', () => {
    render(<Methodology />)
    expect(screen.getByText('LLM 评分方法论')).toBeInTheDocument()
  })

  it('toggles content on click', () => {
    render(<Methodology />)
    expect(screen.queryByText('商业影响力')).not.toBeInTheDocument()

    fireEvent.click(screen.getByText('LLM 评分方法论'))
    expect(screen.getByText('商业影响力')).toBeInTheDocument()
    expect(screen.getByText('讨论密度')).toBeInTheDocument()
    expect(screen.getByText('时效性')).toBeInTheDocument()
    expect(screen.getByText('信源权威性')).toBeInTheDocument()

    fireEvent.click(screen.getByText('LLM 评分方法论'))
    expect(screen.queryByText('商业影响力')).not.toBeInTheDocument()
  })
})
