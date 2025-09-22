"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchVisas = exports.getVisaById = exports.getAllVisas = void 0;
const Visa_1 = __importDefault(require("../models/Visa"));
const getAllVisas = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, sort = "country", order = "asc" } = req.query;
        const sortObj = {};
        sortObj[sort] = order === "asc" ? 1 : -1;
        const skip = (page - 1) * limit;
        const visas = await Visa_1.default.find({ isActive: true })
            .sort(sortObj)
            .skip(skip)
            .limit(limit)
            .lean();
        const total = await Visa_1.default.countDocuments({ isActive: true });
        const visaData = visas.map((visa) => ({
            id: visa._id.toString(),
            country: visa.country,
            type: visa.type,
            processingTime: visa.processingTime,
            cost: visa.cost,
            validity: visa.validity,
            requirements: visa.requirements,
            documents: visa.documents,
            officialWebsite: visa.officialWebsite,
            description: visa.description,
            eligibility: visa.eligibility,
            restrictions: visa.restrictions,
            benefits: visa.benefits,
            isActive: visa.isActive,
            createdAt: visa.createdAt,
            updatedAt: visa.updatedAt,
        }));
        res.status(200).json({
            success: true,
            data: visaData,
            message: "Visas retrieved successfully",
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                pages: Math.ceil(total / Number(limit)),
            },
        });
    }
    catch (error) {
        console.error("Error fetching visas:", error);
        res.status(500).json({
            success: false,
            data: [],
            message: "Internal server error",
        });
    }
};
exports.getAllVisas = getAllVisas;
const getVisaById = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            res.status(400).json({
                success: false,
                data: {},
                message: "Invalid visa ID format",
            });
            return;
        }
        const visa = await Visa_1.default.findById(id).lean();
        if (!visa) {
            res.status(404).json({
                success: false,
                data: {},
                message: "Visa not found",
            });
            return;
        }
        const visaData = {
            id: visa._id.toString(),
            country: visa.country,
            type: visa.type,
            processingTime: visa.processingTime,
            cost: visa.cost,
            validity: visa.validity,
            requirements: visa.requirements,
            documents: visa.documents,
            officialWebsite: visa.officialWebsite,
            description: visa.description,
            eligibility: visa.eligibility,
            restrictions: visa.restrictions,
            benefits: visa.benefits,
            isActive: visa.isActive,
            createdAt: visa.createdAt,
            updatedAt: visa.updatedAt,
        };
        res.status(200).json({
            success: true,
            data: visaData,
            message: "Visa retrieved successfully",
        });
    }
    catch (error) {
        console.error("Error fetching visa by ID:", error);
        res.status(500).json({
            success: false,
            data: {},
            message: "Internal server error",
        });
    }
};
exports.getVisaById = getVisaById;
const searchVisas = async (req, res, next) => {
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
        const visas = await Visa_1.default.find({
            isActive: true,
            $or: [
                { country: searchRegex },
                { type: searchRegex },
                { description: searchRegex },
            ],
        })
            .sort({ country: 1 })
            .lean();
        const visaData = visas.map((visa) => ({
            id: visa._id.toString(),
            country: visa.country,
            type: visa.type,
            processingTime: visa.processingTime,
            cost: visa.cost,
            validity: visa.validity,
            requirements: visa.requirements,
            documents: visa.documents,
            officialWebsite: visa.officialWebsite,
            description: visa.description,
            eligibility: visa.eligibility,
            restrictions: visa.restrictions,
            benefits: visa.benefits,
            isActive: visa.isActive,
            createdAt: visa.createdAt,
            updatedAt: visa.updatedAt,
        }));
        res.status(200).json({
            success: true,
            data: visaData,
            message: `Found ${visaData.length} visas matching "${q}"`,
        });
    }
    catch (error) {
        console.error("Error searching visas:", error);
        res.status(500).json({
            success: false,
            data: [],
            message: "Internal server error",
        });
    }
};
exports.searchVisas = searchVisas;
//# sourceMappingURL=visaController.js.map