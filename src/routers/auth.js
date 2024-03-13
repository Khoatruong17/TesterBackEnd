const routerAPI = require('express').Router();
const authController = require("../controllers/authController");

routerAPI.post("/register", authController.registerUser);
routerAPI.post("/login", authController.loginUser);

module.exports = routerAPI