
// types for the entire project (frontend and backend)

// what we expect from the API
//    interface, because maybe someday it needs to be composed later into something bigger
export interface ApiResponse {
  result: ApiResult,
  message: ApiMessage
}

export type ApiResult = {
  watts: ApiRecord,
  watt_hours: ApiRecord,
  watt_hours_period: ApiRecord,
  watt_hours_day: ApiRecord
}

export type ApiRecord = {
  date_time: string,
  watt_amount: number
}

type ApiMessage = {
  code: number,
  type: string,
  text: string,
  info: ApiMessageInfo,
  ratelimit: ApiRateLimit
}

type ApiMessageInfo = {
  latitude: number,
  longitude: number,
  distance: number,
  place: string,
  timezone: string,
  time: string,
  time_utc: string
}

type ApiRateLimit = {
  period: number,
  limit: number,
  remaining: number
}

// Error from api when fetching data
//  FIXME: figure out shape of error message and clean this up. Also in apiRoutes.js
export type ApiError = {
  code: string,
  text: string,
  name?: string,
  status?: number,
  statusText?: string
}

//  What we send back
export type Estimate = {
  watts: Array<EstimateRecord>,
  watt_hours: Array<EstimateRecord>,
  watt_hours_period: Array<EstimateRecord>,
  watt_hours_day: Array<EstimateRecord>,
  message: EstimateMessage
}

// https://www.w3schools.com/typescript/typescript_object_types.php
//    index signatures
export type EstimateRecord = {
  [index: string]: Array<EstimateData>
}

export type EstimateData = {
  time: string,
  watts: string | number
}

type EstimateMessage = {
  code: number,
  type: string,
  text: string,
  info: ApiMessageInfo,
  ratelimit: ApiRateLimit
}
