const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const { API_VERSION } = require("./config");

// Load routes
// ...
const authRoutesComensal = require("./routers/auth");

const ComensalRouters = require("./routers/ComensalRoutes");
const RestaurantRouters = require("./routers/RestaurantRoutes");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Configure Header
// ...
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// Router basic
// ...
app.use(`/api/${API_VERSION}`, authRoutesComensal);
app.use(`/api/${API_VERSION}`, ComensalRouters);
app.use(`/api/${API_VERSION}`, RestaurantRouters);

module.exports = app;
