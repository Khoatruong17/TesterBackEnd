const express = require("express");
const Contributions = require("../models/contributionModel");

const contributionController = {
    //createn contribution
    createContribution: async (req, res) => {
        try {
            const currentDate = new Date();
            const newContribution = await new Contributions({
               
                
                name: req.body.name,
                description: req.body.description,
                submit_date: currentDate
                
               
            });

            const contribution = await newContribution.save();
            console.log("Add contribution Successfully");
            res.status(200).json(contribution);
        } catch (error) {
            console.log("Error create contribution: " + error);
            res.status(500).json({ error: error.message });
        }
    },

    // Get all the contributions
    getAllContribution: async(req, res) =>{
        try{
            const contribution = await Contributions.find();
            res.status(200).json(contribution);
            console.log("Get all contributions successfully");
        }catch(error){
            console.log("Error get all contributions: " + error);
            res.status(500).json({ error: error.message });
        }
    },

    // Delete a contribution
    deleteContribution: async (req, res) => {
        try {
            const contribution = await Contributions.findByIdAndDelete(req.params.id);
            if (!contribution) {
                return res.status(404).json({ message: "Contribution not found" });
            }
            res.status(200).json({ message: "Contribution deleted successfully" }); 
            console.log(`Delete contribution successfully`);
        } catch (error) {
            console.log("Error deleting contribution: " + error);
            res.status(500).json({ error: error.message });
        }
    },

    // Update a contribution
    updateContribution: async (req, res) => {
        try {
            const updatedContributionName = req.body.name;
            const updatedContributionDescription = req.body.description;
            const updatedContributionDate = req.body.submit_date;
            const updateContribution = await Contributions.findByIdAndUpdate(req.params.id, { name:updatedContributionName, description:updatedContributionDescription, submit_date:updatedContributionDate}, { new: true });
            if (!updateContribution) {
                return res.status(404).json({ message: "Cannot find contribution" });
            }
            res.status(200).json(updateContribution);
            console.log(`Update contribution successfully`);
        } catch (error) {
            console.log("Error updating contribution: " + error);
            res.status(500).json({ error: error.message });
        }
    }
}
module.exports = contributionController;