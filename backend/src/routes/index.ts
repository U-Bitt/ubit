import { Router } from "express";
import authRoutes from "./auth";
import universityRoutes from "./universities";
import examRoutes from "./exams";
import packageRoutes from "./packages";

const router = Router();

// Health check
router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "API is running",
    timestamp: new Date().toISOString(),
  });
});

// API routes
router.use("/auth", authRoutes);
router.use("/universities", universityRoutes);
router.use("/exams", examRoutes);
router.use("/packages", packageRoutes);

export default router;
