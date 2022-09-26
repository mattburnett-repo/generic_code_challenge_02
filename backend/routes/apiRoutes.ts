
var express = require('express');
var router = express.Router();

const axios = require('axios');

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
  hasSPF: boolean
}

const mockResponse: ApiResponse = require('../../mockData/baobab_mock.json')

module.exports = (app: any) => {
  app.use('/', router);

  const calculateRisk = (apiRecord: ApiResponse): RiskAssessment => {
    let tempRiskLevel: number = 3
    let tempHasEmail: boolean = false
    let tempHasSPF: boolean = false
    let tempHasDKIM: boolean = false
    let tempHasDMARC: boolean = false
    let tempRiskLevelDesc: string = ''

    //  check for email
    if (apiRecord.data.MX.length > 0) {
      try {
        apiRecord.data.MX.forEach(elem => {
          if (elem.exchange.includes('google.com')) {
            tempHasEmail = true
            tempRiskLevel -= 1

            throw new Error("End MX loop")
          }
        })
      } catch (e) {
        // console.log(e.message)
      }
    }

    // check for SPF
    if (apiRecord.data.TXT.length > 0) {
      try {
        apiRecord.data.TXT.forEach(elem => {
          if (elem[0].includes('v=spf')) {
            console.log('SPF')
            tempHasSPF = true
            tempRiskLevel -= 1

            throw new Error("End SPF check")
          }
        })
      } catch (e) {
        //  console.log(e.message)
      }
    }
    // check for DKIM
    if (apiRecord.data.TXT.length > 0) {
      try {
        apiRecord.data.TXT.forEach(elem => {
          if (elem[0].includes('v=DKIM')) {
            console.log('DKIM')
            tempHasDKIM = true
            // tempRiskLevel -= 1

            throw new Error("End DKIM check")
          }
        })
      } catch (e) {
        //  console.log(e.message)
      }

    }
    // can't find an API that returns DMARC with all other DNS info
    //    since DMARC can't exist without SPR and DKIM, let's assume
    //      that a DNS record with SPF and DKIM also has DMARC
    // TODO: find API that returns SPF and DMARC info in one record
    if (tempHasSPF && tempHasSPF) {
      console.log(tempHasSPF, tempHasSPF)
      tempHasDMARC = true
      tempRiskLevel -= 1
    }

    switch (tempRiskLevel) {
      case (3):
        tempRiskLevelDesc = 'Risk level is high (3).'
        break
      case (2):
        tempRiskLevelDesc = 'Risk level is moderately high (2).'
        break
      case (1):
        tempRiskLevelDesc = 'Risk level is moderately low (1).'
        break
      case (0):
        tempRiskLevelDesc = 'Risk level is low (0).'
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
      hasSPF: tempHasDKIM
    }

    console.log('result: ', result)

    return result
  }

  router.post('/', async (req: any, res: any) => {
    let theDomain: string = req.body.domainName

    // var options = {
    //   'method': 'POST',
    //   'url': process.env.dns_api_url,
    //   'headers': {
    //     'X-API-KEY': process.env.dns_api_key,
    //     'Content-Type': 'application/json'
    //   },
    //    'body': {
    //   "url": req.body.domainName
    // }
    // };
    // const result = await axios(options);


    // let assessedRisk: RiskAssessment = calculateRisk(mockResponse)
    let assessedRisk: RiskAssessment = calculateRisk(mockResponse)

    res.status(200).json(assessedRisk)
  })
}