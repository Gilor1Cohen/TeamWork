const express = require("express");

const { Login } = require("../business-logic-layer/Login");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const data = await Login(Email, Password);

    if (!data.status) {
      return res.status(400).json({ message: data.error });
    }

    res.cookie("token", data.token, {
      httpOnly: true,
      maxAge: 20 * 60 * 1000,
    });

    return res.status(200).json({ user: data.user });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred during Login" });
  }
});

module.exports = router;
