require("dotenv").config();
const JWT = require("jsonwebtoken");

// const createJWT = async (payload) => {
//   let key = process.env.JWT_SECRET;
//   let token = null;
//   try {
//     token = JWT.sign(payload, key);
//   } catch (error) {
//     console.log(error);
//   }
//   return token;
// };

const createJWT = async (payload) => {
  try {
      let key = process.env.JWT_SECRET;
      let token = JWT.sign(payload, key);
      return token;
  } catch (error) {
      console.log(error);
      throw new Error('Error creating JWT');
  }
};

const verifyToken = (token) => {
  let key = process.env.JWT_SECRET;
  let data = null;
  try {
    let decoded = JWT.verify(token, key);
    data = decoded;
  } catch (error) {
    console.log(error);
  }
  return data;
};

module.exports = {
  createJWT,
  verifyToken,
};
