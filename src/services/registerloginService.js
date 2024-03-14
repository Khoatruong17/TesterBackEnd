const mongoose = require('mongoose');
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);


// check user email
const checkEmail = async (userEmail) => {
    const emailExists = await User.findOne({ email: userEmail });
    if (emailExists) {
        return true;
    }
    return false;
}

// check user username
const checkUsername = async (username) => {
    const usernameExists = await User.findOne({ username: username });
    if (usernameExists) {
        return true;
    }
    return false;
}

const registerNewUser =  async (rawUserData) => {
    try{
    // check email are exists
    let isEmailExists = await checkUsername(rawUserData.username);
    if (isEmailExists == true) {
        return {
            EM : "The email already exists",
            EC : 1
        }
    }
    let isUsernameExists = await checkEmail(rawUserData.email);
    if (isUsernameExists == true) {
        return {
            EM : "The username already exists",
            EC : 1
        }
    }
    // hash user password
    let hashPassword = await hashUserPassword(rawUserData.password);
    // create new user
    const email = rawUserData.email;
    const newUser = mongoose.model('User', userSchema);
    const user = new newUser({
        username: rawUserData.username,
        email,
        password: hashPassword,
        role_Id : rawUserData.role_id
    });

    try {
        const result = await user.save();
        console.log(result);
        return {
            EM : "User created successfully",
            EC : 0
        }
    } catch (err) {
        console.error('Error creating user:', err);
    }
    }catch(e){
        console.log(">>> Error register new user (service): " + e.message);
        return {
            EM : "Something Wrong with server",
            EC : 10
        }
    }
}

module.exports = {
    registerNewUser
}