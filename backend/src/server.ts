import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

// Import routes
import universityRoutes from "./routes/universities";
import countryRoutes from "./routes/countries";
import examRoutes from "./routes/exams";
import userRoutes from "./routes/users";
import testScoreRoutes from "./routes/testScores";
import documentRoutes from "./routes/documents";
import scholarshipRoutes from "./routes/scholarships";
import aiRoutes from "./routes/ai";

// Import middleware
import { errorHandler } from "./middleware/errorHandler";
import { notFound } from "./middleware/notFound";

// Import database connection
import connectDB from "./config/database";

// Load environment variables
dotenv.config();

// Connect to database
const initializeDatabase = async () => {
  await connectDB();
};

initializeDatabase();

const app = express();
const PORT = process.env.PORT || 5001;

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000"), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "100"), // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// Logging middleware
app.use(morgan("combined"));

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use("/api/universities", universityRoutes);
app.use("/api/countries", countryRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/users", userRoutes);
app.use("/api/test-scores", testScoreRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/scholarships", scholarshipRoutes);
app.use("/api/ai", aiRoutes);

// 404 handler
app.use(notFound);

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🌐 API Base URL: http://localhost:${PORT}/api`);
});

export default app;