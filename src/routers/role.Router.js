const routerAPI = require('express').Router();
const roleController = require("../controllers/role.Controller");

routerAPI.post("/role", roleController.createRole);
routerAPI.get("/role", roleController.getAllRole);
routerAPI.delete("/role/:id", roleController.deleteRole);
routerAPI.put("/role/:id", roleController.updateRole);

module.exports = routerAPI