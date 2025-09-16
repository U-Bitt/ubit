import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  getUserApplications,
  createApplication,
} from "../controllers/userController";

const router = express.Router();

// GET /api/user/profile - Get user profile
router.get("/profile", getUserProfile);

// PUT /api/user/profile - Update user profile
router.put("/profile", updateUserProfile);

// GET /api/user/applications - Get user applications
router.get("/applications", getUserApplications);

// POST /api/user/applications - Create new application
router.post("/applications", createApplication);

export default router;
