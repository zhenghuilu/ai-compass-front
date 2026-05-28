export interface Dimensions {
  business_impact: number
  discussion_density: number
  timeliness: number
  authority: number
}

export interface RankingItem {
  rank: number
  title: string
  score: number
  dimensions: Dimensions | null
  reason: string
  url: string
}

export interface RankingsData {
  [sourceId: string]: RankingItem[]
}

export interface RankingsResponse {
  success: boolean
  data?: RankingsData
  error?: string
}

export interface SourceUpdateInfo {
  lastCrawlTime: string | null
  lastScoreTime: string | null
  status: string
}

export interface UpdateTimeData {
  latestUpdateTime: string
  sources: Record<string, SourceUpdateInfo>
}

export interface UpdateTimeResponse {
  success: boolean
  data?: UpdateTimeData
  error?: string
}

export interface FieldDefinition {
  field: string
  definition: string
  method: string
}

export interface FieldsResponse {
  success: boolean
  data?: FieldDefinition[]
  error?: string
}
