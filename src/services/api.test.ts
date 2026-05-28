import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchSources, fetchRankings, fetchFields } from './api'

beforeEach(() => {
  vi.restoreAllMocks()
})

describe('fetchSources', () => {
  it('should return sources on success', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        data: [{ id: '36kr', name: '36氪', url: 'https://36kr.com', tag: '创投', updateFrequency: '每日', crawlRange: '近1-2周' }],
      }),
    } as Response)

    const result = await fetchSources()
    expect(result).toHaveLength(1)
    expect(result[0]?.id).toBe('36kr')
  })

  it('should throw on API error', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: false, error: 'error' }),
    } as Response)

    await expect(fetchSources()).rejects.toThrow('error')
  })
})

describe('fetchRankings', () => {
  it('should fetch all rankings without source', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, data: { '36kr': [] } }),
    } as Response)

    const result = await fetchRankings()
    expect(result).toEqual({ '36kr': [] })
  })

  it('should fetch specific source rankings', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, data: { '36kr': [] } }),
    } as Response)

    const result = await fetchRankings('36kr')
    expect(result).toEqual({ '36kr': [] })
    expect(globalThis.fetch).toHaveBeenCalledWith('http://localhost:3000/api/v1/rankings/36kr')
  })
})

describe('fetchFields', () => {
  it('should return fields on success', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, data: [{ field: '排名', definition: '排名定义', method: '排序方法' }] }),
    } as Response)

    const result = await fetchFields()
    expect(result).toHaveLength(1)
    expect(result[0]?.field).toBe('排名')
  })
})
