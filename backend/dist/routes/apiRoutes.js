"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var express = require('express');
var router = express.Router();
const axios = require('axios');
const mockResponse = require('../../mockData/baobab_mock.json');
module.exports = (app) => {
    app.use('/', router);
    const calculateRisk = (apiRecord) => {
        let tempRiskLevel = 3;
        let tempHasEmail = false;
        let tempHasSPF = false;
        let tempHasDKIM = false;
        let tempHasDMARC = false;
        let tempRiskLevelDesc = '';
        //  check for email
        if (apiRecord.data.MX.length > 0) {
            try {
                apiRecord.data.MX.forEach(elem => {
                    if (elem.exchange.includes('google.com')) {
                        tempHasEmail = true;
                        tempRiskLevel -= 1;
                        throw new Error("End MX loop");
                    }
                });
            }
            catch (e) {
                // console.log(e.message)
            }
        }
        // check for SPF
        if (apiRecord.data.TXT.length > 0) {
            try {
                apiRecord.data.TXT.forEach(elem => {
                    if (elem[0].includes('v=spf')) {
                        console.log('SPF');
                        tempHasSPF = true;
                        tempRiskLevel -= 1;
                        throw new Error("End SPF check");
                    }
                });
            }
            catch (e) {
                //  console.log(e.message)
            }
        }
        // check for DKIM
        if (apiRecord.data.TXT.length > 0) {
            try {
                apiRecord.data.TXT.forEach(elem => {
                    if (elem[0].includes('v=DKIM')) {
                        console.log('DKIM');
                        tempHasDKIM = true;
                        // tempRiskLevel -= 1
                        throw new Error("End DKIM check");
                    }
                });
            }
            catch (e) {
                //  console.log(e.message)
            }
        }
        // can't find an API that returns DMARC with all other DNS info
        //    since DMARC can't exist without SPR and DKIM, let's assume
        //      that a DNS record with SPF and DKIM also has DMARC
        // TODO: find API that returns SPF and DMARC info in one record
        if (tempHasSPF && tempHasSPF) {
            console.log(tempHasSPF, tempHasSPF);
            tempHasDMARC = true;
            tempRiskLevel -= 1;
        }
        switch (tempRiskLevel) {
            case (3):
                tempRiskLevelDesc = 'Risk level is high (3).';
                break;
            case (2):
                tempRiskLevelDesc = 'Risk level is moderately high (2).';
                break;
            case (1):
                tempRiskLevelDesc = 'Risk level is moderately low (1).';
                break;
            case (0):
                tempRiskLevelDesc = 'Risk level is low (0).';
                break;
            default:
                tempRiskLevelDesc = 'Cannot determine risk level with given information.';
        }
        let result = {
            domain: apiRecord.meta.url,
            riskLevel: tempRiskLevel,
            riskLevelDesc: tempRiskLevelDesc,
            hasMatureEmail: tempHasEmail,
            hasDMARC: tempHasDMARC,
            hasSPF: tempHasDKIM
        };
        console.log('result: ', result);
        return result;
    };
    router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let theDomain = req.body.domainName;
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
        let assessedRisk = calculateRisk(mockResponse);
        res.status(200).json(assessedRisk);
    }));
};
