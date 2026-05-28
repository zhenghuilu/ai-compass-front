import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import HeatBar from './HeatBar'

describe('HeatBar', () => {
  it('renders with correct width', () => {
    const { container } = render(<HeatBar value={75} />)
    const bar = container.querySelector('[style*="width"]') as HTMLElement
    expect(bar).toBeInTheDocument()
    expect(bar.style.width).toBe('75%')
  })
})
