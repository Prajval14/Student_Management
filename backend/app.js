// Date : Nov 24, 2024
// Created By : Prajval  Patel - C0911611

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const studentService = require('./services/studentService');
const courseService = require('./services/courseService');

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable cross-origin requests

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/studentApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB:', err));

// Routes
app.use('/students', studentService);
app.use('/courses', courseService);

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});