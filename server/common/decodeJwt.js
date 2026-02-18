const jwt = require("jsonwebtoken");
require("dotenv").config();

function decodeJwt(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return { status: true, decoded };
  } catch (error) {
    throw { status: false, message: "Invalid token" };
  }
}

module.exports = decodeJwt;
