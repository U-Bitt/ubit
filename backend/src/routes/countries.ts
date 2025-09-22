import express from "express";
import {
  getAllCountries,
  getCountryById,
  searchCountries,
  createCountry,
  deleteCountry,   // Add this import
} from "../controllers/countryController";

const router = express.Router();

// GET /api/countries - Get all countries
router.get("/", getAllCountries);

// GET /api/countries/search - Search countries
router.get("/search", searchCountries);

// GET /api/countries/:id - Get country by ID
router.get("/:id", getCountryById);

// POST /api/countries - Create new country (admin only)
router.post("/", createCountry);  // Add this line
router.delete("/:id", deleteCountry);  // Add this line


export default router;