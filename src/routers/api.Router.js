const routerAPI = require("express").Router();
const authController = require("../controllers/auth.Controller");
const commentController = require("../controllers/comment.Controller");
const contributionController = require("../controllers/contribution.Controller");
const documentController = require("../controllers/document.Controller");
const facultyController = require("../controllers/faculty.Controller");
const groupController = require("../controllers/group.Controller");
const roleController = require("../controllers/role.Controller");
const connectGR = require("../controllers/grouprole.Controller");
const userController = require("../controllers/user.Controller");
const checkUser = require("../middleware/jwtAction");
const topicController = require("../controllers/topic.Controller");
const upFile = require("../controllers/file.Controller");
const sendEmail = require("../controllers/sendEmail.Controller");

const initApiRouter = (app) => {
  // routerAPI.all("*", checkUser.checkUserJWT, checkUser.checkUserPermission);
  // routerAPI.all("*",);

  // -------------  Register ----------
  routerAPI.post("/register", authController.Register);
  routerAPI.post("/login", authController.Login);

  // User routes
  routerAPI.get("/user/read", userController.getAllUser);

  // comment router
  routerAPI.post("/comment", commentController.createComment);
  routerAPI.get("/comment", commentController.getAllComment);
  routerAPI.delete("/comment/:id", commentController.deleteComment);
  routerAPI.put("/comment/:id", commentController.updateComment);

  //get comment for student
  routerAPI.get("/commentforS/read", commentController.getCommentsForStudent);

  // contribution router
  routerAPI.post(
    "/contribution/create",
    contributionController.createContribution
  ); // create contribution
  routerAPI.get(
    "/contribution/read",
    contributionController.getAllContribution
  ); // get all contribution

  routerAPI.get(
    "/contribution/download/:id",
    contributionController.downloadContribution
  ); // download contribution by id

  // document router
  routerAPI.post("/document", documentController.createDocument);
  routerAPI.get("/document", documentController.getAllDocument);
  routerAPI.delete("/document/:id", documentController.deleteDocument);
  routerAPI.put("/document/:id", documentController.updateDocument);

  // faculty router
  routerAPI.post("/faculty/create", facultyController.createFaculty);
  routerAPI.get("/faculty", facultyController.getAllFaculty);
  routerAPI.delete("/faculty/delete/:id", facultyController.deleteFaculty);
  routerAPI.put("/faculty/update/:id", facultyController.updateFaculty);

  // group router
  routerAPI.post("/group/create", groupController.createGroup);
  routerAPI.get("/group", groupController.getAllGroup);
  routerAPI.delete("/group/delete/:id", groupController.deleteGroup);
  routerAPI.put("/group/edit/:id", groupController.updateGroup);

  // role router
  routerAPI.post("/role", roleController.createRole);
  routerAPI.get("/role/read", roleController.getAllGroup);
  //routerAPI.delete("/group/:id", groupController.deleteGroup);
  //routerAPI.put("/group/:id", groupController.updateGroup);

  // topic router
  routerAPI.post("/topic/create", topicController.createTopic);
  routerAPI.get("/topic/read", topicController.getAllTopic);
  // routerAPI.delete("/topic/:id", topic.deleteTopic);
  // routerAPI.put("/topic/:id", topic.updateTopic);

  // group role router
  routerAPI.post("/grouprole/create", connectGR.createCGR); // add group role connection

  //api upload file
  routerAPI.post("/file/single", upFile.postUploadSingleFile); // up single file to server
  routerAPI.post("/file/multiple", upFile.postUploadMultipleFiles); // up multiple file to server
  // send Email
  routerAPI.post("/sendmail", sendEmail.sendMail); // send Email
  return app.use("/v1/", routerAPI);
  // return app.use("/", routerAPI);
};

module.exports = initApiRouter;
