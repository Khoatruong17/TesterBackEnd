const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const authController = {
    //Register (add user)
    registerUser: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            // Create a new user
            const newUser = await new User({
                username: req.body.username,
                password: hashed,
                email: req.body.email,
            });

            // Save the user to the database
            const user = await newUser.save();
            console.log("Add role Successfully");
            res.status(200).json(user);
        } catch (error) {
            console.log("Error register" + error);
            res.status(500).json(error);
        }
    },

    //Login
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({email: req.body.email});
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            )

            //If email and passwords match
            if (user && validPassword){
                res.status(200).json(user);
                console.log("Login Successfully");
            }

            //If email and password wrong
            if(!user) {
                res.status(404).json("Wrong email!");
                console.log("Wrong email!");
            }
            if(!validPassword){
                res.status(404).json("Wrong password!");
                console.log("Wrong password!")
            }

            
        } catch (error) {
            console.log("Error login" + error);
            res.status(500).json(error);
        }
    }
}

module.exports = authController;