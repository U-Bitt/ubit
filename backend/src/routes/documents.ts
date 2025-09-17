import express from "express";
import { documentController } from "../controllers/documentController";

const router = express.Router();

// Documents routes
router.get("/", documentController.getAllDocuments);
router.post("/", documentController.createDocument);
router.put("/:id", documentController.updateDocument);
router.delete("/:id", documentController.deleteDocument);

export default router;

