const resolver = async ({ body, context, auth }) => {
  console.log('resolver')
  return { code: 200, status: 'Success', message: 'Hello' };
};

export default resolver;
