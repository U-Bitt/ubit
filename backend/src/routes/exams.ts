import express from "express";
import {
  getAllExams,
  getExamById,
  getExamsByType,
} from "../controllers/examController";

const router = express.Router();

// GET /api/exams - Get all exams
router.get("/", getAllExams);

// GET /api/exams/type/:type - Get exams by type
router.get("/type/:type", getExamsByType);

// GET /api/exams/:id - Get exam by ID
router.get("/:id", getExamById);

export default router;
