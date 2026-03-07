const express = require("express");
const createMiddleware = require("../../common/AuthMiddleware");
const { getTeamsByUser } = require("../business-logic-layer/getTeamsByUser");

const router = express.Router();

router.get("/", createMiddleware, async (req, res) => {
  try {
    const UserId = req.user.decoded.ID;

    const Teams = await getTeamsByUser(UserId);

    res.status(200).json(Teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
