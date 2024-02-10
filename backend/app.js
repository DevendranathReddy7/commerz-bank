const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const publicRouter = require("./routes/public-routes.js");
const paymentsRouter = require("./routes/private-routes/payment-routes.js");
const settingsRouter = require("./routes/private-routes/settings-routes.js");
const accountRouter = require("./routes/private-routes/accounts-routes.js");
const mongoose = require("mongoose");

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*"); //Origin,X-Requested-With,Content-Type,Accept,Authorization
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");

  next();
});

//sigin,login
app.use("/", publicRouter);

//open an accounts
app.use("/accounts", accountRouter);

//payment routes
app.use("/payments", paymentsRouter);
app.use("/settings", settingsRouter);
//Below 2 error middleware will throw error instead of default express error
app.use((req, res, next) => {
  throw new HttpError("Could not find the route", 404);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred" });
});

mongoose
  .connect(
    "mongodb+srv://devendrareddy7733:fPds3CMyP5MHT1L5@commerzbank.vwtzzzj.mongodb.net/commerz?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
