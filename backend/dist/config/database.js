"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/ubit-education";
        const conn = await mongoose_1.default.connect(mongoURI);
        console.log(`📊 MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.error("❌ Database connection error:", error);
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