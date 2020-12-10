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

import dotenv from 'dotenv';
import createServer from './createServer';

dotenv.config({ silent: true });

const options = {
  DATABASE_NAME: process.env.DATABASE_NAME,
  PORT: process.env.PORT,
  secrets: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
  collections: {},
};

const server = createServer({ options });

server.listen(options.PORT, () => console.log(`API listening started on port ${options.PORT}`));
