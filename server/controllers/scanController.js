import tesseract from 'tesseract.js';
import path from 'path';
import fs from 'fs';
import Scan from '../models/Scan.js'; // ✅ Import the Scan model

// This function runs when the user uploads an image to scan
export const scanImage = async (req, res) => {
  try {
    // req.file comes from multer middleware — it contains the uploaded image
    const imagePath = req.file.path;

    // Run OCR (text reading) on the image using Tesseract.js
    const { data: { text } } = await tesseract.recognize(imagePath, 'eng');

    // ✅ Save the scan in the database
    await Scan.create({
      user: req.user.id, // we get this from JWT middleware
      extractedText: text.trim(),
    });

    // Optional: Delete the uploaded image file after scanning to save space
    fs.unlinkSync(imagePath);

    // Return the extracted text to the frontend
    res.json({ success: true, extractedText: text.trim() });

  } catch (err) {
    console.error('OCR Error:', err);
    res.status(500).json({ success: false, message: 'Failed to scan image' });
  }
};

