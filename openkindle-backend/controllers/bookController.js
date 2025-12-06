const { Book, Purchase } = require("../models");

exports.getMyBooks = async (req, res) => {
  try {
    const userId = req.user.id;

    const purchasedBooks = await Book.findAll({
      include: [
        {
          model: Purchase,
          where: { userId },
          attributes: []  // don't send purchase info, only filter
        }
      ]
    });

    res.json(purchasedBooks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load purchased books" });
  }
};
