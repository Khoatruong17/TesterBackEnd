const routerAPI = require("express").Router();
const authController = require("../controllers/auth.Controller");
const facultyController = require("../controllers/faculty.Controller");
const groupController = require("../controllers/group.Controller");
const roleController = require("../controllers/role.Controller");
const connectGR = require("../controllers/grouprole.Controller");
const userController = require("../controllers/user.Controller");
const checkUser = require("../middleware/jwtAction");
const upFile = require("../controllers/file.Controller");

const initApiRouter = (app) => {
  //routerAPI.all("*", checkUser.checkUserJWT, checkUser.checkUserPermission);

  // Register
  routerAPI.post("/register", authController.Register);
  routerAPI.post("/login", authController.Login);

  // User routes
  routerAPI.get("/user/read", userController.getAllUser);

  // faculty router
  routerAPI.post("/faculty", facultyController.createFaculty);
  routerAPI.get("/faculty", facultyController.getAllFaculty);
  routerAPI.delete("/faculty/:id", facultyController.deleteFaculty);
  routerAPI.put("/faculty/:id", facultyController.updateFaculty);

  // group router
  routerAPI.post("/group/create", groupController.createGroup);
  routerAPI.get("/group", groupController.getAllGroup);
  routerAPI.delete("/group/:id", groupController.deleteGroup);
  routerAPI.put("/group/:id", groupController.updateGroup);

  // role router
  routerAPI.post("/role", roleController.createRole);
  routerAPI.get("/role", roleController.getAllGroup);
  //routerAPI.delete("/group/:id", groupController.deleteGroup);
  //routerAPI.put("/group/:id", groupController.updateGroup);

  // group role router
  routerAPI.post("/grouprole", connectGR.createCGR); // add group role connection

  //api upload file
  routerAPI.post("/file/single", upFile.postUploadSingleFile); // up single file to server
  routerAPI.post("/file/single", upFile.postUploadMultipleFiles); // up multiple file to server

  return app.use("/v1/", routerAPI);
};

module.exports = initApiRouter;
