const express = require("express");
const createMiddleware = require("../../common/AuthMiddleware");

const { addProject } = require("../business-logic-layer/addProject");

const router = express.Router();

router.post("/", createMiddleware, async (req, res) => {
  try {
    const { Title, Description, DueDate, Team } = req.body;

    if (!Title || !Description || !DueDate || !Team) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const add = await addProject(Title, Description, DueDate, Team);

    res.status(201).json({ message: "Project added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
