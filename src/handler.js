import serverless from 'serverless-http';
import createServer from './createServer';

const contextParams = {
  DATABASE_NAME: process.env.DATABASE_NAME,
  secrets: {
    MONGODB_URI: process.env.MONGODB_URI,
    USERS: JSON.parse(process.env.USERS),
  },
  collections: {
  },
};
const server = createServer({ contextParams });
const handler = serverless(server);

// eslint-disable-next-line import/prefer-default-export
export { handler };
