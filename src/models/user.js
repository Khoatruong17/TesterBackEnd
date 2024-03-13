const mongoose = require('mongoose');

//Create database
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    city: String
});
const Kitten = mongoose.model('user', userSchema);

module.exports = Kitten;