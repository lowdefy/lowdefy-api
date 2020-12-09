function makeRouteHandler(route) {
  const { path, method, resolver } = route;
  async function handler(req, res, next) {
    try {
      // const validation = req.context.ajv.validate(route.schema, req.body);
      // if (!validation) {
      //   throw new req.context.Error.ValidationError({
      //     message: `Invalid request: ${req.context.ajv.errors.map((err) => err.message)}`,
      //     error: 'ValidationError',
      //     method: `route:${path}`,
      //     payload: req.body,
      //   });
      // }
      const response = await resolver(req);
      return res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  }
  return {
    path,
    method,
    handler,
  };
}
export default makeRouteHandler;
