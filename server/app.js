const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const { API_VERSION } = require("./config");

// Load routes
// ...
const authRoutesComensal = require("./routers/authRoutes");
const ComensalRouters = require("./routers/ComensalRoutes");
const RestaurantRouters = require("./routers/RestaurantRoutes");

/*
  **En caso de que falle algo y no sepas por que, habilita estas cosas xD**
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
*/

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}))
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
