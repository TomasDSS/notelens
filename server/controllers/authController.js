// Import bcryptjs instead of bcrypt
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Use environment variable for secret or fallback
const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

// Register controller
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    // Hash password using bcryptjs
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });

    // Sign JWT token
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '2h' });

    // Send response with token and user info
    res.status(201).json({ token, user: { email: newUser.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Login controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate new token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '2h' });

    // Send response
    res.status(200).json({ token, user: { email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

