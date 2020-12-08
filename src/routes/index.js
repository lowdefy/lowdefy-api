import hello from './hello/get';

const resolver = async ({ req, res, next, route, path }) => {
  console.log(path, req.body);
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
    const response = await route.resolver(req);
    return res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
};

// https://api.abie.app/web/sms-callback
// Will need to rework this to allow different handlers for different methods on the same route.
const getRoutes = ({ ORIGIN = '*' }) => [
  {
    path: '/hello',
    method: 'get',
    cors: {
      origin: ORIGIN,
      optionsSuccessStatus: 200,
      methods: 'GET',
    },
    resolve: (req, res, next) =>
      resolver({
        req,
        res,
        next,
        route: hello,
        path: '/hello',
      }),
  },
];

export default getRoutes;
