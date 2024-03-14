const mongoose = require('mongoose');
const User = require("../models/userModel");
const RoleModel = require("../models/roleModel");
const bcrypt = require("bcrypt");

//---------------- Register ------------------
const hashUserPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
}
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

const registerNewUser = async (rawUserData) => {
    try {
        // check email are exists
        let isEmailExists = await checkUsername(rawUserData.username);
        if (isEmailExists == true) {
            return {
                EM: "The username already exists",
                EC: 1
            }
        }
        let isUsernameExists = await checkEmail(rawUserData.email);
        if (isUsernameExists == true) {
            return {
                EM: "The email already exists",
                EC: 1
            }
        }
        // hash user password
        let hashPassword = await hashUserPassword(rawUserData.password);
        // create new user
        //const newUser = mongoose.model('User', userSchema);
        const user = new User({
            username: rawUserData.username,
            email: rawUserData.email,
            password: hashPassword,
            role_Id: rawUserData.role_id
        });

        try {
            const result = await user.save();
            console.log(result);
            return {
                EM: "User created successfully",
                EC: 0
            }
        } catch (err) {
            console.error('Error creating user:', err);
        }
    } catch (e) {
        console.log(">>> Error register new user (service): " + e.message);
        return {
            EM: "Something Wrong with server",
            EC: 10
        }
    }
}

//---------------- Login ------------------
const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword);
    // insert right password --> true
    // insert wrong password --> false
}
const UserLogin = async (rawData) => {
    try {
        const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(rawData.email)
        if (isEmail) {
            let user = await User.findOne({ email: rawData.email });
            console.log(user);
            if (user) {
                console.log('>>>>>>>User found', user.password);
                let IsCorrectPass = checkPassword(rawData.password, user.password);
                if (IsCorrectPass === true) {
                    return {
                        EM: "Login successful",
                        EC: 0,
                        DT: user
                    }
                }
            }
            console.log(">>email or password is incorrect")
            return {
                EM: "Your email or password is incorrect",
                EC: 1,
                DT: ""
            }
        }
        else{
            return {
                EM: "user name is not a email",
                EC: 1,
                DT: ""
            }
        }
    } catch (e) {
        console.log(">>> Error register new user (service): " + e.message);
        return {
            EM: "Something Wrong with server",
            EC: 10
        }
    }
}

module.exports = {
    registerNewUser,
    UserLogin
}