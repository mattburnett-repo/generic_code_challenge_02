
// a minimal router configuration.
//    you can add more routes to the apiRoutes file, if needed

const apiRouter = require('./apiRoutes');

module.exports = (app: any) => {
  apiRouter(app);
}