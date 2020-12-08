import { MongoClient } from 'mongodb';
// import { serialize } from '../helpers/serialize';

class MongoDb {
  constructor(context) {
    this.context = context;
  }

  async connect() {
    this.client = new MongoClient(this.context.secrets.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await this.client.connect();
    this.db = this.client.db(this.context.DATABASE_NAME);
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

function createMongoDb(context) {
  let memoized = null;

  async function getMongoDb() {
    if (memoized && memoized.client && memoized.client.isConnected()) {
      return memoized;
    }
    memoized = new MongoDb(context);
    await memoized.connect();
    return memoized;
  }
  return getMongoDb;
}

export default createMongoDb;
