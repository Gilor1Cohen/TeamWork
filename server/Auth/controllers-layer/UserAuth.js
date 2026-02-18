const express = require("express");
const createMiddleware = require("../../common/AuthMiddleware");

const router = express.Router();

router.get("/", createMiddleware, async (req, res) => {
  try {
    return res.status(200).json({
      user: {
        FirstName: req.user.decoded.FirstName,
        LastName: req.user.decoded.LastName,
        Email: req.user.decoded.Email,
        id: req.user.decoded.ID,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred during signup" });
  }
});

module.exports = router;
