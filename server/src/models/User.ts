import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['User','Reporter','Auditor','Administrator'],
    default: 'user',
    required: true,
  }
});

export default mongoose.model('User', userSchema);
