const express = require("express");

const createMiddleware = require("../../common/AuthMiddleware");

const {
  getProjectsByUser,
} = require("../business-logic-layer/getProjectsByUser");

const router = express.Router();

router.get("/", createMiddleware, async (req, res) => {
  try {
    const UserId = req.user.decoded.ID;

    const Projects = await getProjectsByUser(UserId);

    res.status(200).json(Projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
