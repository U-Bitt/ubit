import express from "express";
import { suggestUniversities } from "../controllers/aiController";

const router = express.Router();

// AI suggestion routes
router.post("/suggest", suggestUniversities);

export default router;
