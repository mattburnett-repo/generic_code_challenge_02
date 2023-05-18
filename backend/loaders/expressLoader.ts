
//  a minimal Express server configuration

const cors = require('cors')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

module.exports = (app: any) => {
  let corsOptions = {
    origin: process.env.CLIENT_URL
  }
  app.use(cors(corsOptions))

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());

  return app;
}