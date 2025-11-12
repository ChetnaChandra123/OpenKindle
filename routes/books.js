const express = require('express');
const router = express.Router();
const { Book, User, Purchase } = require('../models');
const authenticate = require("../middleware/authMiddleware"); // ✅ add this
const logActivity = require('../utils/logActivity');


// ➕ Add a new book
router.post('/', authenticate, async (req, res) => {
  try {
    const { title, author, price } = req.body;
    
    // Basic validation
    if (!title || !author || !price) {
      return res.status(400).json({ error: "title, author, and price are required" });
    }

    
    // Create book linked to the authenticated user
    const book = await Book.create({
      title,
      author,
      price,
      userId: req.user.id, // comes from JWT token
    });

    await logActivity({
      userId: req.user.id,
      action: "added_book",
      bookId: book.id,
      details: { title, author },
    });

    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📚 Get all books
router.get('/', async (_, res) => {
  try {
    const books = await Book.findAll({ include: [User, Purchase] });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔍 Get a single book by ID (Public)
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id, { include: [User, Purchase] });
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
