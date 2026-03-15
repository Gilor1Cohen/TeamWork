const express = require("express");
const createMiddleware = require("../../common/AuthMiddleware");

const { userData } = require("../business-logic-layer/getUserData.js");

const router = express.Router();

router.get("/", createMiddleware, async (req, res) => {
  try {
    const UserId = req.user.decoded.ID;

    if (!UserId) {
      return res.status(400).json({ error: "UserId is required" });
    }

    const data = await userData(UserId);

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error");
  }
});

module.exports = router;
