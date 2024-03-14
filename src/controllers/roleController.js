const express = require("express");
const Role = require("../models/roleModel");


const roleController = {
    //Create role
    createRole: async (req, res) => {
        try {
            // Create a new role
            const newRole = await new Role({
                role_name: req.body.role_name
            });
            // Save the user to the database
            const role = await newRole.save();
            console.log("Add role Successfully");
            res.status(200).json(role);
        } catch (error) {
            console.log("Error create role: " + error);
            res.status(500).json({ error: error.message });
        }
    },


    // Get all the roles
    getAllRole: async(req, res) =>{
        try{
            const role = await Role.find();
            res.status(200).json(role);
            console.log("Get all roles Successfully");
        }catch(error){
            console.log("Error get all role: " + error);
            res.status(500).json({ error: error.message });
        }
    },

    // Delete a role
    deleteRole: async (req, res) => {
        try {
            // Using findByIdAndDelete to delete the role
            const role = await Role.findByIdAndDelete(req.params.id);
            if (!role) {
                return res.status(404).json({ message: "Role not found" });
            }
            res.status(200).json({ message: "Role deleted successfully" }); 
            console.log(`Delete role successfully`);
        } catch (error) {
            console.log("Error deleting role: " + error);
            res.status(500).json({ error: error.message });
        }
    },
    
    updateRole: async (req, res) => {
        try {
            const updatedRoleName = req.body.role_name; 
            // Find the role by id
            const updatedRole = await Role.findByIdAndUpdate(req.params.id, { role_name: updatedRoleName }, { new: true });
            if (!updatedRole) {
                return res.status(404).json({ message: "Cannot find Role" });
            }
            console.log("Updated role successfully");
            res.status(200).json(updatedRole);
        } catch (error) {
            console.log("Error update role " + error);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = roleController;