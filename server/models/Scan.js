import mongoose from 'mongoose';

// This schema defines how each scan is saved in MongoDB
const scanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  extractedText: {
    type: String,
    required: true,
  },
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

export default mongoose.model('Scan', scanSchema);

