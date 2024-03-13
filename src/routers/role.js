const routerAPI = require('express').Router();
const roleController = require("../controllers/roleController");

routerAPI.post("/role", roleController.createRole);
routerAPI.get("/role", roleController.getAllRole);
routerAPI.delete("/role/:id", roleController.deleteRole);
routerAPI.put("/role/:id", roleController.updateRole);

module.exports = routerAPI