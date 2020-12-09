import express from 'express';
import logger from 'morgan';

import routes from './routes/routes';
import addContext from './utils/addContext';
import handleError from './utils/handleError';

const createServer = ({ options }) => {
  const app = express();

  // middleware
  app.use(logger('dev'));
  app.use(express.json());
  app.use(addContext(options));

  // routes
  routes.forEach((route) => {
    app[route.method](route.path, route.handler);
  });

  app.use((req, res) => {
    res.status(404).send({ message: 'Not Found' });
  });

  // Custom error handler needs to have 4 arguments for express to recognize it as an error handler
  // eslint-disable-next-line no-unused-vars
  app.use(handleError);
  // app.use(async (err, req, res, next) => {
  //   await handleError(err, res);
  // });

  return app;
};

export default createServer;
