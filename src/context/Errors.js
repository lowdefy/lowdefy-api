/* eslint-disable max-classes-per-file */
import { MongoClient } from 'mongodb';

class ForbiddenError extends Error {
  constructor(props) {
    const properties = {
      statusCode: 403,
      displayTitle: 'Forbidden',
      displayMessage: props.message,
      ...props,
    };
    super(props.message);
    this.name = 'ForbiddenError';
    this.properties = properties;
  }
}

class ValidationError extends Error {
  constructor(props) {
    const properties = {
      statusCode: 400,
      displayTitle: 'Input Validation Error',
      displayMessage: props.message,
      ...props,
    };
    super(props.message);
    this.name = 'ValidationError';
    this.properties = properties;
  }
}

class ConfigurationError extends Error {
  constructor(props) {
    const properties = {
      statusCode: 400,
      displayTitle: 'Configuration Error',
      displayMessage: props.message,
      ...props,
    };
    super(props.message);
    this.name = 'ConfigurationError';
    this.properties = properties;
  }
}

class ServerError extends Error {
  constructor(props) {
    const properties = {
      statusCode: 500,
      displayTitle: 'Server Error',
      displayMessage: props.message,
      ...props,
    };
    super(props.message);
    this.name = 'ServerError';
    this.properties = properties;
  }
}

const handleError = async (err, res) => {
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
    const client = new MongoClient(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    const mdb = client.db(process.env.DATABASE_NAME);
    await mdb.collection('error_log').insertOne({
      ...doc,
      timestamp: new Date(),
    });
    await client.close();
  } catch (e) {
    throw new Error(`ERROR NOT LOGGED: ${e.message}`);
  }
  return res.status(doc.statusCode).json({
    status: 'Error',
    code: doc.statusCode,
    message: doc.message,
  });
};

const Errors = {
  ForbiddenError,
  ValidationError,
  ConfigurationError,
  ServerError,
};

export { handleError };
export default Errors;
