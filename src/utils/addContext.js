import errors from './errors';

function addContext(options) {
  const context = { errors };

  function addContextMiddleware(req, res, next) {
    req.context = context;
    next();
  }
  return addContextMiddleware;
}

export default addContext;
