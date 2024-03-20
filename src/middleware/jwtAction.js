require("dotenv").config();
const JWT = require("jsonwebtoken");

const createJWT = async () => {
  let payload = { name: "Truong", email: "khoatruong@gmail.com" };
  let key = process.env.JWT_SECRET;
  let token = null;
  try {
    token = JWT.sign(payload, key);
    console.log(token);
    return token;
  } catch (error) {
    console.log(error);
  }
  return token;
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
