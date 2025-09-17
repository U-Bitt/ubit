import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    // Check if MONGODB_URI is provided
    if (!process.env.MONGODB_URI) {
      console.error("❌ MONGODB_URI environment variable is not set");
      console.log("💡 Please create a .env file with MONGODB_URI=your_mongodb_connection_string");
      console.log("💡 For local development, use: MONGODB_URI=mongodb://localhost:27017/ubit-education");
      process.exit(1);
    }

    const mongoURI = process.env.MONGODB_URI;
    console.log("🔌 Attempting to connect to MongoDB...");

    const conn = await mongoose.connect(mongoURI, {
      // Add connection options for better reliability
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log(`📊 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ Database connection error:", error);
    console.log("💡 Make sure MongoDB is running and the connection string is correct");
    console.log("💡 For local MongoDB: mongodb://localhost:27017/ubit-education");
    console.log("💡 For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/database");
    process.exit(1);
  }
};

// Handle connection events
mongoose.connection.on("connected", () => {
  console.log("🔗 Mongoose connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("🔌 Mongoose disconnected from MongoDB");
});

// Graceful shutdown
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("🔌 MongoDB connection closed through app termination");
  process.exit(0);
});

export default connectDB;
