import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUserById,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  getUserApplications,
  createApplication,
  updateApplication,
  deleteApplication,
  getTestScores,
  addTestScore,
  updateTestScore,
  deleteTestScore,
  getDocuments,
  addDocument,
  updateDocument,
  deleteDocument,
  getSavedUniversities,
  saveUniversity,
  unsaveUniversity,
  updatePersonalInfo,
  updateAcademicInfo,
  updateAreasOfInterest,
} from "../controllers/userController";

const router = express.Router();

// Authentication routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Profile data routes (must come before parameterized routes)
router.put("/personal-info", updatePersonalInfo); // Update personal information
router.put("/academic-info", updateAcademicInfo); // Update academic information
router.put("/areas-of-interest", updateAreasOfInterest); // Update areas of interest

// User management routes
router.get("/", getAllUsers); // Get all users (admin)
router.get("/:id", getUserById); // Get user by ID
router.put("/:id", updateUserById); // Update user by ID
router.delete("/:id", deleteUser); // Delete user

// Profile routes
router.get("/profile/me", getUserProfile); // Get current user profile
router.put("/profile/me", updateUserProfile); // Update current user profile

// Application routes
router.get("/applications/me", getUserApplications); // Get user applications
router.post("/applications", createApplication); // Create new application
router.put("/applications/:appId", updateApplication); // Update application
router.delete("/applications/:appId", deleteApplication); // Delete application

// Test Scores routes
router.get("/test-scores/me", getTestScores); // Get user test scores
router.post("/test-scores", addTestScore); // Add test score
router.put("/test-scores/:testId", updateTestScore); // Update test score
router.delete("/test-scores/:testId", deleteTestScore); // Delete test score

// Documents routes
router.get("/documents/me", getDocuments); // Get user documents
router.post("/documents", addDocument); // Add document
router.put("/documents/:docId", updateDocument); // Update document
router.delete("/documents/:docId", deleteDocument); // Delete document

// Saved Universities routes
router.get("/saved-universities/me", getSavedUniversities); // Get saved universities
router.post("/saved-universities", saveUniversity); // Save university
router.delete("/saved-universities/:savedId", unsaveUniversity); // Unsave university

export default router;