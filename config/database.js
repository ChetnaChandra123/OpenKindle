// config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Create a new Sequelize instance to connect to PostgreSQL
const sequelize = new Sequelize(
  process.env.DB_NAME,      // <-- Name of your PostgreSQL database
  process.env.DB_USER,      // <-- Your PostgreSQL username
  process.env.DB_PASSWORD,  // <-- Your PostgreSQL password
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432,
    logging: false, // Set to true if you want SQL logs
  }
);

// Test the connection
sequelize.authenticate()
  .then(() => console.log('✅ Database connected successfully'))
  .catch(err => console.error('❌ Database connection failed:', err));

module.exports = sequelize;
