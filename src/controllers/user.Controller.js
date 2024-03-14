const express = require('express');
const router = express.Router();
const UserModel = require('../models/userModel'); // Import your user model

// Assuming this function is defined in a controller file
const getAllUser = async (req, res) => {
    try {
        const allUser = await UserModel.find();
        return res.status(200).json({
            EM: "Successfully",
            EC: 0,
            DT: allUser
        });
    } catch (error) {
        console.error(">>> Error getAllUser (controller)", error);
        return res.status(500).json({
            EM: "GetAllUsers failed",
            EC: 1,
            DT: ""
        });
    }
}



module.exports = {
    getAllUser
}