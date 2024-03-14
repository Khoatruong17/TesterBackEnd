require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// Set the view engine
const configViewEngine = require('./config/viewEngine');
const connection = require('./config/database');
const userRoute = require('./routers/user');
const roleRoute = require('./routers/role');
const facultyRoute = require('./routers/faculty');

//config bodyParser
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extends: true}));
//app.use(express.urlencoded({ extended: true }))

//Config templete engine
configViewEngine(app);

app.use(express.json());
//Router
app.use("/v1/auth", userRoute);
app.use("/v1", roleRoute);
app.use("/v1", facultyRoute);


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
