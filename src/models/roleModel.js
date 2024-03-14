const mongoose = require('mongoose')
const RoleSchema = new mongoose.Schema({
    role_name: {
        type: String,
        minLength: 1,
        maxLength: 50,
        required: true,
        unique: true 
    }
    
}, {timestamps: true}
)

module.exports = mongoose.model('Role', RoleSchema)