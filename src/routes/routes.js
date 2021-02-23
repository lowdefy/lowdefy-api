/*
  Copyright 2020-2021 Lowdefy, Inc

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

import makeRouteHandler from '../utils/makeRouteHandler';
import errors from './errors/post';
import marketing from './marketing/post';
import telemetryCli from './telemetry/cli/post';
import telemetryDocs from './telemetry/docs/post';
import telemetryWeb from './telemetry/web/post';

const routes = [
  {
    path: '/errors',
    method: 'post',
    resolver: errors.resolver,
    schema: errors.schema,
  },
  {
    path: '/marketing',
    method: 'post',
    resolver: marketing.resolver,
    schema: marketing.schema,
  },
  {
    path: '/telemetry/cli',
    method: 'post',
    resolver: telemetryCli.resolver,
    schema: telemetryCli.schema,
  },
  {
    path: '/telemetry/docs',
    method: 'post',
    resolver: telemetryDocs.resolver,
    schema: telemetryDocs.schema,
  },
  {
    path: '/telemetry/web',
    method: 'post',
    resolver: telemetryWeb.resolver,
    schema: telemetryWeb.schema,
  },
].map((route) => makeRouteHandler(route));

export default routes;
