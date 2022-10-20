
var express = require('express');
var router = express.Router();

var axios = require('axios');

import { Estimate, ApiError } from '../../types/'
import { transformRecord } from '../util/functions'

// jump up three directories because we are actually running the compiled TS code in the 'dist' folder. 
const mockData = require('../../../mock_data/estimate.js')

module.exports = (app: any) => {
  app.use('/', router);

  // GET seems more intuitive / appropriate, but we should use POST.
  //    we POST from the UI, but we GET from the API. Maybe we will
  //      send vars from the UI, in the future.
  router.post('/', async (req: any, res: any) => {
    var config = {
      method: "get",
      url: process.env.DNS_API_URL,
      headers: {
        "Content-Type": "application/json",
      }
    };

    try {
      const fetchResult = await axios(config)
      const result: Estimate = transformRecord(fetchResult.data)

      res.status(200).json(result)

    } catch (err: any) {
      // Catch clause variable type annotation must be 'any' or 'unknown' if specified.

      let apiError: ApiError

      if (err.response.status == 429) {
        apiError = {
          code: err.response.status,
          text: err.response.statusText
        }
      } else {
        apiError = {
          code: err.response.status,
          text: err.response.statusText
        }
      }

      // console.log('err: ', err)
      // console.log('error code: ', err.response.status)
      // console.log('apiError: ', apiError)
      res.status(400).json(apiError)
    }
  })
}