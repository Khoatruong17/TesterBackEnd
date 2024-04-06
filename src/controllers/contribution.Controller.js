const express = require("express");
const Contributions = require("../models/contributionModel");
const jwtAction = require("../middleware/jwtAction");
const uploadFile = require("../controllers/file.Controller");
const Topic = require("../models/topicModel");
const User = require("../models/userModel");
const Faculty = require("../models/facultyModel");
const sendEmailMessage = require("../services/sendMail.Service");
const Contribution = require("../models/contributionModel");
const Comments = require("../models/commentModel");
const fs = require("fs").promises;
const expressZip = require("express-zip");
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
    let cookie = req.cookies;
    if (!cookie || cookie.length === 0) {
      return res.status(400).send("No cookies found. Please Login!!!");
    }
    console.log(">>> My Cookie: ", cookie);
    const decoded = jwtAction.verifyToken(cookie.jwt);
    const student_id = decoded.id;

    const student = await User.findById(student_id);
    if (!student) {
      throw new Error(
        "Student not found, please check token (take student_id by token)"
      );
    }
    const faculty_id = student.faculty.faculty_id;
    if (!faculty_id) {
      throw new Error("The user does not have faculty_id, please check again");
    }

    const topic_id = req.body.topic_id;
    const topic = await Topic.findById(topic_id);
    if (!topic) {
      throw new Error("Topic not found, please check topic_id");
    }
    const email = "truongndkgch190486@fpt.edu.vn";

    const filePath = await uploadFile.postUploadMultipleFiles(req);
    let documents = [];
    let countSuccess;
    console.log(filePath);
    if (Array.isArray(filePath.detail)) {
      documents = filePath.detail.map((detail) => detail.path);
      countSuccess = filePath.countSuccess;
    } else if (filePath.DT.path) {
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
      topic_name: topic.name,
      faculty_id: faculty_id,
      name: req.body.name,
      description: req.body.description,
      document: documents,
      submit_date: currentDate,
      status: 0,
    });
    const contribution = await newContribution.save();
    if (contribution) {
      const user = await User.findById(student_id);
      let text = `The student "${user.email}" upload ${countSuccess} contribution to the system`;
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

const showcontributionbyFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.body.faculty_id);
    if (!faculty) {
      throw new Error("Faculty not found, please check faculty_id");
    }
    const contribution = await Contributions.find({
      faculty_id: faculty._id,
    });
    if (!contribution) {
      throw new Error("Contribution not found (find by faculty_id)");
    }
    const status = req.body.status;
    //const status_contribution = await contribution.find({ status: status });
    if (status) {
      const contributionByStatus = await Contributions.find({
        faculty_id: faculty._id,
        status: status,
      });
      return res.status(200).json({
        EM: "success (get by status)",
        EC: 0,
        DT: contributionByStatus,
      });
    }
    return res.status(200).json({
      EM: "success",
      EC: 0,
      DT: contribution,
    });
  } catch (error) {
    console.log("Error get contribution by  --: " + error);
    res.status(500).json({ error: error.message });
  }
};

// download a contribution from server
const downloadContribution = async (req, res) => {
  try {
    const contribution = await Contribution.findById(req.params.id);

    if (!contribution) {
      return res.status(404).json({ message: "Contribution not found" });
    }
    const files = contribution.document;
    const foundFiles = [];
    const notFoundFiles = [];
    // Check if each file exists, if not, add it to notFoundFiles
    for (const file of files) {
      try {
        await fs.access(file); // Check if the file exists
        foundFiles.push({ path: file, name: path.basename(file) });
      } catch (error) {
        notFoundFiles.push(path.basename(file));
      }
    }
    if (foundFiles.length === 0) {
      return res.status(404).json({ message: "No valid files found" });
    }
    if (notFoundFiles.length > 0) {
      console.log("Files not found:", notFoundFiles);
    }
    res.zip(foundFiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const delContribution = async (req, res) => {
  try {
    const contributionId = req.params.id;
    const contribution = await Contributions.findById(contributionId);
    if (!contribution) {
      return res.status(404).json({ message: "Contribution not found" });
    }
    for (const file of contribution.document) {
      try {
        await fs.unlink(file);
        console.log(`File ${file} has been deleted`);
      } catch (error) {
        console.error(`Error deleting file ${file}: ${error}`);
      }
    }
    await Comments.deleteMany({ contribution_id: contributionId });
    await Contributions.findByIdAndDelete(contributionId);

    console.log("Contribution deleted successfully");
    return res
      .status(200)
      .json({ message: "Contribution deleted successfully" });
  } catch (error) {
    console.log("Error deleting contribution: " + error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createContribution,
  getAllContribution,
  downloadContribution,
  showcontributionbyFaculty,
  delContribution,
};
