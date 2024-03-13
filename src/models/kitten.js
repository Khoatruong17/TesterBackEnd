const mongoose = require('mongoose');

//Create database
const kittySchema = new mongoose.Schema({
    name: String
});
const Kitten = mongoose.model('Hello', kittySchema);

module.exports = Kitten;
