const express = require("express");
const createMiddleware = require("../../common/AuthMiddleware");

const { taskCompleted } = require("../business-logic-layer/taskCompleted");

const router = express.Router();

router.delete("/", createMiddleware, async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Task id is required" });
    }

    const completed = await taskCompleted(id);

    res.status(200).json({ message: "Task completed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
