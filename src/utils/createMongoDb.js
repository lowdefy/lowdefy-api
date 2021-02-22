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

import { MongoClient } from 'mongodb';
// import { serialize } from '../helpers/serialize';

class MongoDb {
  constructor(options) {
    this.options = options;
  }

  async connect() {
    this.client = new MongoClient(this.options.secrets.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await this.client.connect();
    this.db = this.client.db();
  }

  async find({ collection, query, options }) {
    const cursor = await this.db.collection(collection).find(query, options);
    const res = await cursor.toArray();
    // return serialize(res);
    return res;
  }

  async insertOne({ collection, doc, options }) {
    const inserted = this.db.collection(collection).insertOne(doc, options);
    return inserted;
  }

  async updateOne({ collection, filter, update, options }) {
    const updated = this.db.collection(collection).updateOne(filter, update, options);
    return updated;
  }

  async aggregate({ collection, pipeline, options }) {
    const cursor = await this.db.collection(collection).aggregate(pipeline, options);
    const res = await cursor.toArray();
    // return serialize(res);
    return res;
  }

  async close() {
    await this.client.close();
  }
}

function createMongoDb(options) {
  let memoized = null;

  async function getMongoDb() {
    if (memoized && memoized.client && memoized.client.isConnected()) {
      return memoized;
    }
    memoized = new MongoDb(options);
    await memoized.connect();
    return memoized;
  }
  return getMongoDb;
}

export default createMongoDb;
