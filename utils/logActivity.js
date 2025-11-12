// utils/logActivity.js
const { Activity } = require('../models');

async function logActivity({ userId, action, bookId = null, details = {} }) {
  try {
    await Activity.create({
      userId,
      action,
      bookId,
      details,
    });
    console.log(`✅ Activity logged: ${action} by user ${userId}`);
  } catch (error) {
    console.error("❌ Error logging activity:", error.message);
  }
}

module.exports = logActivity;
