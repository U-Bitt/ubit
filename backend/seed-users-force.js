const mongoose = require('mongoose');
require('dotenv').config();

// Import the user model and seed data
const { seedUsersForce } = require('./dist/utils/userSeedData');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ubit');
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Main function
const main = async () => {
  try {
    await connectDB();
    await seedUsersForce();
    console.log('🎉 User force seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error force seeding users:', error);
    process.exit(1);
  }
};

main();