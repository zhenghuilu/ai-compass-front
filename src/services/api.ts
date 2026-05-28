import type { RankingsData, RankingsResponse, FieldsResponse, FieldDefinition, UpdateTimeResponse, UpdateTimeData } from '@/types/ranking'
import type { Source, SourceResponse } from '@/types/source'

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'

class ApiError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

async function request<T>(url: string): Promise<T> {
  const response = await fetch(url)

  if (!response.ok) {
    throw new ApiError(`HTTP ${response.status}: ${response.statusText}`)
  }

  const json = await response.json() as T

  return json
}

export async function fetchSources(): Promise<Source[]> {
  const json = await request<SourceResponse>(`${BASE_URL}/api/v1/sources`)

  if (!json.success || !json.data) {
    throw new ApiError(json.error ?? '获取数据源失败')
  }

  return json.data
}

export async function fetchRankings(source?: string): Promise<RankingsData> {
  const url = source
    ? `${BASE_URL}/api/v1/rankings/${source}`
    : `${BASE_URL}/api/v1/rankings`

  const json = await request<RankingsResponse>(url)

  if (!json.success || !json.data) {
    throw new ApiError(json.error ?? '获取榜单失败')
  }

  return json.data
}

export async function fetchFields(): Promise<FieldDefinition[]> {
  const json = await request<FieldsResponse>(`${BASE_URL}/api/v1/fields`)

  if (!json.success || !json.data) {
    throw new ApiError(json.error ?? '获取字段说明失败')
  }

  return json.data
}

export async function fetchUpdateTime(): Promise<UpdateTimeData> {
  const json = await request<UpdateTimeResponse>(`${BASE_URL}/api/v1/updatetime`)

  if (!json.success || !json.data) {
    throw new ApiError(json.error ?? '获取更新时间失败')
  }

  return json.data
}

export async function checkHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${BASE_URL}/health`)
    const json = await response.json()
    return json.status === 'ok'
  } catch {
    return false
  }
}
