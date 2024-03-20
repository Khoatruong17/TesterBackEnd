const mongoose = require('mongoose')
const GroupRoleSchema = new mongoose.Schema({
    group_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'group'
    },
    role_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'role'
    }
}, {timestamps: true}
)

module.exports = mongoose.model('group_role', GroupRoleSchema)