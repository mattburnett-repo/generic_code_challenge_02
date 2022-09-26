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
var axios = require('axios');
// const mockResponse: ApiResponse = require('../../mockData/baobab_mock.json')
module.exports = (app) => {
    app.use('/', router);
    // calculateRisk() is really long and should be in a separate file
    const calculateRisk = (apiRecord) => {
        let tempRiskLevel = 3;
        let tempHasEmail = false;
        let tempHasSPF = false;
        let tempHasDKIM = false;
        let tempHasDMARC = false;
        let tempRiskLevelDesc = '';
        if (apiRecord.data.MX.length > 0) {
            try {
                apiRecord.data.MX.forEach(elem => {
                    let theStr = elem.exchange;
                    //  TODO: this could be done more cleanly
                    if (theStr.includes('google.com') || theStr.includes('protonmail') || theStr.includes('Outlook')) {
                        tempHasEmail = true;
                        tempRiskLevel -= 1;
                        throw new Error("End MX loop");
                    }
                });
            }
            catch (e) {
                // catch error to break out of forEach()
                // console.log(e.message)
            }
        }
        // check for SPF
        if (apiRecord.data.TXT.length > 0) {
            try {
                apiRecord.data.TXT.forEach(elem => {
                    console.log(elem[0]);
                    if (elem[0].includes('v=spf')) {
                        tempHasSPF = true;
                        tempRiskLevel -= 1;
                        throw new Error("End SPF check");
                    }
                });
            }
            catch (e) {
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
                        tempHasDKIM = true;
                        // tempRiskLevel -= 1
                        throw new Error("End DKIM check");
                    }
                });
            }
            catch (e) {
                // catch error to break out of forEach()
                //  console.log(e.message)
            }
        }
        // can't find an API that returns DMARC with all other DNS info
        //    since DMARC can't exist without SPR and DKIM, let's assume
        //      that a DNS record with SPF and DKIM also has DMARC
        // TODO: find API that returns SPF and DMARC info in one record
        if (tempHasSPF && tempHasDKIM) {
            tempHasDMARC = true;
            tempRiskLevel -= 1;
        }
        //  this could be typed better, maybe an enum
        switch (tempRiskLevel) {
            case (3):
                tempRiskLevelDesc = 'Risk level is high.';
                break;
            case (2):
                tempRiskLevelDesc = 'Risk level is moderately high.';
                break;
            case (1):
                tempRiskLevelDesc = 'Risk level is moderately low.';
                break;
            case (0):
                tempRiskLevelDesc = 'Risk level is low.';
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
            hasSPF: tempHasSPF,
            hasDKIM: tempHasDKIM
        };
        // console.log('result: ', result)
        return result;
    };
    router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let data = JSON.stringify({
            url: req.body.domainName,
            types: ["A", "MX", "NS", "SOA", "TXT"],
        });
        //  NOTE: expects Body / x-www-form-urlencoded from UI / client
        var config = {
            method: "post",
            url: process.env.dns_api_url,
            headers: {
                "x-api-key": process.env.dns_api_key,
                "Content-Type": "application/json",
            },
            data: data,
        };
        try {
            const result = yield axios(config);
            let assessedRisk = calculateRisk(result.data);
            res.status(200).json(assessedRisk);
        }
        catch (err) {
            res.status(err.response.data.apiCode).json({ 'ERROR: ': err.response.data.message + ' Looked for domain: ' + err.response.data.meta.url });
        }
    }));
};
