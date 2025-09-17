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

// Import middleware
import { errorHandler } from "./middleware/errorHandler";
import { notFound } from "./middleware/notFound";

// Import database connection
import connectDB from "./config/database";
import { seedUniversities } from "./utils/seedData";

// Load environment variables
dotenv.config();

// Connect to database and seed data
const initializeDatabase = async () => {
  await connectDB();
  await seedUniversities();
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
    status: "OK",
    message: "Ubit Education API is running",
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use("/api/universities", universityRoutes);
app.use("/api/countries", countryRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/user", userRoutes);
app.use("/api/test-scores", testScoreRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/scholarships", scholarshipRoutes);

// 404 handler
app.use(notFound);

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📚 Ubit Education API is ready!`);
  console.log(`🌐 Health check: http://localhost:${PORT}/health`);
});

export default app;
