const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Purchase extends Model {}

  Purchase.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      purchaseDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Purchase',
      tableName: 'purchases',
      timestamps: true,
    }
  );

  return Purchase;
};
