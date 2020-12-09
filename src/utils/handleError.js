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
