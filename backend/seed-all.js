const mongoose = require('mongoose');
require('dotenv').config();

// Import the seed functions
const { seedUsers } = require('./dist/utils/userSeedData');
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
    
    console.log('🌱 Starting database seeding...');
    
    // Seed users
    console.log('👥 Seeding users...');
    await seedUsers();
    
    // Seed visas
    console.log('🛂 Seeding visas...');
    await seedVisas();
    
    console.log('🎉 All seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  }
};

main();