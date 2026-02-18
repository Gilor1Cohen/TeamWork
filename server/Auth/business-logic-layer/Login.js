const { isEmailExists } = require("../data-access-layer/GetData");
const bcrypt = require("bcrypt");
const signJwt = require("../../common/signJwt");

async function Login(Email, Password) {
  try {
    const password = await isEmailExists(Email);

    if (!password) {
      return { status: false, error: "Invalid credentials." };
    }

    const isPasswordValid = await bcrypt.compare(Password, password.Password);

    if (!isPasswordValid) {
      return { status: false, error: "Invalid credentials." };
    }

    const token = await signJwt(
      password.FirstName,
      password.LastName,
      password.Email,
      password.id,
    );

    return {
      status: true,
      token,
      user: {
        FirstName: password.FirstName,
        LastName: password.LastName,
        Email: password.Email,
        id: password.id,
      },
    };
  } catch (error) {
    return { status: false, error: "An error occurred during login." };
  }
}

module.exports = { Login };
