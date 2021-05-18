const ValidationError = require("./validation-error");
const AuthenticationError = require("./authentication-error");
const AccessDeniedError = require("./access-denied-error");

// modulo che racchiude gli oggetti degli errori di accesso
module.exports = {
  AccessDeniedError,
  AuthenticationError,
  ValidationError,
};
