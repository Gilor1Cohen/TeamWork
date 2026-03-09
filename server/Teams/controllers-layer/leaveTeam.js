const express = require("express");
const {
  removeTeamMember,
} = require("../business-logic-layer/removeTeamMember");
const createMiddleware = require("../../common/AuthMiddleware");

const router = express.Router();

router.post("/", createMiddleware, async (req, res) => {
  try {
    const { UserId, TeamId } = req.body;

    if (!UserId || !TeamId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const leave = await removeTeamMember(UserId, TeamId);

    res.status(200).json({ message: "Team added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
