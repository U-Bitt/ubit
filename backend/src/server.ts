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
import visaRoutes from "./routes/visas";
import aiRoutes from "./routes/ai";

// Import middleware
import { errorHandler } from "./middleware/errorHandler";
import { notFound } from "./middleware/notFound";

// Import database connection
import connectDB from "./config/database";

// Load environment variables
dotenv.config();

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Don't exit the process, just log the error
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Connect to database
const initializeDatabase = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  }
};

initializeDatabase();

const app = express();
const PORT = process.env.PORT || 5001;

// Security middleware
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
    crossOriginResourcePolicy: false,
    frameguard: false,
  })
);

// CORS configuration
console.log(process.env.CORS_ORIGIN, "https://frontend-kv7i3wt0r-tugstuguldurs-projects.vercel.app");

// Handle preflight requests
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, x-user-id');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.status(200).end();
});

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      const allowedOrigins = [
        process.env.CORS_ORIGIN || "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3000",
        "https://frontend-tau-ten-36.vercel.app",
        "https://frontend-kv7i3wt0r-tugstuguldurs-projects.vercel.app",
      ];
      
      // Check if origin is allowed or is a Vercel preview deployment
      if (allowedOrigins.includes(origin) || origin.includes('.vercel.app')) {
        return callback(null, true);
      }
      
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "x-user-id"],
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

// Static file serving for uploaded documents with CORS headers
app.use(
  "/uploads",
  (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  },
  express.static("uploads")
);

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
app.use("/api/visas", visaRoutes);
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
