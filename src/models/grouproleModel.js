const mongoose = require('mongoose')
const GroupRoleSchema = new mongoose.Schema({
    no_group:{
        type: mongoose.Schema.Types.Number,
        ref: 'group'
    },
    no_role:{
        type: mongoose.Schema.Types.Number,
        ref: 'role'
    }
}, {timestamps: true}
)

module.exports = mongoose.model('group_role', GroupRoleSchema)