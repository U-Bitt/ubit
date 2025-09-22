import { Request, Response, NextFunction } from "express";
import { Country, ApiResponse, SearchQuery } from "../types";
import CountryModel from "../models/Country";

// Get all countries
export const getAllCountries = async (
  req: Request<{}, ApiResponse<Country[]>, {}, SearchQuery>,
  res: Response<ApiResponse<Country[]>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { sort = "name", order = "asc" } = req.query;

    // Build sort object for MongoDB
    const sortObj: any = {};
    sortObj[sort] = order === "asc" ? 1 : -1;

    // Get all countries from MongoDB without pagination
    const countries = await CountryModel.find()
      .sort(sortObj)
      .lean();

    // Get total count
    const total = await CountryModel.countDocuments();

    // Convert MongoDB documents to Country interface
    const countryData: Country[] = countries.map((country) => ({
      id: (country._id as any).toString(),
      name: country.name,
      flag: country.flag,
      popularCities: country.popularCities,
      rating: country.rating,
      description: country.description,
      visaType: country.visaType,
      workRights: country.workRights,
      avgTuition: country.avgTuition,
      livingCost: country.livingCost,
      currency: country.currency,
      language: country.language,
      climate: country.climate,
      isEnglishSpeaking: country.isEnglishSpeaking,
      isLowCost: country.isLowCost,
      hasWorkRights: country.hasWorkRights,
      createdAt: country.createdAt,
      updatedAt: country.updatedAt,
    }));

    res.status(200).json({
      success: true,
      data: countryData,
      message: "Countries retrieved successfully",
      pagination: {
        page: 1,
        limit: total,
        total,
        pages: 1,
      },
    });
  } catch (error) {
    console.error("Error fetching countries:", error);
    res.status(500).json({
      success: false,
      data: [] as Country[],
      message: "Internal server error",
    });
  }
};

// Get country by ID
export const getCountryById = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse<Country>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).json({
        success: false,
        data: {} as Country,
        message: "Invalid country ID format",
      });
      return;
    }

    const country = await CountryModel.findById(id).lean();

    if (!country) {
      res.status(404).json({
        success: false,
        data: {} as Country,
        message: "Country not found",
      });
      return;
    }

    const countryData: Country = {
      id: (country._id as any).toString(),
      name: country.name,
      flag: country.flag,
      popularCities: country.popularCities,
      rating: country.rating,
      description: country.description,
      visaType: country.visaType,
      workRights: country.workRights,
      avgTuition: country.avgTuition,
      livingCost: country.livingCost,
      currency: country.currency,
      language: country.language,
      climate: country.climate,
      isEnglishSpeaking: country.isEnglishSpeaking,
      isLowCost: country.isLowCost,
      hasWorkRights: country.hasWorkRights,
      createdAt: country.createdAt,
      updatedAt: country.updatedAt,
    };

    res.status(200).json({
      success: true,
      data: countryData,
      message: "Country retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching country by ID:", error);
    res.status(500).json({
      success: false,
      data: {} as Country,
      message: "Internal server error",
    });
  }
};

// Search countries
export const searchCountries = async (
  req: Request<{}, ApiResponse<Country[]>, {}, { q: string }>,
  res: Response<ApiResponse<Country[]>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { q } = req.query;

    if (!q || typeof q !== "string") {
      res.status(400).json({
        success: false,
        data: [] as Country[],
        message: "Search query is required",
      });
      return;
    }

    // Create search regex
    const searchRegex = new RegExp(q, "i");

    // Search in multiple fields
    const countries = await CountryModel.find({
      $or: [
        { name: searchRegex },
        { description: searchRegex },
        { popularCities: { $in: [searchRegex] } },
        { language: { $in: [searchRegex] } },
      ],
    })
      .sort({ name: 1 })
      .lean();

    // Convert MongoDB documents to Country interface
    const countryData: Country[] = countries.map((country) => ({
      id: (country._id as any).toString(),
      name: country.name,
      flag: country.flag,
      popularCities: country.popularCities,
      rating: country.rating,
      description: country.description,
      visaType: country.visaType,
      workRights: country.workRights,
      avgTuition: country.avgTuition,
      livingCost: country.livingCost,
      currency: country.currency,
      language: country.language,
      climate: country.climate,
      isEnglishSpeaking: country.isEnglishSpeaking,
      isLowCost: country.isLowCost,
      hasWorkRights: country.hasWorkRights,
      createdAt: country.createdAt,
      updatedAt: country.updatedAt,
    }));

    res.status(200).json({
      success: true,
      data: countryData,
      message: `Found ${countryData.length} countries matching "${q}"`,
    });
  } catch (error) {
    console.error("Error searching countries:", error);
    res.status(500).json({
      success: false,
      data: [] as Country[],
      message: "Internal server error",
    });
  }
};

// Create country (admin only)
export const createCountry = async (
  req: Request<{}, ApiResponse<Country>, Country>,
  res: Response<ApiResponse<Country>>,
  next: NextFunction
): Promise<void> => {
  try {
    // Create new country in MongoDB
    const newCountry = new CountryModel(req.body);
    const savedCountry = await newCountry.save();

    // Convert to Country interface
    const countryData: Country = {
      id: (savedCountry._id as any).toString(),
      name: savedCountry.name,
      flag: savedCountry.flag,
      popularCities: savedCountry.popularCities,
      rating: savedCountry.rating,
      description: savedCountry.description,
      visaType: savedCountry.visaType,
      workRights: savedCountry.workRights,
      avgTuition: savedCountry.avgTuition,
      livingCost: savedCountry.livingCost,
      currency: savedCountry.currency,
      language: savedCountry.language,
      climate: savedCountry.climate,
      isEnglishSpeaking: savedCountry.isEnglishSpeaking,
      isLowCost: savedCountry.isLowCost,
      hasWorkRights: savedCountry.hasWorkRights,
      createdAt: savedCountry.createdAt,
      updatedAt: savedCountry.updatedAt,
    };

    const response: ApiResponse<Country> = {
      success: true,
      data: countryData,
      message: "Country created successfully",
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
}; 
// Delete country (admin only)
export const deleteCountry = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse<{}>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).json({
        success: false,
        data: {},
        message: "Invalid country ID format",
      });
      return;
    }

    const deletedCountry = await CountryModel.findByIdAndDelete(id);

    if (!deletedCountry) {
      res.status(404).json({
        success: false,
        data: {},
        message: "Country not found",
      });
      return;
    }

    const response: ApiResponse<{}> = {
      success: true,
      data: {},
      message: "Country deleted successfully",
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error deleting country:", error);
    res.status(500).json({
      success: false,
      data: {},
      message: "Internal server error",
    });
  }
};