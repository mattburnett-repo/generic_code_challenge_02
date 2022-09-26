"use strict";
const apiRouter = require('./apiRoutes');
module.exports = (app) => {
    apiRouter(app);
};
