require('dotenv').config();
const mongoose = require('mongoose');

const dbState = [{
    value: 0,
    label: "disconnect"
},
{
    value: 1,
    label: "connected"
},
{
    value: 2,
    label: "connecting"
}
]

const connection = async() => {
        const options = {
            user: process.env.DB_USER,
            pass: process.env.DB_PASSWORD,
            dbName: process.env.DB_NAME
        }
        await mongoose.connect(process.env.DB_HOST, options);
        //await mongoose.connect('mongodb+srv://truongndkgch190486:sH5XgM4uekyEf6xw@cloud.pmznpli.mongodb.net/');
        const state = Number(mongoose.connection.readyState);
        console.log(dbState.find(f=>f.value == state).label, "to db");
};

module.exports = connection;