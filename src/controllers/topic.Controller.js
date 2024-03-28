const TopicModel = require("../models/topicModel");
const TopService = require("../services/topic.Service");

const createTopic = async (req, res) => {
  try {
    let data = await TopService.createNewTopic(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(">> Create Topic Fail: ", error);
    return res.status(500).json({
      EM: "error from server (controller)", //error message
      EC: "-1", //error code
    });
  }
};

const getAllTopic = async (req, res) => {
  try {
    let data = await TopService.getAllTopic();
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(">> Get All Topic Fail: ", error);
    return res.status(500).json({
      EM: "error from server (controller)", //error message
      EC: "-1", //error code
    });
  }
};

module.exports = {
  createTopic,
  getAllTopic,
};
