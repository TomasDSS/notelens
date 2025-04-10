import express from 'express';
import multer from 'multer';
import { scanImage } from '../controllers/scanController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import Scan from '../models/Scan.js';

const router = express.Router();

// Save uploaded images to the 'uploads/' folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// POST: scan and extract text
router.post('/', authenticateToken, upload.single('image'), scanImage);

// GET: retrieve scan history
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const scans = await Scan.find({ user: userId }).sort({ createdAt: -1 });
    res.json({ scans });
  } catch (err) {
    console.error('Error fetching scan history:', err);
    res.status(500).json({ message: 'Failed to fetch scan history' });
  }
});

export default router;
