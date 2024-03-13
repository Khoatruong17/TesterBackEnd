const mongoose = require('mongoose')
const RoleSchema = new mongoose.Schema({
    role_Id: {
        type: String,
        minLength: 1,
        maxLength: 20
        
    },
    role_Name: {
        type: String,
        minLength: 1,
        maxLength: 50
    }
    
}, {timestamps: true}
)

module.exports = mongoose.model('Role', RoleSchema)