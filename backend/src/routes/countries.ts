import express from "express";
import {
  getAllCountries,
  getCountryById,
  searchCountries,
} from "../controllers/countryController";

const router = express.Router();

// GET /api/countries - Get all countries
router.get("/", getAllCountries);

// GET /api/countries/search - Search countries
router.get("/search", searchCountries);

// GET /api/countries/:id - Get country by ID
router.get("/:id", getCountryById);

export default router;
