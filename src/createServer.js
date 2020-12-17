/*
  Copyright 2020 Lowdefy, Inc

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import cors from 'cors';
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
  app.use(cors());

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
