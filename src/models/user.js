const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username:{
        type : String,
        required: true,
        minlength: 6,
        maxlength: 20,
        unique: true 
    },
    password:{
        type : String,
        required: true,
        minlength: 6,
    },
    email:{
        type : String,
        required: true,
        minlength: 6,
        maxlength: 50,
        unique: true
    },
    role_Id:{
         type : String,
    },
    faculty_Id:{
        type : String,
    }
}, {timestamps: true}
)

module.exports = mongoose.model('User', userSchema)