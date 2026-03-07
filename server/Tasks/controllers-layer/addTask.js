const express = require("express");
const createMiddleware = require("../../common/AuthMiddleware");
const { AddTask } = require("../business-logic-layer/AddTask");

const router = express.Router();

router.post("/", createMiddleware, async (req, res) => {
  try {
    const { Title, Description, DueDate, Project } = req.body;

    if (!Title || !Description || !DueDate || !Project) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const add = await AddTask(Title, Description, DueDate, Project);

    res.status(201).json({ message: "Task added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
