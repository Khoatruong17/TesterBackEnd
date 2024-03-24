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
    throw new Error("Error creating JWT");
  }
};

const verifyToken = (token) => {
  let key = process.env.JWT_SECRET;
  let decoded = null;
  try {
    decoded = JWT.verify(token, key);
  } catch (error) {
    console.log(error);
  }
  return decoded;
};

const checkUserJWT = (req, res, next) => {
  let cookies = req.cookies;
  if (cookies && cookies.jwt) {
    console.log("my jwt: ", cookies.jwt);
    let decoded = verifyToken(cookies.jwt);
    if (decoded) {
      req.user = decoded;
      next();
    } else {
      return res.status(401).json({
        EM: "unauthorized",
        EC: "-1",
        DT: "",
      });
    }
  } else {
    return res.status(401).json({
      EM: "unauthorized",
      EC: "-1",
      DT: "",
    });
  }
};

module.exports = {
  createJWT,
  verifyToken,
  checkUserJWT,
};
