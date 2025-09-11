import { Router } from "express";
import {
  getPackages,
  getPackage,
  createPackage,
  updatePackage,
  deletePackage,
  getFeaturedPackages,
} from "@/controllers/packageController";
import { authenticateToken, requireRole } from "@/middleware/auth";
import {
  validate,
  validateObjectId,
  validatePagination,
  validateSearch,
} from "@/middleware/validation";
import { body } from "express-validator";

const router = Router();

// @route   GET /api/packages
// @desc    Get all packages
// @access  Public
router.get(
  "/",
  validate([
    ...validatePagination(),
    validateSearch(),
    body("minPrice").optional().isNumeric(),
    body("maxPrice").optional().isNumeric(),
  ]),
  getPackages
);

// @route   GET /api/packages/featured
// @desc    Get featured packages
// @access  Public
router.get("/featured", getFeaturedPackages);

// @route   GET /api/packages/:id
// @desc    Get single package
// @access  Public
router.get("/:id", validate([validateObjectId()]), getPackage);

// @route   POST /api/packages
// @desc    Create package
// @access  Private/Admin
router.post(
  "/",
  authenticateToken,
  requireRole(["admin"]),
  validate([
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("Description is required"),
    body("price").isNumeric().withMessage("Price is required"),
    body("currency")
      .isLength({ min: 3, max: 3 })
      .withMessage("Currency must be 3 characters"),
    body("duration")
      .isInt({ min: 1 })
      .withMessage("Duration must be at least 1 month"),
    body("features").isArray().withMessage("Features must be an array"),
    body("includes.universities").optional().isArray(),
    body("includes.exams").optional().isArray(),
    body("includes.consultations").optional().isInt({ min: 0 }),
    body("includes.documents").optional().isArray(),
  ]),
  createPackage
);

// @route   PUT /api/packages/:id
// @desc    Update package
// @access  Private/Admin
router.put(
  "/:id",
  authenticateToken,
  requireRole(["admin"]),
  validate([
    validateObjectId(),
    body("name").optional().trim().notEmpty(),
    body("description").optional().trim().notEmpty(),
    body("price").optional().isNumeric(),
    body("currency").optional().isLength({ min: 3, max: 3 }),
    body("duration").optional().isInt({ min: 1 }),
    body("features").optional().isArray(),
    body("includes.universities").optional().isArray(),
    body("includes.exams").optional().isArray(),
    body("includes.consultations").optional().isInt({ min: 0 }),
    body("includes.documents").optional().isArray(),
  ]),
  updatePackage
);

// @route   DELETE /api/packages/:id
// @desc    Delete package
// @access  Private/Admin
router.delete(
  "/:id",
  authenticateToken,
  requireRole(["admin"]),
  validate([validateObjectId()]),
  deletePackage
);

export default router;
