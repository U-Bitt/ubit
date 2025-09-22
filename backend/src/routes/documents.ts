import express from "express";
import {
  getAllDocuments,
  getDocumentById,
  getDocumentVersions,
  uploadDocument,
  updateDocument,
  uploadNewVersion,
  deleteDocument,
  uploadMiddleware,
} from "../controllers/documentController";

const router = express.Router();

// Get all documents for a user
router.get("/user/:userId", getAllDocuments);

// Get document by ID
router.get("/:id", getDocumentById);

// Get document versions
router.get("/:id/versions", getDocumentVersions);

// Upload new document
router.post("/upload/:userId", uploadMiddleware, uploadDocument);

// Upload new version of existing document
router.post("/:id/version", uploadMiddleware, uploadNewVersion);

// Update document
router.put("/:id", updateDocument);

// Delete document
router.delete("/:id", deleteDocument);

export default router;
