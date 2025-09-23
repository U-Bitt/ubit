const mongoose = require('mongoose');
require('dotenv').config();

// Import the seed functions
const { seedUsersForce } = require('./dist/utils/userSeedData');
const { seedVisas } = require('./dist/utils/visaSeedData');

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
    
    console.log('🌱 Starting FORCE database seeding...');
    console.log('⚠️  WARNING: This will delete ALL existing users!');
    
    // Force seed users (this will delete all existing users)
    console.log('👥 Force seeding users...');
    await seedUsersForce();
    
    // Seed visas
    console.log('🛂 Seeding visas...');
    await seedVisas();
    
    console.log('🎉 All force seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during force seeding:', error);
    process.exit(1);
  }
};

main();