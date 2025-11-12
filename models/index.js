const { Sequelize } = require('sequelize');
const UserModel = require('./user');
const BookModel = require('./book');
const PurchaseModel = require('./purchase');
const ActivityModel = require('./activity');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    logging: false,
  }
);

const User = UserModel(sequelize);
const Book = BookModel(sequelize);
const Purchase = PurchaseModel(sequelize);
const Activity = ActivityModel(sequelize);

// 🧠 Relationships
User.hasMany(Book, { foreignKey: 'userId' });
Book.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Purchase, { foreignKey: 'userId' });
Purchase.belongsTo(User, { foreignKey: 'userId' });

Book.hasMany(Purchase, { foreignKey: 'bookId' });
Purchase.belongsTo(Book, { foreignKey: 'bookId' });

User.hasMany(Activity, { foreignKey: 'userId' });
Activity.belongsTo(User, { foreignKey: 'userId' });

Book.hasMany(Activity, { foreignKey: 'bookId' });
Activity.belongsTo(Book, { foreignKey: 'bookId' });

module.exports = { sequelize, User, Book, Purchase, Activity };
