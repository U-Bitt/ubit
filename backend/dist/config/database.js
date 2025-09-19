"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            console.error("❌ MONGODB_URI environment variable is not set");
            console.log("💡 Please create a .env file with MONGODB_URI=your_mongodb_connection_string");
            console.log("💡 For local development, use: MONGODB_URI=mongodb://localhost:27017/ubit-education");
            process.exit(1);
        }
        const mongoURI = process.env.MONGODB_URI;
        console.log("🔌 Attempting to connect to MongoDB...");
        const conn = await mongoose_1.default.connect(mongoURI, {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log(`📊 MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.error("❌ Database connection error:", error);
        console.log("💡 Make sure MongoDB is running and the connection string is correct");
        console.log("💡 For local MongoDB: mongodb://localhost:27017/ubit-education");
        console.log("💡 For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/database");
        process.exit(1);
    }
};
mongoose_1.default.connection.on("connected", () => {
    console.log("🔗 Mongoose connected to MongoDB");
});
mongoose_1.default.connection.on("error", (err) => {
    console.error("❌ Mongoose connection error:", err);
});
mongoose_1.default.connection.on("disconnected", () => {
    console.log("🔌 Mongoose disconnected from MongoDB");
});
process.on("SIGINT", async () => {
    await mongoose_1.default.connection.close();
    console.log("🔌 MongoDB connection closed through app termination");
    process.exit(0);
});
exports.default = connectDB;
//# sourceMappingURL=database.js.map