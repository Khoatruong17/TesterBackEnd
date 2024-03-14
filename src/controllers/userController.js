//import {userService} from '../services/userService'

const registerService = require ('../services/registerloginService')
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const Role = require("../models/roleModel");

const Login = () => {
    try {
        return res.status(500).json({
            EM: "error from server", //error message
            EC: "-1", //error code
            DT: "" //data
        })
    } catch (error) {
        
    }
};

const Register = async (req, res) => {
    try {
        // check missing data
        if (!req.body.email || !req.body.password) {
            return res.status(200).json({
                EM: "Missing data required", //error message
                EC: "1", //error code
                DT: "" //data
            })
        }
        // service create user
        let data = await registerService.registerNewUser(req.body);
        return res.status(200).json({
            EM: data.EM, //create user success message
            EC: data.EC, 
            DT: "" //data
        })
    } catch (e) {
        return res.status(500).json({
            EM: "error from server", //error message
            EC: "-1", //error code
            DT: "" //data
        })
    }
}



module.exports = {
    Register
};