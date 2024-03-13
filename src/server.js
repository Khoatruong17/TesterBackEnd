require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

// Set the view engine
const configViewEngine = require('./config/viewEngine');
const webRouters = require('./routers/web');
const connection = require('./config/database');
const Kitten = require('./models/kitten');

const app = express();


//Config templete engine
configViewEngine(app);
app.use('/', webRouters);


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

