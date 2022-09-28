
// types for the entire code challenge project (frontend and backend)

// interface, because maybe it needs to be composed later into something bigger
export interface ApiResponse {
  timestamp: number,
  apiStatus: string,
  apiCode: number,
  meta: MetaData,
  data: ResponseData,
}

type MetaData = {
  url: string
}

type ResponseData = {
  A: Array<A_record>,
  MX: Array<MX_record>,
  NS: Array<String>,
  SOA: Array<SOA_record>,
  TXT: Array<String>
}

type A_record = {
  address: string,
  ttl: number
}

type MX_record = {
  exchange: string,
  priority: number
}

type SOA_record = {
  nsname: string,
  hostmaster: string,
  serial: number,
  refresh: number,
  retry: number,
  expire: number,
  minttl: number
}

export type ApiError = {
  message: string,
  name: string,
  code: string,
  status: number
}

export type RiskAssessment = {
  domain: string,
  riskLevel: number,
  riskLevelDesc: string,
  hasMatureEmail: boolean,
  hasDMARC: boolean,
  hasSPF: boolean,
  hasDKIM: boolean
}