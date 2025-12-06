// utils/seedBooks.js
require('dotenv').config();
const { sequelize, Book } = require('../models');

const seed = async () => {
  await sequelize.authenticate();
  console.log('DB connected');

  // Example list - replace with real images or OpenLibrary covers
  const updates = [
    { title: 'Atomic Habits', coverUrl: 'https://placehold.co/160x240?text=Atomic+Habits', genre: 'Self-Help' },
    { title: 'Rich Dad Poor Dad', coverUrl: 'https://placehold.co/160x240?text=Rich+Dad', genre: 'Finance' },
    { title: 'The Alchemist', coverUrl: 'https://placehold.co/160x240?text=The+Alchemist', genre: 'Fiction' },
  ];

  for (const u of updates) {
    const book = await Book.findOne({ where: { title: u.title } });
    if (book) {
      await book.update({ coverUrl: u.coverUrl, genre: u.genre });
      console.log('Updated', book.title);
    } else {
      console.log('Not found', u.title);
    }
  }

  console.log('Done');
  process.exit(0);
};

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
