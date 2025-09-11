import { Router } from "express";
import {
  getExams,
  getExam,
  createExam,
  updateExam,
  deleteExam,
  getExamTypes,
} from "@/controllers/examController";
import { authenticateToken, requireRole } from "@/middleware/auth";
import {
  validate,
  validateObjectId,
  validatePagination,
  validateSearch,
} from "@/middleware/validation";
import { body } from "express-validator";

const router = Router();

// @route   GET /api/exams
// @desc    Get all exams
// @access  Public
router.get(
  "/",
  validate([
    ...validatePagination(),
    validateSearch(),
    body("type")
      .optional()
      .isIn(["ielts", "toefl", "sat", "gre", "gmat", "other"]),
  ]),
  getExams
);

// @route   GET /api/exams/types
// @desc    Get exam types
// @access  Public
router.get("/types", getExamTypes);

// @route   GET /api/exams/:id
// @desc    Get single exam
// @access  Public
router.get("/:id", validate([validateObjectId()]), getExam);

// @route   POST /api/exams
// @desc    Create exam
// @access  Private/Admin
router.post(
  "/",
  authenticateToken,
  requireRole(["admin"]),
  validate([
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("type")
      .isIn(["ielts", "toefl", "sat", "gre", "gmat", "other"])
      .withMessage("Valid exam type is required"),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("Description is required"),
    body("sections").isArray().withMessage("Sections must be an array"),
    body("sections.*.name")
      .trim()
      .notEmpty()
      .withMessage("Section name is required"),
    body("sections.*.duration")
      .isInt({ min: 1 })
      .withMessage("Duration must be at least 1 minute"),
    body("sections.*.questions")
      .isInt({ min: 1 })
      .withMessage("Must have at least 1 question"),
    body("sections.*.maxScore")
      .isNumeric()
      .withMessage("Max score is required"),
    body("totalDuration")
      .isInt({ min: 1 })
      .withMessage("Total duration must be at least 1 minute"),
    body("maxScore").isNumeric().withMessage("Max score is required"),
    body("validity")
      .isInt({ min: 1 })
      .withMessage("Validity must be at least 1 month"),
    body("cost").isNumeric().withMessage("Cost is required"),
    body("currency")
      .isLength({ min: 3, max: 3 })
      .withMessage("Currency must be 3 characters"),
  ]),
  createExam
);

// @route   PUT /api/exams/:id
// @desc    Update exam
// @access  Private/Admin
router.put(
  "/:id",
  authenticateToken,
  requireRole(["admin"]),
  validate([
    validateObjectId(),
    body("name").optional().trim().notEmpty(),
    body("type")
      .optional()
      .isIn(["ielts", "toefl", "sat", "gre", "gmat", "other"]),
    body("description").optional().trim().notEmpty(),
    body("sections").optional().isArray(),
    body("totalDuration").optional().isInt({ min: 1 }),
    body("maxScore").optional().isNumeric(),
    body("validity").optional().isInt({ min: 1 }),
    body("cost").optional().isNumeric(),
    body("currency").optional().isLength({ min: 3, max: 3 }),
  ]),
  updateExam
);

// @route   DELETE /api/exams/:id
// @desc    Delete exam
// @access  Private/Admin
router.delete(
  "/:id",
  authenticateToken,
  requireRole(["admin"]),
  validate([validateObjectId()]),
  deleteExam
);

export default router;
