require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

// Set the view engine
const configViewEngine = require('./config/viewEngine');
const connection = require('./config/database');
const authRoute = require('./routers/auth');
const roleRoute = require('./routers/role');

//Config templete engine
configViewEngine(app);

app.use(express.json());
//Router
app.use("/v1/auth", authRoute);
app.use("/v1", roleRoute);


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
