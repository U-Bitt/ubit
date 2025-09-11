import { Router } from "express";
import {
  register,
  login,
  getMe,
  updateProfile,
  changePassword,
  logout,
} from "@/controllers/authController";
import { authenticateToken } from "@/middleware/auth";
import {
  validate,
  validateEmail,
  validatePassword,
  validateName,
} from "@/middleware/validation";

const router = Router();

// @route   POST /api/auth/register
// @desc    Register user
// @access  Public
router.post(
  "/register",
  validate([
    validateName("firstName"),
    validateName("lastName"),
    validateEmail(),
    validatePassword(),
    body("phone").optional().isMobilePhone("any"),
    body("dateOfBirth").optional().isISO8601(),
    body("nationality").optional().trim().isLength({ min: 2, max: 50 }),
  ]),
  register
);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post(
  "/login",
  validate([
    validateEmail(),
    body("password").notEmpty().withMessage("Password is required"),
  ]),
  login
);

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get("/me", authenticateToken, getMe);

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put(
  "/profile",
  authenticateToken,
  validate([
    validateName("firstName").optional(),
    validateName("lastName").optional(),
    body("phone").optional().isMobilePhone("any"),
    body("dateOfBirth").optional().isISO8601(),
    body("nationality").optional().trim().isLength({ min: 2, max: 50 }),
    body("preferences").optional().isObject(),
  ]),
  updateProfile
);

// @route   PUT /api/auth/change-password
// @desc    Change password
// @access  Private
router.put(
  "/change-password",
  authenticateToken,
  validate([
    body("currentPassword")
      .notEmpty()
      .withMessage("Current password is required"),
    validatePassword(),
  ]),
  changePassword
);

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post("/logout", authenticateToken, logout);

export default router;
