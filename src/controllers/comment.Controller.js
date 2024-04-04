const express = require("express");
const Comments = require("../models/commentModel");
const Contributions = require("../models/contributionModel");
const User = require("../models/userModel");
const jwtAction = require("../middleware/jwtAction");

const commentController = {
  //create comment
  createComment: async (req, res) => {
    try {
      let cookies = req.cookies;
      const cookie =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGJiNmY2YTdiMGRiZWE3OTc1NzExNiIsImVtYWlsIjoic3R1ZGVudDAxQGdtYWlsLmNvbSIsImdyb3VwV2l0aFJvbGUiOnsic1JvbGVzIjpbeyJ1cmwiOiIvdGVzdCIsImRlc2NyaXB0aW9uIjoiR2V0IGFsbCB1c2VyIn1dLCJncm91cCI6eyJfaWQiOiI2NWZhZTQ3NTg1MDkwNWYwNWYwZTIyODIiLCJub19ncm91cCI6NCwiZ3JvdXBfbmFtZSI6IlN0dWRlbnQiLCJkZXNjcmlwdGlvbiI6IkNhbiB1cGxvYWQgdGhpZXIgY29udHJpYnV0aW9ucyAiLCJjcmVhdGVkQXQiOiIyMDI0LTAzLTIwVDEzOjI4OjIxLjc5MFoiLCJ1cGRhdGVkQXQiOiIyMDI0LTAzLTIwVDEzOjI4OjIxLjc5MFoiLCJfX3YiOjB9fSwiaWF0IjoxNzEyMDUwNTM3fQ.us07_fwWfY758BNd9emerAft2SQ3fBKmvJXDiElh69s"; // your jwt token
      const decoded = jwtAction.verifyToken(cookie);
      const coordinator_id = decoded.id;
      const contributionExists = await Contributions.findOne({
        _id: req.body.contribution_id,
      });

      if (!contributionExists) {
        return res.status(404).json({ error: "contribution id not found " });
      }

      const userExists = await User.findOne({ _id: coordinator_id });
      if (!userExists) {
        return res.status(404).json({ error: "user id not found " });
      }

      const newComment = new Comments({
        contribution_id: contributionExists._id,
        user_id: coordinator_id,
        comment: req.body.comment,
      });

      const savedComment = await newComment.save();
      contributionExists.comments.push({
        comment_user: savedComment.user_id,
        comment_id: savedComment._id,
        comment: savedComment.comment,
      });

      await contributionExists.save();
      console.log("Add comment Successfully");
      res.status(200).json(savedComment);
    } catch (error) {
      console.log("Error create comment: " + error);
      res.status(500).json({ error: error.message });
    }
  },

  // View comment for sutudent
  getCommentsForStudent: async (req, res) => {
    try {
      const contributionId = req.body.contribution_id;
      if (!contributionId) {
        console.log("No contribution have been found");
        return res
          .status(404)
          .json({ message: "No contribution have been found" });
      }

      const comments = await Comments.find({
        contribution_id: contributionId,
      }).select("user_id comment createdAt updatedAt");

      if (comments.length === 0) {
        console.log("No comments have been found");
        return res
          .status(404)
          .json({ message: "The contribution doesn't have comment" });
      }

      const formattedComments = [];
      for (const comment of comments) {
        const user = await User.findById(comment.user_id);
        if (!user) {
          console.log("User not found for comment:", comment);
          continue;
        }
        const formattedComment = {
          username: user.username,
          comment: comment.comment,
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,
        };
        formattedComments.push(formattedComment);
      }

      return res.status(200).json(formattedComments);
    } catch (error) {
      console.log("Error getting comments for contribution: " + error);
      res.status(500).json({ error: error.message });
    }
  },
  // Get all the comments
  // Get all the comments
  getAllComment: async (req, res) => {
    try {
      const comment = await Comments.find();
      res.status(200).json(comment);
      console.log("Get all comments successfully");
    } catch (error) {
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
      const comment = await Comments.findByIdAndUpdate(
        req.params.id,
        { comment: updatedComment },
        { new: true }
      );
      if (!comment) {
        return res.status(404).json({ message: "Cannot find comment" });
      }
      res.status(200).json(comment);
      console.log(`Update comment successfully`);
    } catch (error) {
      console.log("Error update comment: " + error);
      res.status(500).json({ error: error.message });
    }
  },
};
module.exports = commentController;
