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
      bookId: {                      // ✅ add this line
      type: DataTypes.INTEGER,
      allowNull: true,  // optional, since not all activities involve books
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

    // 🔗 Associations
  Activity.associate = (models) => {
    Activity.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
    Activity.belongsTo(models.Book, {
      foreignKey: "bookId",
      onDelete: "SET NULL",
    });
  };

  return Activity;
};
