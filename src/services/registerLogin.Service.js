const mongoose = require("mongoose");
const validator = require("validator");
require("dotenv").config();
const User = require("../models/userModel");
const GroupModel = require("../models/groupModel");
const FacultyModel = require("../models/facultyModel");
const bcrypt = require("bcrypt");
const getGWR = require("../services/jwt.Service");
const upFile = require("../services/file.Service");
const JWTaction = require("../middleware/jwtAction");

//---------------- Register ------------------
const hashUserPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
};

// check user email
const checkEmail = async (userEmail) => {
  const emailExists = await User.findOne({ email: userEmail });
  if (emailExists) {
    return true;
  }
  return false;
};

// check user username
const checkUsername = async (username) => {
  const usernameExists = await User.findOne({ username: username });
  if (usernameExists) {
    return true;
  }
  return false;
};

const isPasswordStrong = (password) => {
  const uppercaseRegex = /[A-Z]/;
  const lengthRegex = /.{8,}/;
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

  return (
    uppercaseRegex.test(password) &&
    lengthRegex.test(password) &&
    specialCharRegex.test(password)
  );
};

const registerNewUser = async (rawUserData) => {
  try {
    const isEmail = validator.isEmail(rawUserData.email);
    if (isEmail) {
      let isEmailExists = await checkUsername(rawUserData.username);
      if (isEmailExists == true) {
        return {
          EM: "The username already exists",
          EC: 1,
        };
      }
      let isUsernameExists = await checkEmail(rawUserData.email);
      if (isUsernameExists == true) {
        return {
          EM: "The email already exists",
          EC: 1,
        };
      }

      if (!isPasswordStrong(rawUserData.password)) {
        return {
          EM: "Password must contain at least one uppercase letter, one special character, and be at least 8 characters long.",
          EC: 1,
        };
      }

      // Upload user image
      const imageUploadResult = await upFile.uploadImageUser(rawUserData.image);
      if (imageUploadResult.EC !== 0) {
        return {
          EM: "Image upload failed",
          EC: 1,
        };
      }
      let hashPassword = await hashUserPassword(rawUserData.password);
      // find roles by id
      const find_group = await GroupModel.findById(
        rawUserData.group_id
      ).populate("_id");
      console.log(find_group);
      if (!find_group) {
        return {
          EM: "Cannot find group",
          EC: 1,
        };
      }

      // create new user
      const user = new User({
        username: rawUserData.username,
        email: rawUserData.email,
        password: hashPassword,
        group: {
          group_id: find_group._id,
          group_name: find_group.group_name,
        },
        image: imageUploadResult.DT.path,
      });

      if (rawUserData.faculty_id) {
        const find_faculty = await FacultyModel.findById(
          rawUserData.faculty_id
        );
        if (!find_faculty) {
          return {
            EM: "Can't find Faculty",
            EC: 1,
          };
        }
        user.faculty = {
          faculty_id: find_faculty._id,
          faculty_name: find_faculty.faculty_name,
        };
      }
      try {
        const result = await user.save();
        console.log(result);
        return {
          EM: "User created successfully",
          EC: 0,
        };
      } catch (err) {
        console.error("Error creating user:", err);
      }
    } else {
      return {
        EM: "email cant find body.email or is not a valid email address, please check email address",
        EC: 1,
        DT: "",
      };
    }
  } catch (e) {
    console.log(">>> Error register new user (service): " + e.message);
    return {
      EM: "Something Wrong with server",
      EC: 10,
    };
  }
};

//---------------- Login ------------------
const checkPassword = (inputPassword, hashPassword) => {
  return bcrypt.compareSync(inputPassword, hashPassword);
  // insert right password --> true
  // insert wrong password --> false
};

const UserLogin = async (rawData) => {
  try {
    const isEmail = validator.isEmail(rawData.email);
    if (isEmail) {
      let user = await User.findOne({ email: rawData.email });
      if (user) {
        let IsCorrectPass = checkPassword(rawData.password, user.password);
        if (IsCorrectPass === true) {
          //token
          let groupWithRole = await getGWR.GetGroupWithRole(user);
          let tokenJWT = await JWTaction.createJWT({
            id: user._id,
            email: user.email,
            groupWithRole,
          });
          console.log(">>> token", tokenJWT);
          return {
            EM: "Login successful",
            EC: 0,
            DT: {
              access_token: tokenJWT,
              expiresIn: process.env.JWT_EXPIRES_IN,
              data: { id: user._id, username: user.username, groupWithRole },
            },
          };
        }
      }
      console.log(">>email or password is incorrect");
      return {
        EM: "Your email or password is incorrect",
        EC: 1,
        DT: "",
      };
    } else {
      return {
        EM: "user name is not a email or is not email",
        EC: 1,
        DT: "",
      };
    }
  } catch (e) {
    console.log(">>> Error login user (service): " + e.message);
    return {
      EM: "Something Wrong with server",
      EC: 10,
    };
  }
};

module.exports = {
  registerNewUser,
  UserLogin,
};
