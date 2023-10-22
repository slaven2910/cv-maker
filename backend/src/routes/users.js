const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Generate a JWT for the new user
    const token = jwt.sign({ userId: newUser._id }, 'your-secret-key', {
      expiresIn: '1h',
    });

    res.status(201).json({ message: 'User registered', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
