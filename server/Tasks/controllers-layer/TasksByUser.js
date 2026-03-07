const express = require("express");

const createMiddleware = require("../../common/AuthMiddleware");

const { getTasksByUser } = require("../business-logic-layer/getTasksByUser");

const router = express.Router();

router.get("/", createMiddleware, async (req, res) => {
  try {
    const UserId = req.user.decoded.ID;

    const Tasks = await getTasksByUser(UserId);

    res.status(200).json(Tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
