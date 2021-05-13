const express = require("express");
const dotenv = require("dotenv");
const Middleware = require("./middleware/middleware");

dotenv.config();
const PORT = process.env.PORT || 3000; //scelta della porta

const app = express(); //app è il server

const PlansController = require("./controllers/plans-controller");
const SubscriptionsController = require("./controllers/subscriptions-controller");

Middleware(app); //uso del middleware

app.use("/api/plans", PlansController);
app.use("/api/subscriptions", SubscriptionsController);

// il server è in ascolto sulla porta
app.listen(PORT, () => {
  console.log(`server listening on ${PORT} port...`);
});
