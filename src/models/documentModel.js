const mongoose = require('mongoose')
const documentSchema = new mongoose.Schema({
    document: {
        type: String,
        minLength: 1,
        required: true
    }
    
}, {timestamps: true}
)

module.exports = mongoose.model('Document', documentSchema)