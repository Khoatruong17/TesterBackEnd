const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const GetallUser = async (req, res) =>{
    try{
        const user = await User.find();
        res.status(200).json(user);
        console.log("Get all users successfully");
    }catch(error){
        console.log("Error get all user: " + error);
        res.status(500).json({ error: error.message });
    }
} 

module.exports = {
    GetallUser
};
