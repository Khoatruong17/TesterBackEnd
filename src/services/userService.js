const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const hashUserPassword = async (userPassword) => {
    const hashedPassword = await bcrypt.hash(userPassword, 10);
    return hashedPassword;
}

const isUsernameTaken = async (username) => {
    const existingUser = await User.findOne({ username });
    return !!existingUser;
}

const isEmailTaken = async (email) => {
    const existingUser = await User.findOne({ email });
    return !!existingUser;
}

const createNewUser = async ( username, email, password, role_Id, faculty_Id) => {
    try {
        // Check if username or email already exists
        const usernameTaken = await isUsernameTaken(username);
        const emailTaken = await isEmailTaken(email);
        if (usernameTaken) {
            throw new Error("Username already exists");
            //return res.status(400).json({ message: "Username already exists" });
        }
        if (emailTaken) {
            throw new Error("Email already exists");
        }

        let hashedPassword = await hashUserPassword(password);
        const newUser = new User({ username, email, password: hashedPassword, role_Id, faculty_Id });
        const user = await newUser.save();
        return user;
    } catch (error) {
        throw error;
    }
};

const GetallUser = async (req, res) =>{
    try{
        const user = await User.find();
        res.status(200).json(user);
        console.log("Get all users successfully");
    }catch(error){
        console.log("Error get all user: " + error);
        res.status(500).json({ error: error.message });
    }
} 

module.exports = {
    createNewUser,
    GetallUser
};
