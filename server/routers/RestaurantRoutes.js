const express = require("express");
const RestaurantController = require("../controllers/RestaurantController");
const api = express.Router();
const authenticator = require("../middlewares/authenticated")

api.post("/signupRestaurante", RestaurantController.SignUp);
api.post("/signInRestaurante", RestaurantController.SignIn);
//Menu
api.put("/saveMenu", RestaurantController.saveMenu);
api.get("/getMenu/:id", RestaurantController.getMenu);
api.post("/deleteMenu/:id/:dish/:pos", RestaurantController.deleteMenu);
api.post("/updateMenu/:id/:dish/:name/:description/:price/:pos", RestaurantController.updateMenu);
//Account
api.post("/deleteAccountRestaurant/:id", RestaurantController.DeleteAccount);
api.post("/changePasswordRestaurant/:id/:pass", RestaurantController.ChangePassword);
api.post("/changeNameRestaurant/:id/:name", RestaurantController.ChangeName);
api.post("/changePresentationRestaurant/:id/:presentation", RestaurantController.ChangePresentation);
api.post("/changeEmailRestaurant/:id/:email", RestaurantController.ChangeEmail);
api.post("/changePhoneRestaurant/:id/:phone", RestaurantController.ChangePhone);
api.post("/changeAdministratorRestaurant/:id/:administrator", RestaurantController.ChangeAdministrator);
api.post("/changePhotoRestaurant/:id/:photo", RestaurantController.ChangePhoto);
//api.get("/getPresentacionRes/:id", RestaurantController.getPresentacion);
api.get("/getInfoRestaurant/:nombre", RestaurantController.getInfoRes);
//Orders
api.get("/getCurrentOrders/:nombre", RestaurantController.getCurrentOrders);
api.post("/", RestaurantController.updateOrderStatus);
api.post("/cancelOrderRestaurant/:id", RestaurantController.cancelOrder);
api.post("/setStatus/:state/:idOrden", RestaurantController.setStatus);
api.get("/getHistoryOrders/:nombre", RestaurantController.getHistoryOrders);
module.exports = api;
