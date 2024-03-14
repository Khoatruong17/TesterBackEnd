const routerAPI = require('express').Router();
const userController = require("../controllers/userController");


routerAPI.post("/register", userController.Register);
routerAPI.post("/login", userController.Login);
// routerAPI.get("/user", userController.getUserList);

module.exports = routerAPI