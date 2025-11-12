const express = require('express');
const { Purchase, User, Book} = require('../models');
const authenticate = require("../middleware/authMiddleware");
const logActivity = require('../utils/logActivity');

const router = express.Router();


// 🔒 Apply middleware to all routes below
router.use(authenticate);

// ➕ Make a purchase
router.post('/', async (req, res) => {
  try {
    const { bookId, quantity } = req.body;
    const purchase = await Purchase.create({
      userId: req.user.id, // ✅ from token
      bookId,
      quantity,
    });

    // ...
    await logActivity({
      userId: req.user.id,
      action: "purchased_book",
      bookId,
      details: { quantity },
    });

    res.status(201).json({
      message: "Purchase added successfully",
      purchase,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📦 Get all purchases
router.get('/', async (req, res) => {
  try {
    const purchases = await Purchase.findAll({ where: { userId: req.user.id }, include: [{ model: Book }], // optional, if you want book details
    });
    res.json(purchases);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
