const mongoose = require('mongoose')
const GroupSchema = new mongoose.Schema({
    no_group:{
        type: Number,
        required: true
    },
    group_name: {
        type: String,
        minLength: 1,
        maxLength: 50,
        required: true,
        unique: true 
    },
    description: {
        type: String
    }
}, {timestamps: true}
)

module.exports = mongoose.model('Group', GroupSchema)