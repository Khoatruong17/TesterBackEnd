const express = require("express");
const Contributions = require("../models/contributionModel");
const jwtAction = require("../middleware/jwtAction");
const uploadFile = require("../controllers/file.Controller");
const Topic = require("../models/topicModel");
const User = require("../models/userModel");
const sendEmailMessage = require("../services/sendMail.Service");
const path = require("path");

const findUser = async (topic_id) => {
  try {
    const topic = await Topic.findById(topic_id);
    if (!topic) {
      throw new Error("Topic not found");
    }
    const user = await User.findById(topic.user.user_id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.log("Error finding user by topic_id: " + error);
    throw error;
  }
};

const returnEmail = async () => {
  try {
    const user = await findUser(req.body.topic_id);
    const email = await User.findOne({ email: user.email });
    if (!email) {
      throw new Error("Email not found");
    }
    return email;
  } catch (error) {
    console.log("Error finding user by email: " + error);
    throw error;
  }
};

const createContribution = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }
    const cookies =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmI4ZWU0YmJjNGExODVkMmI3ZTUyMyIsImVtYWlsIjoibmFtYW5oQGdtYWlsLmNvbSIsImdyb3VwV2l0aFJvbGUiOnsic1JvbGVzIjpbeyJ1cmwiOiIvdXNlci9yZWFkIiwiZGVzY3JpcHRpb24iOiJHZXQgYWxsIHVzZXIifV0sImdyb3VwIjp7Il9pZCI6IjY1ZmFlNDRlODUwOTA1ZjA1ZjBlMjI4MCIsIm5vX2dyb3VwIjozLCJncm91cF9uYW1lIjoiTWFuYWdlciBDb29yZGluYXRvciAiLCJkZXNjcmlwdGlvbiI6IkNhbiBjb250cm9sIGFsbCBzZXJ2aWNlIGFib3V0IGNvbnRyaWJ1dGlvbnMgYXQgdGhpZXIgZmFjdWx0eSIsImNyZWF0ZWRBdCI6IjIwMjQtMDMtMjBUMTM6Mjc6NDIuOTQ5WiIsInVwZGF0ZWRBdCI6IjIwMjQtMDMtMjBUMTM6Mjc6NDIuOTQ5WiIsIl9fdiI6MH19LCJpYXQiOjE3MTE2MjY0MjZ9.d3F3AxmAAh_yzJuvBh5_2SwlNeMmQdU8f9phQScKYn8"; // your jwt token
    const decoded = jwtAction.verifyToken(cookies);
    const student_id = decoded.id;
    const topic_id = req.body.topic_id;
    const topic = await Topic.findById(topic_id);
    if (!topic) {
      throw new Error("Topic not found, please check topic_id");
    }

    const email = "truongndkgch190486@fpt.edu.vn";

    // You need to pass req object to the function
    const filePath = await uploadFile.postUploadMultipleFiles(req);
    let documents = [];
    let countSuccess;
    console.log(filePath);
    if (Array.isArray(filePath.detail)) {
      // If multiple files are uploaded
      documents = filePath.detail.map((detail) => detail.path);
      countSuccess = filePath.countSuccess;
    } else if (filePath.DT.path) {
      // If only one file is uploaded
      documents = filePath.DT.path;
      countSuccess = 1;
    } else {
      console.error("filePath.detail or filePath.path is not available.");
      return res.status(400).send("Invalid file upload data.");
    }
    const currentDate = new Date();

    console.log(">>> File Path", documents);
    //console.log({filePath,currentDate,student_id,topic_id});
    const newContribution = new Contributions({
      user_id: student_id,
      topic_id: topic_id,
      name: req.body.name,
      description: req.body.description,
      document: documents,
      submit_date: currentDate,
    });
    const contribution = await newContribution.save();
    if (contribution) {
      const user = await User.findById(student_id);
      let text = `The student "${user.username}" upload ${countSuccess} contribution to the system`;
      let email_status = await sendEmailMessage.sendEmail(email, text);
      console.log(email_status);
    }

    console.log("Add contribution Successfully");
    return res.status(200).json({
      message: "Add contribution Successfully",
      contribution: contribution, // Optionally, you can return the created contribution
    });
  } catch (error) {
    console.log("Error create contribution --: " + error);
    res.status(500).json({ error: error.message });
  }
};

const getAllContribution = async (req, res) => {
  try {
    const contribution = await Contributions.find();
    res.status(200).json(contribution);
    console.log("Get all contributions successfully");
  } catch (error) {
    console.log("Error get all contributions: " + error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createContribution,
  getAllContribution,
};
