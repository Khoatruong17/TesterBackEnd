const routerAPI = require("express").Router();
const authController = require("../controllers/auth.Controller");
const facultyController = require("../controllers/faculty.Controller");
const groupController = require("../controllers/group.Controller");
const roleController = require("../controllers/role.Controller");
const connectGR = require("../controllers/grouprole.Controller");
const userController = require("../controllers/user.Controller");
const checkUser = require("../middleware/jwtAction");
// checkUserLogin
// const checkUserLogin = (req, res, next) => {
//   const nonSecurePaths = ["/", "/login", "/register"];
//   if (nonSecurePaths.includes(req.path)) return next();

//   // authenticate user
//   if (user) {
//     next();
//   } else {
//     return res.status(401).json({
//       EM: "Unauthorized",
//       EC: 401,
//       DT: null,
//     });
//   }
// };

const initApiRouter = (app) => {
  // Register
  routerAPI.post("/register", authController.Register);
  routerAPI.post("/login", authController.Login);

  // User routes
  routerAPI.get(
    "/users",
    checkUser.checkUserJWT,
    checkUser.checkUserPermission,
    userController.getAllUser
  );

  // faculty router
  routerAPI.post("/faculty", facultyController.createFaculty);
  routerAPI.get("/faculty", facultyController.getAllFaculty);
  routerAPI.delete("/faculty/:id", facultyController.deleteFaculty);
  routerAPI.put("/faculty/:id", facultyController.updateFaculty);

  // group router
  routerAPI.post("/group", groupController.createGroup);
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

  return app.use("/v1/", routerAPI);
};

module.exports = initApiRouter;
