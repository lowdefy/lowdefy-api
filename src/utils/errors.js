/*
  Copyright 2020-2021 Lowdefy, Inc

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

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
