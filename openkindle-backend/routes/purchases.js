const express = require('express');
const { Purchase, User, Book } = require('../models');
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

// Protect all purchase routes
router.use(authenticate);

// ➕ Make a purchase
router.post('/', async (req, res) => {
  try {
    const { bookId, quantity = 1 } = req.body;

    // check duplicates - if user already purchased and you want to block duplicates:
    const existing = await Purchase.findOne({ where: { userId: req.user.id, bookId } });
    if (existing) {
      return res.status(400).json({ message: "You already purchased this book" });
    }

    const purchase = await Purchase.create({
      userId: req.user.id,
      bookId,
      quantity,
    });

    // optional: log activity (if utils/logActivity exists)
    try {
      const logActivity = require('../utils/logActivity');
      await logActivity({
        userId: req.user.id,
        action: "purchased_book",
        bookId,
        details: { quantity },
      });
    } catch (e) {
      console.error("Activity log failed:", e.message);
    }

    res.status(201).json({
      message: "Purchase added successfully",
      purchase,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📦 Get all purchases of the authenticated user
router.get('/', async (req, res) => {
  try {
    const purchases = await Purchase.findAll({
      where: { userId: req.user.id },
      include: [{ model: Book }]
    });
    res.json(purchases);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔎 Get just the purchased books (mybooks)
router.get('/mybooks', async (req, res) => {
  try {
    const purchases = await Purchase.findAll({
      where: { userId: req.user.id },
      include: [{ model: Book }]
    });

    // map to only books array
    const books = purchases.map(p => p.Book).filter(Boolean);
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
