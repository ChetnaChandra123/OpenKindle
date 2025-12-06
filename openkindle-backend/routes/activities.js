const express = require("express");
const { Activity, User, Book } = require("../models");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

// 🔒 All activity routes require authentication
router.use(authenticate);

// 📝 Log a new activity (e.g., viewed, purchased, added)
router.post("/", async (req, res) => {
  try {
    const { action, bookId } = req.body;

    if (!action) {
      return res.status(400).json({ error: "Action is required" });
    }

    const activity = await Activity.create({
      userId: req.user.id,
      bookId: bookId || null, // optional
      action,
    });

    res.status(201).json({
      message: "Activity logged successfully",
      activity,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📜 Get all activities of logged-in user
router.get("/", async (req, res) => {
  try {
    const activities = await Activity.findAll({
      where: { userId: req.user.id },
      include: [{ model: Book }],
      order: [["createdAt", "DESC"]],
    });

    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
