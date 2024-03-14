const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username:{
        type : String,
        required: true,
        minlength: 6,
        maxlength: 20,
        unique: true 
    },
    passwords:{
        type : String,
        required: true,
        minlength: 6,
    },
    email:{
        type : String
    },
    role_Id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'roles' 
    },
    faculty_Id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'faculties' 
    }
}, {timestamps: true}
)

module.exports = mongoose.model('User', userSchema)