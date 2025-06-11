import mongoose from 'mongoose';

const sopSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    version: { type: String, required: true },
    category: { type: String },
    fileUrl: { type: String },
    owner: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Sop', sopSchema);
