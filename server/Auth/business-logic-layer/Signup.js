const signJwt = require("../../common/signJwt");
const { createNewUser } = require("../data-access-layer/AddData");
const { isEmailExists } = require("../data-access-layer/GetData");
const bcrypt = require("bcrypt");

async function Signup(FirstName, LastName, Email, Password) {
  try {
    const isExists = await isEmailExists(Email);

    if (isExists) {
      return { status: false, error: "Email already exists" };
    }

    const HashedPassword = await bcrypt.hash(Password, 10);
    const newUser = await createNewUser(
      FirstName,
      LastName,
      Email,
      HashedPassword,
    );

    const token = await signJwt(FirstName, LastName, Email, newUser.id);
    return {
      status: true,
      token,
      user: { FirstName, LastName, Email, id: newUser.id },
    };
  } catch (error) {
    return {
      status: false,
      error: error.error || "An error occurred during signup",
    };
  }
}

module.exports = { Signup };
