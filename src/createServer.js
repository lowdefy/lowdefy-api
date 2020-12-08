import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import createContext from './context/createContext';
import getRoutes from './routes';
import { handleError } from './context/Errors';

const createServer = ({ contextParams }) => {
  const app = express();
  const context = createContext(contextParams);
  const addContext = (req, res, next) => {
    req.context = context;
    next();
  };
  // middleware

  app.use(logger('dev'));
  app.use(express.json());
  app.use(addContext);

  // routes
  const routes = getRoutes(context);
  routes.forEach((route) => {
    app.options(`/${route}`, cors({ methods: [route.method.toUpperCase()] }));
    app[route.method](route.path, cors(route.cors), route.resolve);
  });

  app.use((req, res) => {
    res.status(404).send({ message: 'Not Found' });
  });

  // Custom error handler needs to have 4 arguments for express to recognize it as an error handler
  // eslint-disable-next-line no-unused-vars
  app.use(async (err, req, res, next) => {
    await handleError(err, res);
  });
  return app;
};

export default createServer;
