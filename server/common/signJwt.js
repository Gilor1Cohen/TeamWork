const jwt = require("jsonwebtoken");
require("dotenv").config();

async function signJwt(FirstName, LastName, Email, ID) {
  try {
    const token = jwt.sign(
      { FirstName, LastName, Email, ID },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "20m" },
    );
    return token;
  } catch (error) {}
}

module.exports = signJwt;
