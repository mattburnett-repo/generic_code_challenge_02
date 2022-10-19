
import { ApiResponse, ApiRecord, ApiResult, Estimate, EstimateRecord } from '../../types/'

export const transformRecord = (apiRecord: ApiResponse): Estimate => {
  let theRecord: ApiResult = apiRecord.result

  let result: Estimate = {
    watts: parseRecord(theRecord.watts),
    watt_hours: parseRecord(theRecord.watt_hours),
    watt_hours_period: parseRecord(theRecord.watt_hours_period),
    watt_hours_day: parseRecord(theRecord.watt_hours_day),
    message: apiRecord.message
  }

  return result
}

const parseRecord = (record: ApiRecord): Array<EstimateRecord> => {
  let date: string
  let time: string
  let watts: string | number  // it's really a number, but this makes typescript happy.
  let result: Array<EstimateRecord> = []
  let estimateDate: string = ''
  let estimate: EstimateRecord = {}

  const recordLength: number = Object.entries(record).length

  // FIXME: this has a O() of n-squared (or something similar)?
  //    tried a for ... in loop, because grinding through the recordset only once could
  //      reduce O() to n. While trying to get it to work, I debugged by
  //      writing out the steps involved, using nested for loops. Then all of a sudden
  //      it worked, so I'm sticking with this version for now.
  for (let i = 0; i < recordLength; i++) {
    date = Object.keys(record)[i].split(' ')[0]

    if (date != estimateDate) {
      estimateDate = date
      estimate[estimateDate] = []

      for (let j = 0; j < recordLength; j++) {
        if (Object.keys(record)[j].split(' ')[0] == estimateDate) {
          time = Object.keys(record)[j].split(' ')[1]
          watts = Object.values(record)[j]
          estimate[estimateDate].push({ time, watts })
        }
      }

      // we're done with the current estimate. push it to the result array and make room for a new one.
      result.push(estimate)
      estimate = {}
    }
  }

  return result
}
