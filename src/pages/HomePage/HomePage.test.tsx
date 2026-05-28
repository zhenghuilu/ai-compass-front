import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import HomePage from './HomePage'

describe('HomePage', () => {
  it('renders without crashing', () => {
    const { container } = render(<HomePage />)
    expect(container).toBeInTheDocument()
  })
})
