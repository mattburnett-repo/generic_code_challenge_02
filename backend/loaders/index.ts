const expressLoader = require('./expressLoader');
const routeLoader = require('../routes/');

module.exports = async (app: any) => {
  await expressLoader(app);
  await routeLoader(app);

  // Error Handler
  app.use((err: Error, req: Request, res: any, next: any) => {
    const { message } = err;

    res.status(400).send({ message });
  });
}