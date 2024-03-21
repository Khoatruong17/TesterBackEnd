const mongoose = require('mongoose')
const GroupRoleSchema = new mongoose.Schema({
    group_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'groups'
    },
    role_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'roles'
    }
}, {timestamps: true}
)

module.exports = mongoose.model('group_role', GroupRoleSchema)