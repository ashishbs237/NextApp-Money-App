import mongoose from 'mongoose';

const MONGODB_URI = process.env.NEXT_APP_MONGODB_URI || 'mongodb://127.0.0.1:27017/moneymap';

export default async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: 'moneymap',
    });
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    throw err;
  }
}
