const mongoose = require('mongoose')
const contributionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    topic_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'topics'
    },
    name:{
        type : String,
        required: true,
    },
    description:{
        type : String,
        required: true,
    },
    submit_date:{
        type: Date,
        required: true
    },
    document_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'documents'
    },
    image_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'images'
    }
}, {timestamps: true}
)
module.exports = mongoose.model('Contribution', contributionSchema)