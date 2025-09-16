import express from "express";
import {
  getAllUniversities,
  getUniversityById,
  searchUniversities,
  createUniversity,
  updateUniversity,
  deleteUniversity,
} from "../controllers/universityController";

const router = express.Router();

// GET /api/universities - Get all universities
router.get("/", getAllUniversities);

// GET /api/universities/search - Search universities
router.get("/search", searchUniversities);

// GET /api/universities/:id - Get university by ID
router.get("/:id", getUniversityById);

// POST /api/universities - Create new university (admin only)
router.post("/", createUniversity);

// PUT /api/universities/:id - Update university (admin only)
router.put("/:id", updateUniversity);

// DELETE /api/universities/:id - Delete university (admin only)
router.delete("/:id", deleteUniversity);

export default router;
