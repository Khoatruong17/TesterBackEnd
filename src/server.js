require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const { EventEmitter } = require("events");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");

const app = express();

// Set the view engine
const configViewEngine = require("./config/viewEngine");
const connection = require("./config/database");

//config bodyParser
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extends: true}));
//app.use(express.urlencoded({ extended: true }))

//Config template engine
configViewEngine(app);

app.use(express.json());
//Config Cookie Parser
app.use(cookieParser());

// Config file to upload
// Default config
app.use(fileUpload());

// Setup routes
// const authRoute = require('./routers/auth.Router');
// const groupRoute = require('./routers/group.Router');
// const roleRoute = require('./routers/role.Router');
// const facultyRoute = require('./routers/faculty.Router');
// const userRoute = require('./routers/user.Router');
const apiRouter = require("./routers/api.Router");

//Router
// app.use("/v1", authRoute);
// app.use("/v1", groupRoute);
// app.use("/v1", roleRoute);
// app.use("/v1", facultyRoute);
// app.use("/v1", userRoute);
apiRouter(app);

// Set Max Listener
// create new EventEmitter
const myEmitter = new EventEmitter();
myEmitter.setMaxListeners(20); // Example, setMaxListeners to 20
// Add listeners to event'
for (let i = 0; i < 20; i++) {
  myEmitter.on("event", () => {
    console.log("Event occurred");
  });
}
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use((req, res) => {
  return res.send("404 Not Found");
});

//self running function
const port = process.env.PORT || 10000;
const hostname = process.env.HOST_NAME;
(async () => {
  try {
    //test connection
    await connection();
    app.listen(port, hostname, () => {
      console.log(`App is running at http://${hostname}:${port}/`);
    });
  } catch (err) {
    console.log(">>> Error start server: " + err);
  }
})();

// Authentication function

// Authorization function
