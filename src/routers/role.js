const router = require('express').Router();
const roleController = require("../controllers/roleController");

router.post("/addrole", roleController.addRole);

module.exports = router