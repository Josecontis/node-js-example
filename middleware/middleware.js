//file in cui vengono registrati tutti i middleware dell'applicazione
const commonMiddleware = require("./common");

module.exports = function Middleware(app) {
  commonMiddleware(app);
};
