const user = require("./UserSchema");

async function createNewUser(FirstName, LastName, Email, Password) {
  try {
    const newUser = await user.create({
      FirstName,
      LastName,
      Email,
      Password,
    });

    return newUser;
  } catch (error) {
    return { status: false, error: "Error creating new user" };
  }
}

module.exports = { createNewUser };
