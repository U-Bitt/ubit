"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCountry = exports.createCountry = exports.searchCountries = exports.getCountryById = exports.getAllCountries = void 0;
const Country_1 = __importDefault(require("../models/Country"));
const getAllCountries = async (req, res, next) => {
    try {
        const { sort = "name", order = "asc" } = req.query;
        const sortObj = {};
        sortObj[sort] = order === "asc" ? 1 : -1;
        const countries = await Country_1.default.find()
            .sort(sortObj)
            .lean();
        const total = await Country_1.default.countDocuments();
        const countryData = countries.map((country) => ({
            id: country._id.toString(),
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
    }
    catch (error) {
        console.error("Error fetching countries:", error);
        res.status(500).json({
            success: false,
            data: [],
            message: "Internal server error",
        });
    }
};
exports.getAllCountries = getAllCountries;
const getCountryById = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            res.status(400).json({
                success: false,
                data: {},
                message: "Invalid country ID format",
            });
            return;
        }
        const country = await Country_1.default.findById(id).lean();
        if (!country) {
            res.status(404).json({
                success: false,
                data: {},
                message: "Country not found",
            });
            return;
        }
        const countryData = {
            id: country._id.toString(),
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
    }
    catch (error) {
        console.error("Error fetching country by ID:", error);
        res.status(500).json({
            success: false,
            data: {},
            message: "Internal server error",
        });
    }
};
exports.getCountryById = getCountryById;
const searchCountries = async (req, res, next) => {
    try {
        const { q } = req.query;
        if (!q || typeof q !== "string") {
            res.status(400).json({
                success: false,
                data: [],
                message: "Search query is required",
            });
            return;
        }
        const searchRegex = new RegExp(q, "i");
        const countries = await Country_1.default.find({
            $or: [
                { name: searchRegex },
                { description: searchRegex },
                { popularCities: { $in: [searchRegex] } },
                { language: { $in: [searchRegex] } },
            ],
        })
            .sort({ name: 1 })
            .lean();
        const countryData = countries.map((country) => ({
            id: country._id.toString(),
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
    }
    catch (error) {
        console.error("Error searching countries:", error);
        res.status(500).json({
            success: false,
            data: [],
            message: "Internal server error",
        });
    }
};
exports.searchCountries = searchCountries;
const createCountry = async (req, res, next) => {
    try {
        const newCountry = new Country_1.default(req.body);
        const savedCountry = await newCountry.save();
        const countryData = {
            id: savedCountry._id.toString(),
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
        const response = {
            success: true,
            data: countryData,
            message: "Country created successfully",
        };
        res.status(201).json(response);
    }
    catch (error) {
        next(error);
    }
};
exports.createCountry = createCountry;
const deleteCountry = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            res.status(400).json({
                success: false,
                data: {},
                message: "Invalid country ID format",
            });
            return;
        }
        const deletedCountry = await Country_1.default.findByIdAndDelete(id);
        if (!deletedCountry) {
            res.status(404).json({
                success: false,
                data: {},
                message: "Country not found",
            });
            return;
        }
        const response = {
            success: true,
            data: {},
            message: "Country deleted successfully",
        };
        res.status(200).json(response);
    }
    catch (error) {
        console.error("Error deleting country:", error);
        res.status(500).json({
            success: false,
            data: {},
            message: "Internal server error",
        });
    }
};
exports.deleteCountry = deleteCountry;
//# sourceMappingURL=countryController.js.map