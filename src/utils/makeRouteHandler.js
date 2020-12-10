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
import { validate } from '@lowdefy/ajv';

function makeRouteHandler(route) {
  const { path, method, resolver, schema } = route;
  async function handler(req, res, next) {
    try {
      const { valid, errors } = validate({
        schema,
        data: req.body,
      });
    } catch (error) {
      throw new req.context.Error.ValidationError(error)
    }
    try {
      const response = await resolver(req);
      return res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  }
  return {
    path,
    method,
    handler,
  };
}
export default makeRouteHandler;
