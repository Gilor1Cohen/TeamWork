const express = require("express");
const createMiddleware = require("../../common/AuthMiddleware");

const {
  projectCompleted,
} = require("../business-logic-layer/projectCompleted");

const router = express.Router();

router.delete("/", createMiddleware, async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Project id is required" });
    }

    const completed = await projectCompleted(id);

    res.status(200).json({ message: "Project completed successfully" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
