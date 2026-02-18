const express = require("express");
const { Signup } = require("../business-logic-layer/Signup");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { FirstName, LastName, Email, Password } = req.body;

    if (!FirstName || !LastName || !Email || !Password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const data = await Signup(FirstName, LastName, Email, Password);

    if (!data.status) {
      return res.status(400).json({ message: data.error });
    }

    res.cookie("token", data.token, {
      httpOnly: true,
      maxAge: 20 * 60 * 1000,
    });

    return res.status(200).json({ user: data.user });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred during signup" });
  }
});

module.exports = router;
