
import { ApiResponse, RiskAssessment } from '../../types/'

// this could be refactored / generalised / etc. for each 'type' (MX / TXT types)
export const calculateRisk = (apiRecord: ApiResponse): RiskAssessment => {
  let tempRiskLevel: number = 3
  let tempHasEmail: boolean = false
  let tempHasSPF: boolean = false
  let tempHasDKIM: boolean = false
  let tempHasDMARC: boolean = false
  let tempRiskLevelDesc: string = ''

  if (apiRecord.data.MX.length > 0) {
    try {
      apiRecord.data.MX.forEach(elem => {
        let theStr: string = elem.exchange
        //  TODO: this could be done more cleanly
        if (theStr.includes('google.com') || theStr.includes('protonmail') || theStr.includes('Outlook')) {
          tempHasEmail = true
          tempRiskLevel -= 1

          throw new Error("End MX loop")
        }
      })
    } catch (e) {
      // catch error to break out of forEach()
      // console.log(e.message)
    }
  }

  // check for SPF
  if (apiRecord.data.TXT.length > 0) {
    try {
      apiRecord.data.TXT.forEach(elem => {
        if (elem[0].includes('v=spf')) {
          tempHasSPF = true
          tempRiskLevel -= 1

          throw new Error("End SPF check")
        }
      })
    } catch (e) {
      // catch error to break out of forEach()
      // console.log(e)
    }
  }
  // check for DKIM
  //  TODO: combine with SPF test, since we're just looping though TXT records
  if (apiRecord.data.TXT.length > 0) {
    try {
      apiRecord.data.TXT.forEach(elem => {
        if (elem[0].includes('v=DKIM')) {
          tempHasDKIM = true
          // tempRiskLevel -= 1

          throw new Error("End DKIM check")
        }
      })
    } catch (e) {
      // catch error to break out of forEach()
      //  console.log(e.message)
    }

  }
  // can't find an API that returns DMARC with all other DNS info
  //    since DMARC can't exist without SPR and DKIM, let's assume
  //      that a DNS record with SPF and DKIM also has DMARC
  // TODO: find API that returns SPF and DMARC info in one record
  if (tempHasSPF && tempHasDKIM) {
    tempHasDMARC = true
    tempRiskLevel -= 1
  }

  //  this could be typed better, maybe an enum
  switch (tempRiskLevel) {
    case (3):
      tempRiskLevelDesc = 'Risk level is high.'
      break
    case (2):
      tempRiskLevelDesc = 'Risk level is moderately high.'
      break
    case (1):
      tempRiskLevelDesc = 'Risk level is moderately low.'
      break
    case (0):
      tempRiskLevelDesc = 'Risk level is low.'
      break
    default:
      tempRiskLevelDesc = 'Cannot determine risk level with given information.'
  }

  let result: RiskAssessment = {
    domain: apiRecord.meta.url,
    riskLevel: tempRiskLevel,
    riskLevelDesc: tempRiskLevelDesc,
    hasMatureEmail: tempHasEmail,
    hasDMARC: tempHasDMARC,
    hasSPF: tempHasSPF,
    hasDKIM: tempHasDKIM
  }

  return result
}