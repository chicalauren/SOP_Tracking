import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;

async function seedAdmin() {
  await mongoose.connect(MONGO_URI);

  const email = 'admin@company.com';
  const password = 'adminLife';
  const role = 'Administrator';

  // Check if admin already exists
  const existing = await User.findOne({ email });
  if (existing) {
    console.log('Admin user already exists.');
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    email,
    password: hashedPassword,
    role,
  });

  console.log('Admin user created!');
  process.exit(0);
}

seedAdmin().catch(err => {
  console.error(err);
  process.exit(1);
});