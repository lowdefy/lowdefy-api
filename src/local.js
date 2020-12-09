import dotenv from 'dotenv';
import createServer from './createServer';

dotenv.config({ silent: true });

const contextParams = {
  DATABASE_NAME: process.env.DATABASE_NAME,
  PORT: process.env.PORT,
  secrets: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
  collections: {},
};

const server = createServer({ contextParams });

server.listen(contextParams.PORT, () =>
  console.log(`API listening started on port ${contextParams.PORT}`)
);
