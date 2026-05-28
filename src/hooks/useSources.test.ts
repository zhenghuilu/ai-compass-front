import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useSources } from './useSources'

const mockSources = [
  { id: '36kr', name: '36氪 - AI频道', url: 'https://36kr.com/info/AI/', tag: '创投融资', updateFrequency: '每日', crawlRange: '近1-2周AI商业化相关内容' },
]

beforeEach(() => {
  vi.restoreAllMocks()
})

describe('useSources', () => {
  it('should fetch sources successfully', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, data: mockSources }),
    } as Response)

    const { result } = renderHook(() => useSources())

    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.sources).toEqual(mockSources)
    expect(result.current.error).toBeNull()
  })

  it('should handle fetch error', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('Network error'))

    const { result } = renderHook(() => useSources())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.sources).toEqual([])
    expect(result.current.error).toBe('Network error')
  })

  it('should handle API error response', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: false, error: '服务异常' }),
    } as Response)

    const { result } = renderHook(() => useSources())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.sources).toEqual([])
    expect(result.current.error).toBe('服务异常')
  })
})
