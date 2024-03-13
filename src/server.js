require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');


const app = express();

// Set the view engine
const configViewEngine = require('./config/viewEngine');
const webRouters = require('./routers/web');
const connection = require('./config/database');





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

