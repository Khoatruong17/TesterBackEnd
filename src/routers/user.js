const routerAPI = require('express').Router();
const userController = require("../controllers/userController");


routerAPI.post("/register", userController.Register);
// routerAPI.post("/login", userController.loginUser);
// routerAPI.get("/user", userController.getUserList);

module.exports = routerAPI