// Set up packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Configure routes
const employeeRoutes = require('./src/routes/employeeRoutes');
const visitorRoutes = require('./src/routes/visitorRoutes');
const adminRoutes = require('./src/routes/adminRoutes');

const app = express();

// Connect to MongoDB
mongoose
  .connect(
    `mongodb+srv://nullnow:${process.env.MONGODB_PWD}@mandilas.ufkcmos.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Start the server
const port = process.env.PORT || 5000;
const message = `Server is running on port ${port}`;
app.listen(port, () => {
  console.log(message);
});

// Use the routes
app.get('/', (req, res) => {
  res.send({ info: 'Welcome to the Visitor Management System' });
});
app.use('/employees', employeeRoutes);
app.use('/visitors', visitorRoutes);
app.use('/admin', adminRoutes);
