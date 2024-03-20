const mongoose = require('mongoose')
const RoleSchema = new mongoose.Schema({
    no_role:{
        type: Number,
        required: true
    },
    url: {
        type: String,
        required: true,
        unique: true 
    },
    description: {
        type: String
    }
}, {timestamps: true}
)

module.exports = mongoose.model('role', RoleSchema)