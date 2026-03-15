const express = require("express");
const { addTeam } = require("../business-logic-layer/addTeam");
const createMiddleware = require("../../common/AuthMiddleware");

const router = express.Router();

router.post("/", createMiddleware, async (req, res) => {
  try {
    const { Title, Description } = req.body;

    if (!Title || !Description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const UserId = req.user.decoded.ID;
    const UserName = ` ${req.user.decoded.FirstName} ${req.user.decoded.LastName}`;

    const add = await addTeam(Title, Description, UserId, UserName);

    res.status(201).json({ message: "Team added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
