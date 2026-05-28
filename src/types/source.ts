export interface Source {
  id: string
  name: string
  url: string
  tag: string
  updateFrequency: string
  crawlRange: string
}

export interface SourceMeta {
  shortName: string
  color: string
}

export interface SourceResponse {
  success: boolean
  data?: Source[]
  error?: string
}

export const SOURCE_META: Record<string, SourceMeta> = {
  '36kr': { shortName: '36氪', color: '#3b82f6' },
  'leiphone': { shortName: '雷峰网', color: '#8b5cf6' },
  'qbitai': { shortName: '量子位', color: '#10b981' },
  'tmtpost': { shortName: '钛媒体', color: '#f59e0b' },
}
