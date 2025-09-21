import express from "express";
import {
  getAllVisas,
  getVisaById,
  searchVisas,
} from "../controllers/visaController";

const router = express.Router();

// GET /api/visas - Get all visas
router.get("/", getAllVisas);

// GET /api/visas/search - Search visas
router.get("/search", searchVisas);

// GET /api/visas/:id - Get visa by ID
router.get("/:id", getVisaById);

export default router;