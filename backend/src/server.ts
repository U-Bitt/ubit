import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = parseInt(process.env["PORT"] ?? "5000", 10);
const CORS_ORIGIN = process.env["CORS_ORIGIN"] ?? "http://localhost:3000";

app.use(helmet());
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());

const limiter = rateLimit({
  windowMs: parseInt(process.env["RATE_LIMIT_WINDOW_MS"] ?? "900000", 10),
  max: parseInt(process.env["RATE_LIMIT_MAX_REQUESTS"] ?? "100", 10),
});
app.use(limiter);

app.use(morgan(process.env["NODE_ENV"] === "development" ? "dev" : "combined"));

// Health
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "OK", now: new Date().toISOString() });
});

// --- Minimal mock endpoints to serve frontend ---
app.get("/api/universities", (_req, res) => res.json([]));
app.get("/api/universities/:id", (_req, res) => res.status(404).json({ message: "Not found" }));
app.get("/api/universities/search", (_req, res) => res.json([]));

app.get("/api/countries", (_req, res) => res.json([]));
app.get("/api/countries/:id", (_req, res) => res.status(404).json({ message: "Not found" }));
app.get("/api/countries/search", (_req, res) => res.json([]));

app.get("/api/exams", (_req, res) => res.json([]));
app.get("/api/exams/:id", (_req, res) => res.status(404).json({ message: "Not found" }));
app.get("/api/exams/type/:type", (_req, res) => res.json([]));

app.get("/api/user/profile", (_req, res) => res.json({ name: "Guest" }));
app.put("/api/user/profile", (req, res) => res.json({ ...req.body }));
app.get("/api/user/applications", (_req, res) => res.json([]));
app.post("/api/user/applications", (req, res) => res.status(201).json({ id: "a1", ...req.body }));

app.get("/api/recommendations/universities", (_req, res) => res.json([]));
app.get("/api/recommendations/programs", (_req, res) => res.json([]));
app.get("/api/recommendations/scholarships", (_req, res) => res.json([]));

app.listen(PORT, () => {
  console.log(`🚀 API on http://localhost:${PORT}/api`);
  console.log(`🔎 Health: http://localhost:${PORT}/health`);
});

export default app;

