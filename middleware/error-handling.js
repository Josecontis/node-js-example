// middleware manipolatore di errore che prende 4 argomenti di funzione
const chalk = require("chalk");
const ValidationError = require("../errors/errors").ValidationError;
const AuthenticationError = require("../errors/errors").AuthenticationError;
const accessDeniedError = require("../errors/errors").AccessDeniedError;

//metodo middleware manipolatore di errore che verrà eseguito quando ad esempio si vorrà accedere alla root /api/plans/ e accadrà un errore
function errorLogger(err, req, res, next) {
  if (err.message) {
    console.log(chalk.default.red(err.message)); // colore rosso al messaggio utilizzando chalk
  }
  if (err.stack) {
    //stack degli errori per una specie di debug
    console.log(chalk.default.red(err.message));
  }
  next(err); //si sposta sul prossimo middleware
}

//metodi per specifici messaggi di errore
function authenticationErrorHandler(err, req, res, next) {
  if (err instanceof AuthenticationError) {
    return res.sendStatus(401);
  }
  next(err);
}

function validationErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.sendStatus(400);
  }
  next(err);
}

function accessDeniedErrorHandler(err, req, res, next) {
  if (err instanceof accessDeniedError) {
    return res.sendStatus(403);
  }
  next(err);
}

function genericErrorHandler(err, req, res, next) {
  res.sendStatus(401);

  next();
}

//modulo per gestire gli errori
module.exports = function ErrorHandlingMiddleware(app) {
  app.use([
    errorLogger,
    authenticationErrorHandler,
    validationErrorHandler,
    accessDeniedErrorHandler,
    genericErrorHandler,
  ]);
};
