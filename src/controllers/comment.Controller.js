const express = require("express");
const Comments = require("../models/commentModel");


const commentController = {
    //create comment
    createComment: async (req, res) => {
        try {
            const newComment = await new Comments({
                comment: req.body.comment
            });

            const comment = await newComment.save();
            console.log("Add comment Successfully");
            res.status(200).json(comment);
        } catch (error) {
            console.log("Error create comment: " + error);
            res.status(500).json({ error: error.message });
        }
    },

    // Get all the comments
    getAllComment: async(req, res) =>{
        try{
            const comment = await Comments.find();
            res.status(200).json(comment);
            console.log("Get all comments successfully");
        }catch(error){
            console.log("Error get all comments: " + error);
            res.status(500).json({ error: error.message });
        }
    },

    // Delete a comment
    deleteComment: async (req, res) => {
        try {
            const comment = await Comments.findByIdAndDelete(req.params.id);
            if (!comment) {
                return res.status(404).json({ message: "Comment not found" });
            }
            res.status(200).json({ message: "Comment deleted successfully" }); 
            console.log(`Delete comment successfully`);
        } catch (error) {
            console.log("Error deleting comment: " + error);
            res.status(500).json({ error: error.message });
        }
    },

    // Update a comment
    updateComment: async (req, res) => {
        try {
            const updatedComment = req.body.comment;
            const comment = await Comments.findByIdAndUpdate(req.params.id, { comment: updatedComment }, { new: true });
            if (!comment) {
                return res.status(404).json({ message: "Cannot find comment" });
            }
            res.status(200).json(comment);
            console.log(`Update comment successfully`);
        } catch (error) {
            console.log("Error update comment: " + error);
            res.status(500).json({ error: error.message });
        }
    }
}
module.exports = commentController;