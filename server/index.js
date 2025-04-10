// ================== IMPORTS ==================
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// 🔐 Routes
import authRoutes from './routes/auth.js';
import scanRoutes from './routes/scan.js';

// ================== CONFIG ==================
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Needed to use __dirname in ES Modules (like import/export)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ================== MIDDLEWARE ==================
// Allow cross-origin requests (so frontend can talk to backend)
app.use(cors());

// Parse JSON body data
app.use(express.json());

// Allow form data (like file uploads)
app.use(express.urlencoded({ extended: true }));

// ================== ROUTES ==================
// Auth routes: login & register
app.use('/api/auth', authRoutes);

// OCR scan route (upload image, extract text)
app.use('/api/scan', scanRoutes);

// Base route (just for testing)
app.get('/', (req, res) => {
  res.send('NoteLens API is running!');
});

// ================== DATABASE CONNECTION ==================
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
