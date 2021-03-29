const express = require("express");
const authController = require('../controllers/authController');

const api = express.Router();

api.post("/refresh-access-token", authController.refreshAccessToken);

module.exports = api;