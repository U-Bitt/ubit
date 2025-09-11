import { Router } from "express";
import {
  getUniversities,
  getUniversity,
  createUniversity,
  updateUniversity,
  deleteUniversity,
  searchUniversities,
} from "@/controllers/universityController";
import { authenticateToken, requireRole } from "@/middleware/auth";
import {
  validate,
  validateObjectId,
  validatePagination,
  validateSearch,
} from "@/middleware/validation";
import { body } from "express-validator";

const router = Router();

// @route   GET /api/universities
// @desc    Get all universities
// @access  Public
router.get(
  "/",
  validate([
    ...validatePagination(),
    validateSearch(),
    body("country").optional().trim(),
    body("sort").optional().isIn(["name", "ranking", "tuition"]),
  ]),
  getUniversities
);

// @route   GET /api/universities/search
// @desc    Search universities
// @access  Public
router.get(
  "/search",
  validate([
    body("q").optional().trim(),
    body("country").optional().trim(),
    body("minTuition").optional().isNumeric(),
    body("maxTuition").optional().isNumeric(),
    body("majors").optional().trim(),
  ]),
  searchUniversities
);

// @route   GET /api/universities/:id
// @desc    Get single university
// @access  Public
router.get("/:id", validate([validateObjectId()]), getUniversity);

// @route   POST /api/universities
// @desc    Create university
// @access  Private/Admin
router.post(
  "/",
  authenticateToken,
  requireRole(["admin"]),
  validate([
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("country").trim().notEmpty().withMessage("Country is required"),
    body("city").trim().notEmpty().withMessage("City is required"),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("Description is required"),
    body("website").isURL().withMessage("Valid website URL is required"),
    body("logo").notEmpty().withMessage("Logo is required"),
    body("ranking").optional().isNumeric(),
    body("tuitionFee.undergraduate")
      .isNumeric()
      .withMessage("Undergraduate tuition fee is required"),
    body("tuitionFee.graduate")
      .isNumeric()
      .withMessage("Graduate tuition fee is required"),
    body("tuitionFee.currency")
      .isLength({ min: 3, max: 3 })
      .withMessage("Currency must be 3 characters"),
    body("requirements.ielts").optional().isFloat({ min: 0, max: 9 }),
    body("requirements.toefl").optional().isFloat({ min: 0, max: 120 }),
    body("requirements.gpa").optional().isFloat({ min: 0, max: 4 }),
    body("requirements.sat").optional().isInt({ min: 400, max: 1600 }),
    body("requirements.gre").optional().isInt({ min: 260, max: 340 }),
    body("majors").optional().isArray(),
  ]),
  createUniversity
);

// @route   PUT /api/universities/:id
// @desc    Update university
// @access  Private/Admin
router.put(
  "/:id",
  authenticateToken,
  requireRole(["admin"]),
  validate([
    validateObjectId(),
    body("name").optional().trim().notEmpty(),
    body("country").optional().trim().notEmpty(),
    body("city").optional().trim().notEmpty(),
    body("description").optional().trim().notEmpty(),
    body("website").optional().isURL(),
    body("ranking").optional().isNumeric(),
    body("tuitionFee.undergraduate").optional().isNumeric(),
    body("tuitionFee.graduate").optional().isNumeric(),
    body("tuitionFee.currency").optional().isLength({ min: 3, max: 3 }),
    body("requirements.ielts").optional().isFloat({ min: 0, max: 9 }),
    body("requirements.toefl").optional().isFloat({ min: 0, max: 120 }),
    body("requirements.gpa").optional().isFloat({ min: 0, max: 4 }),
    body("requirements.sat").optional().isInt({ min: 400, max: 1600 }),
    body("requirements.gre").optional().isInt({ min: 260, max: 340 }),
    body("majors").optional().isArray(),
  ]),
  updateUniversity
);

// @route   DELETE /api/universities/:id
// @desc    Delete university
// @access  Private/Admin
router.delete(
  "/:id",
  authenticateToken,
  requireRole(["admin"]),
  validate([validateObjectId()]),
  deleteUniversity
);

export default router;
