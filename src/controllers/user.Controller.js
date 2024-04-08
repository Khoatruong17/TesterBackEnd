const express = require("express");
const router = express.Router();
const UserModel = require("../models/userModel"); // Import your user model
const bcrypt = require("bcrypt");

const verifyPassword = async (password, hashedPassword) => {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    console.error("Error verifying password:", error);
    throw error;
  }
};

const getAllUser = async (req, res) => {
  try {
    const allUsers = await UserModel.find();
    const formattedUsers = [];
    allUsers.forEach((user) => {
      const formattedUser = {
        username: user.username,
        email: user.email,
        role: user.group.group_name,
        faculty: user.faculty.faculty_name,
      };
      formattedUsers.push(formattedUser);
    });
    return res.status(200).json({
      EM: "Successfully",
      EC: 0,
      DT: formattedUsers,
    });
  } catch (error) {
    console.error(">>> Error getAllUser (controller)", error);
    return res.status(500).json({
      EM: "GetAllUsers failed",
      EC: 1,
      DT: "",
    });
  }
};

module.exports = {
  getAllUser,
};
