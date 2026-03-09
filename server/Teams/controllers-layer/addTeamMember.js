const express = require("express");
const { addTeamMember } = require("../business-logic-layer/addTeamMember");
const createMiddleware = require("../../common/AuthMiddleware");

const router = express.Router();

router.post("/", createMiddleware, async (req, res) => {
  try {
    const { Name, Role, UserId, TeamId } = req.body;

    if (!UserId || !TeamId || !Name || !Role) {
      return res.status(400).json({ error: "UserId is required" });
    }

    const add = await addTeamMember(Name, Role, UserId, TeamId);

    res.status(201).json({
      Name,
      _id: UserId,
      Role,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
