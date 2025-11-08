// models/activity.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Activity = sequelize.define('Activity', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    action: {
      type: DataTypes.STRING, // e.g., "viewed_book", "purchased_book"
      allowNull: false,
    },
    details: {
      type: DataTypes.JSONB, // store extra info like { bookId: 1, title: "The Silent Patient" }
      allowNull: true,
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  return Activity;
};
