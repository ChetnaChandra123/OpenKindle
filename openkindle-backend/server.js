require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { sequelize } = require('./models'); // this assumes models/index.js exports sequelize

// routes
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
const purchaseRoutes = require('./routes/purchases'); // add this line(Step-3 API TESTING PURPOSE)
const activityRoutes = require("./routes/activities");

const app = express();

// global middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

// main API routes
app.use('/api/auth', authRoutes); // where the data is coming from
app.use('/api/books', bookRoutes);
app.use('/api/purchases', purchaseRoutes); // and this line(Step-3 API TESTING PURPOSE)
app.use("/api/activities", activityRoutes);

// test route
app.get('/', (_, res) => res.send('📚 OpenKindle API running successfully!'));

const PORT = process.env.PORT || 5000;

// 🟢 Connect DB first, then start the server
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected!');

    await sequelize.sync({ alter: true }); // automatically create/update tables
    console.log('📘 All models synced successfully!');

    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  } catch (err) {
    console.error('❌ Database connection failed:', err);
  }
})();
