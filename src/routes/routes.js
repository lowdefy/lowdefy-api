import makeRouteHandler from '../utils/makeRouteHandler';
import helloGet from './hello/get';

const routes = [
  {
    path: '/hello',
    method: 'get',
    resolver: helloGet.resolver,
    schema: helloGet.schema,
  },
].map((route) => makeRouteHandler(route));

export default routes;
