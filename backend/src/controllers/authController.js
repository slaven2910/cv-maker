const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Add this line to import the JWT library

// Rest of your code


exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already in use.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error('Registration failed:', error);
    res.status(500).json({ message: 'Registration failed.' });
  }
};

exports.login = async (req, res) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password.' });
    }

      // Generate a JSON Web Token (JWT) for authentication
    const token = jwt.sign({ userId: user._id, username: user.username }, secretKey, {
      expiresIn: '1h', // Adjust the expiration time as needed
    });


    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ message: 'Login failed.' });
  }
};
