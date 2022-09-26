
const apiRouter = require('./apiRoutes');

module.exports = (app: any) => {
  apiRouter(app);
}