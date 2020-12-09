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

const Errors = { ForbiddenError, ValidationError, ConfigurationError, ServerError };

export { ForbiddenError, ValidationError, ConfigurationError, ServerError };
export default Errors;
