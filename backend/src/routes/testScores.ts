import express from "express";
import { testScoreController } from "../controllers/testScoreController";

const router = express.Router();

// Test Scores routes
router.get("/", testScoreController.getAllTestScores);
router.post("/", testScoreController.createTestScore);
router.put("/:id", testScoreController.updateTestScore);
router.delete("/:id", testScoreController.deleteTestScore);

export default router;

