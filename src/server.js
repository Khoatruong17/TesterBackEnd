require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const { EventEmitter } = require('events');

const JWT = require('./middleware/jwtAction');

const app = express();

// Set the view engine
const configViewEngine = require('./config/viewEngine');
const connection = require('./config/database');

//config bodyParser
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extends: true}));
//app.use(express.urlencoded({ extended: true }))

//Config template engine
configViewEngine(app);

app.use(express.json());

//test JWT
JWT.createJWT();
let verify = JWT.verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVHJ1b25nIiwiZW1haWwiOiJraG9hdHJ1b25nQGdtYWlsLmNvbSIsImlhdCI6MTcxMDg2Mjc1N30.Ku8-XZavojjcnmXJQtcSpUlM4NLM3JqF93rIQJpA4JY");
console.log(verify)
// Setup routes
const authRoute = require('./routers/auth.Router');
const roleRoute = require('./routers/role.Router');
const facultyRoute = require('./routers/faculty.Router');
const userRoute = require('./routers/user.Router');

//Router
app.use("/v1", authRoute);
app.use("/v1", roleRoute);
app.use("/v1", facultyRoute);
app.use("/v1", userRoute);


// Set Max Listener 
// create new EventEmitter
const myEmitter = new EventEmitter();
myEmitter.setMaxListeners(20); // Example, setMaxListeners to 20
// Add listeners to event'
for (let i = 0; i < 20; i++) {
    myEmitter.on('event', () => {
        console.log('Event occurred');
    });
}


app.use((req, res) => {
    return res.send("404 Not Found");
})

//self running function
const port = process.env.PORT || 3001;
const hostname = process.env.HOST_NAME;
(async() => {
    try{
        //test connection
        await connection();
        app.listen(port, hostname, () => {
            console.log(`App is running at http://${hostname}:${port}/`)
        })
    }catch(err) {
        console.log(">>> Error connect to DB")
    }
})()


// Authentication function


// Authorization function
