/* eslint-disable no-param-reassign */
import MapError from './Errors';;

const createContext = (context) => {
  context.Error = MapError;

  return context;
};

export default createContext;
