const bodyParser = require("body-parser");
const morgan = require("morgan"); //logging delle richieste del terminale
const cors = require("cors");
const helmet = require("helmet"); // meccanismi di protezione

//app viene dal server per utilizzare tutti i middleware importati
module.exports = function CommonMiddleware(app) {
  
  app.use(bodyParser.json());
  app.use(morgan("common"));
  app.use(cors());
  app.use(helmet());
};
