const express = require("express");
const ComensalController = require("../controllers/ComensalController");
const api = express.Router();

api.post("/signupComensal", ComensalController.SignUp);
api.post("/signInComensal", ComensalController.SignIn);
api.post("/addRestaurant/:id/:data", ComensalController.AddRestaurant);
api.get("/getRestaurante/:id", ComensalController.getRestaurants);
api.get("/getMenus/:nombre", ComensalController.getMenus);
api.post("/eliminarRestComensal/:nombre/:id", ComensalController.eliminarRestaurante);
api.get("/getInfoComensal/:id/:nombre", ComensalController.getInfoComensal);
api.get("/getRecomendados", ComensalController.getRecomendados);
//Account
api.post("/deleteAccountComensal/:id", ComensalController.DeleteAccount);
api.post("/changePasswordComensal/:id/:pass", ComensalController.ChangePassword);
api.post("/changeNameComensal/:id/:name", ComensalController.ChangeName);
api.post("/changePhotoComensal/:id/:photo", ComensalController.ChangePhoto);
//Orders
api.get("/getTickets/:nombre", ComensalController.getTickets);
api.post("/ordenar/:order/:restaurantName/:idComensal", ComensalController.addOrder);
//api.post("/", ComensalController.deleteDishFromOrder);
api.post("/cancelOrder/:id", ComensalController.cancelOrder);
//
api.get("/getMenus/:nombre", ComensalController.getMenus);
api.get("/statusOrden/:id", ComensalController.getStatus);
api.post("/payStripe/:id", ComensalController.setStripe);

api.post("/verificarFirma",ComensalController.verificarFirma);
module.exports = api;
