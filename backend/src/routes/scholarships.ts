import express from "express";
import {
  getAllScholarships,
  getScholarshipById,
  searchScholarships,
} from "../controllers/scholarshipController";

const router = express.Router();

// GET /api/scholarships - Get all scholarships
router.get("/", getAllScholarships);

// GET /api/scholarships/search - Search scholarships
router.get("/search", searchScholarships);

// GET /api/scholarships/:id - Get scholarship by ID
router.get("/:id", getScholarshipById);

export default router;