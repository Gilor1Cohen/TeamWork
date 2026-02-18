const user = require("./UserSchema");

async function isEmailExists(Email) {
  try {
    const existingUser = await user.findOne({ Email }, { __v: 0 });
    return existingUser;
  } catch (error) {
    return { status: false, error: "User not found." };
  }
}

module.exports = { isEmailExists };
