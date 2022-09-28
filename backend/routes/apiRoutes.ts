
var express = require('express');
var router = express.Router();

var axios = require('axios');

import { ApiError, RiskAssessment, ApiResponse } from '../../types/'
import { calculateRisk } from '../util/functions'

module.exports = (app: any) => {
  app.use('/', router);

  router.post('/', async (req: any, res: any) => {
    let data: string = JSON.stringify({
      url: req.body.domainName,
      types: ["A", "MX", "NS", "SOA", "TXT"],
    })

    //  NOTE: this route expects Body = x-www-form-urlencoded from UI / client
    //    it sends application/json to the 3rd party API
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
      const result = await axios(config)
      let assessedRisk: RiskAssessment = calculateRisk(result.data)

      // let assessedRisk: RiskAssessment = calculateRisk(mockResponse)

      console.log("assessedRisk", assessedRisk)


      res.status(200).json(assessedRisk)
    } catch (err: any) {
      let theError: ApiError = {
        message: err.message,
        name: err.name,
        code: err.code,
        status: err.response.status
      }

      res.status(theError.status).json(theError)
    }
  })
}