import express from "express";
import {
  getAllScholarships,
  getScholarshipById,
  getScholarshipsByUniversity,
  searchScholarships,
  createScholarship,
  deleteScholarship,
} from "../controllers/scholarshipController";

const router = express.Router();

// GET /api/scholarships - Get all scholarships
router.get("/", getAllScholarships);

// POST /api/scholarships - Create new scholarship
router.post("/", createScholarship);

// GET /api/scholarships/search - Search scholarships
router.get("/search", searchScholarships);

// GET /api/scholarships/university/:universityName - Get scholarships by university
router.get("/university/:universityName", getScholarshipsByUniversity);

// GET /api/scholarships/:id - Get scholarship by ID
router.get("/:id", getScholarshipById);

// DELETE /api/scholarships/:id - Delete scholarship by ID
router.delete("/:id", deleteScholarship);

export default router;
