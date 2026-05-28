import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useRankings } from './useRankings'

const mockRankings = [
  { rank: 1, title: 'Test', score: 95, reason: 'Reason', url: 'https://example.com', dimensions: null },
]

beforeEach(() => {
  vi.restoreAllMocks()
})

describe('useRankings', () => {
  it('should fetch rankings for a source', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, data: { '36kr': mockRankings } }),
    } as Response)

    const { result } = renderHook(() => useRankings('36kr'))

    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.rankings).toEqual(mockRankings)
    expect(result.current.error).toBeNull()
  })

  it('should return empty when sourceId is null', () => {
    const { result } = renderHook(() => useRankings(null))

    expect(result.current.rankings).toEqual([])
    expect(result.current.loading).toBe(false)
  })

  it('should handle unknown source error', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, data: { '36kr': mockRankings } }),
    } as Response)

    const { result } = renderHook(() => useRankings('unknown'))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.rankings).toEqual([])
    expect(result.current.error).toBe('未找到数据源: unknown')
  })
})
