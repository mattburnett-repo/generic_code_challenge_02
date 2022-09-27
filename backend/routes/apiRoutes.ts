
var express = require('express');
var router = express.Router();

var axios = require('axios');

//  TODO: types should be in a separate file

// interface,not type, because maybe it needs to be later composed into something bigger
interface ApiResponse {
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

type RiskAssessment = {
  domain: string,
  riskLevel: number,
  riskLevelDesc: string,
  hasMatureEmail: boolean,
  hasDMARC: boolean,
  hasSPF: boolean,
  hasDKIM: boolean
}

const mockResponse: ApiResponse = require('../../mockData/baobab_mock.json')

module.exports = (app: any) => {
  app.use('/', router);

  // calculateRisk() is really long and should be in a separate file
  const calculateRisk = (apiRecord: ApiResponse): RiskAssessment => {
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

    // console.log('result: ', result)

    return result
  }

  router.post('/', async (req: any, res: any) => {
    let data: string = JSON.stringify({
      url: req.body.domainName,
      types: ["A", "MX", "NS", "SOA", "TXT"],
    })

    //  NOTE: expects Body / x-www-form-urlencoded from UI / client

    var config = {
      method: "post",
      url: process.env.DNS_API_URL,
      headers: {
        "x-api-key": process.env.DNS_API_KEY,
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      console.log('before axios')
      const result = await axios(config) // sending back an html doc???
      console.log('after axios')
      // console.log('axios result: ', result.data)
      // console.log('asdf DNS_API_URL: ', process.env.DNS_API_URL)
      // console.log('asdf DNS_API_KEY: ', process.env.DNS_API_KEY)
      // res.status(200).json(('end of fetch / try'))
      console.log('before calculateRisk')
      let assessedRisk: RiskAssessment = await calculateRisk(mockResponse)
      // let assessedRisk: RiskAssessment = calculateRisk(result.data)
      console.log('after calculateRisk')

      res.status(200).json(assessedRisk)
    } catch (err: any) {
      // res.status(err.response.data.apiCode).json({ "message": err.response.data })
      res.status(err.response)
    }
  })
}