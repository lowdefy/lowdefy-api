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

// import { MongoClient } from 'mongodb';

async function handleError(err, req, res, next) {
  let doc = {};
  try {
    if (err.properties) {
      const { statusCode, message, payload, method } = err.properties;
      doc = JSON.parse(
        JSON.stringify({
          payload,
          message,
          method,
          statusCode,
          error: err.name,
          stack: err.stack,
        })
      );
    } else {
      doc = JSON.parse(
        JSON.stringify({
          name: err.name,
          message: err.message,
          stack: err.stack,
          statusCode: 500,
        })
      );
    }
    console.log(doc);
    console.error(err);
    // const client = new MongoClient(process.env.MONGODB_URI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });
    // await client.connect();
    // const mdb = client.db(process.env.DATABASE_NAME);
    // await mdb.collection('error_log').insertOne({
    //   ...doc,
    //   timestamp: new Date(),
    // });
    // await client.close();
  } catch (e) {
    console.log('ERROR NOT LOGGED');
    console.error(e);
  }
  return res.status(doc.statusCode).json({
    status: 'Error',
    code: doc.statusCode,
    message: doc.message,
  });
}

export default handleError;
