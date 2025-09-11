import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export const config = {
  // Server configuration
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",

  // Database configuration
  mongodb: {
    uri: process.env.MONGODB_URI || "mongodb://localhost:27017/ubit",
    testUri:
      process.env.MONGODB_TEST_URI || "mongodb://localhost:27017/ubit_test",
  },

  // JWT configuration
  jwt: {
    secret: process.env.JWT_SECRET || "fallback-secret-key",
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "30d",
  },

  // CORS configuration
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  },

  // Rate limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000"),
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "100"),
  },

  // Email configuration
  email: {
    smtp: {
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      user: process.env.SMTP_USER || "",
      pass: process.env.SMTP_PASS || "",
    },
  },

  // File upload
  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE || "5242880"), // 5MB
    uploadPath: process.env.UPLOAD_PATH || "uploads/",
  },

  // API Keys
  apiKeys: {
    googleMaps: process.env.GOOGLE_MAPS_API_KEY || "",
    paymentGateway: process.env.PAYMENT_GATEWAY_KEY || "",
  },

  // Redis (optional)
  redis: {
    url: process.env.REDIS_URL || "redis://localhost:6379",
  },

  // Logging
  logging: {
    level: process.env.LOG_LEVEL || "info",
  },
};

export default config;
