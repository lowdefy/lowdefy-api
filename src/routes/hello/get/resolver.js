// eslint-disable-next-line no-unused-vars
async function hello({ body, context }) {
  return { code: 200, status: 'Success', message: 'Hello from serverless' };
}

export default hello;
