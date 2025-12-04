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
    //const { bookId, quantity } = req.body;
      const { bookId, quantity = 1, force = false } = req.body;

    // 1️⃣ Check if book exists
    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // 2️⃣ Check for existing purchase by this user
    const existingPurchase = await Purchase.findOne({
      where: { userId: req.user.id, bookId },
    });

    if (existingPurchase && !force) {
      // ⚠️ User already purchased this book
      return res.status(409).json({
        message:
          "You've already purchased this book. If you want to buy it again, send 'force': true in your request.",
      });
    }

    // 3️⃣ Create a new purchase
    const purchase = await Purchase.create({
      userId: req.user.id, // ✅ from token
      bookId,
      quantity,
    });

    // 4️⃣ Log the activity
    await logActivity({
      userId: req.user.id,
      action: "purchased_book",
      bookId,
      details: { quantity },
    });

    res.status(201).json({
      message: "Book purchased successfully",
      purchase,
    });
  } catch (err) {
    console.error("❌ Error in purchase route:", err);
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
