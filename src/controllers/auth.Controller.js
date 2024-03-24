//import {userService} from '../services/userService'

const registerLoginService = require("../services/registerLogin.Service");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const Login = async (req, res) => {
  try {
    let data = await registerLoginService.UserLogin(req.body);
    //set cookie
    res.cookie("jwt", data.DT.access_token, {
      maxAge: 60 * 60 * 1000, // set time for cookie
      httpOnly: true, // only use from server
    });
    return res.status(200).json({
      EM: data.EM, //create user success message
      EC: data.EC,
      DT: data.DT, //data
    });
  } catch (error) {
    console.log(">> Login Fail", error);
    return res.status(500).json({
      EM: "error from server (controller)", //error message
      EC: "-1", //error code
      DT: "", //data
    });
  }
};

const Register = async (req, res) => {
  try {
    // check missing data
    if (!req.body.email || !req.body.password) {
      return res.status(200).json({
        EM: "Missing data required", //error message
        EC: "1", //error code
        DT: "", //data
      });
    }
    // service create user
    let data = await registerLoginService.registerNewUser(req.body);
    return res.status(200).json({
      EM: data.EM, //create user success message
      EC: data.EC,
      DT: data.DT, //data
    });
  } catch (e) {
    return res.status(500).json({
      EM: "error from server", //error message
      EC: "-1", //error code
      DT: "", //data
    });
  }
};

module.exports = {
  Register,
  Login,
};
