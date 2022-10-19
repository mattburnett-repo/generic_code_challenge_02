
var express = require('express');
var router = express.Router();

var axios = require('axios');

import { ApiError, Estimate } from '../../types/'
import { transformRecord } from '../util/functions'

// jump up three directories because we are actually running the compiled TS code in the 'dist' folder. 
const mockData = require('../../../mock_data/estimate.js')

module.exports = (app: any) => {
  app.use('/', router);

  // GET seems more intuitive / appropriate, but we should use POST.
  router.post('/', async (req: any, res: any) => {
    var config = {
      method: "post",
      url: process.env.DNS_API_URL,
      headers: {
        "Content-Type": "application/json",
      }
    };

    try {
      //  FIXME: don't forget to switch from mock data to API call.
      // const fetchResult = await axios(config)
      const fetchResult = mockData

      const result: Estimate = transformRecord(fetchResult)

      res.status(200).json(result)

    } catch (err: any) {
      //  FIXME: figure out the shape / type for errors
      let theError: ApiError = {
        message: err.message,
        name: err.name,
        code: err.code,
        // status: err.response.status
      }

      // res.status(theError.status).json(theError)
      res.status(400).json(theError)
    }
  })
}