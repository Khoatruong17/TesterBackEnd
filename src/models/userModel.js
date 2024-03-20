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
        minlength: 6
    },
    group: {
        group_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'roles'
        },
        group_name: {
            type: String,
        }
    },
    faculty_Id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'faculties' 
    }
}, {timestamps: true}
)

module.exports = mongoose.model('User', userSchema)