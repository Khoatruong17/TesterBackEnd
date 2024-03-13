const express = require("express");
const Role = require("../models/role");


const roleController = {
    //Register
    addRole: async (req, res) => {
        try {
            // Create a new role
            const newRole = await new Role({
                role_Id: req.body.role_id,
                role_Name: req.body.role_name
            });

            // Save the user to the database
            const role = await newRole.save();
            console.log("Add role Successfully");
            res.status(200).json(role);
        } catch (error) {
            console.log("Error register" + error);
            res.status(500).json(error);
        }
    }
}

module.exports = roleController;