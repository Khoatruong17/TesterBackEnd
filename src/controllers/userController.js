//import {userService} from '../services/userService'
const userService = require('../services/userService')
const User = require("../models/userModel");
const Role = require("../models/roleModel");
const userController = {
    //Login
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.user_email });
            const validPassword = await bcrypt.compare(
                req.body.user_password,
                user.password
            );

            // If email and passwords match
            if (user && validPassword) {
                let welcomeMessage;
                // Lấy thông tin của vai trò của người dùng
                const userRole = await Role.findById(user.role_Id);
                if (userRole) {
                    welcomeMessage = `Welcome ${userRole.role_name}`;
                } else {
                    welcomeMessage = "Welcome (not Found)";
                }
                res.status(200).json({ message: welcomeMessage, user });
                console.log("Login Successfully");
            } else if (!user) { // If email is wrong
                res.status(404).json("Wrong email!");
                console.log("Wrong email!");
            } else if (!validPassword) { // If password is wrong
                res.status(404).json("Wrong password!");
                console.log("Wrong password!");
            }

        } catch (error) {
            console.log("Error login" + error);
            res.status(500).json(error);
        }
    },


//     try {
//         const user = await User.findOne({email: req.body.email});
//         const validPassword = await bcrypt.compare(
//             req.body.password,
//             user.password
//         )

//         //If email and passwords match
//         if (user && validPassword){

//             res.status(200).json(user);
//             console.log("Login Successfully");
//         }

//         //If email and password wrong
//         if(!user) {
//             res.status(404).json("Wrong email!");
//             console.log("Wrong email!");
//         }
//         if(!validPassword){
//             res.status(404).json("Wrong password!");
//             console.log("Wrong password!")
//         }


//     } catch (error) {
//         console.log("Error login" + error);
//         res.status(500).json(error);
//     }
//}
    //Register (add user)
    registerUser: async (req, res) => {
        let { username, email, password, role_Id, faculty_Id } = req.body;

        try {
            // use userService to register user
            await userService.createNewUser(username, email, password, role_Id, faculty_Id);
            res.status(200).json({ message: "User registered successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    getUserList: async(req, res) => {
        let userList = await userService.GetallUser();
        res.status(200).json(userList);
    }

}


module.exports = userController;