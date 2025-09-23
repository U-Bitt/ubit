"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createScholarship = exports.searchScholarships = exports.getScholarshipById = exports.getAllScholarships = void 0;
const Scholarship_1 = __importDefault(require("../models/Scholarship"));
const getAllScholarships = async (req, res, next) => {
    try {
        const { sort = "deadline", order = "asc" } = req.query;
        const sortObj = {};
        sortObj[sort] = order === "asc" ? 1 : -1;
        const scholarships = await Scholarship_1.default.find({ isActive: true })
            .sort(sortObj)
            .lean();
        const total = await Scholarship_1.default.countDocuments({ isActive: true });
        const scholarshipData = scholarships.map((scholarship) => ({
            id: scholarship._id.toString(),
            title: scholarship.title,
            description: scholarship.description,
            amount: scholarship.amount,
            university: scholarship.university,
            country: scholarship.country,
            deadline: scholarship.deadline,
            type: scholarship.type,
            requirements: scholarship.requirements,
            coverage: scholarship.coverage,
            duration: scholarship.duration,
            applicationProcess: scholarship.applicationProcess,
            eligibility: scholarship.eligibility,
            benefits: scholarship.benefits,
            image: scholarship.image,
            donor: scholarship.donor,
            contactEmail: scholarship.contactEmail,
            website: scholarship.website,
            isActive: scholarship.isActive,
            createdAt: scholarship.createdAt,
            updatedAt: scholarship.updatedAt,
        }));
        res.status(200).json({
            success: true,
            data: scholarshipData,
            message: "Scholarships retrieved successfully",
            pagination: {
                page: 1,
                limit: total,
                total,
                pages: 1,
            },
        });
    }
    catch (error) {
        console.error("Error fetching scholarships:", error);
        res.status(500).json({
            success: false,
            data: [],
            message: "Internal server error",
        });
    }
};
exports.getAllScholarships = getAllScholarships;
const getScholarshipById = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            res.status(400).json({
                success: false,
                data: {},
                message: "Invalid scholarship ID format",
            });
            return;
        }
        const scholarship = await Scholarship_1.default.findById(id).lean();
        if (!scholarship) {
            res.status(404).json({
                success: false,
                data: {},
                message: "Scholarship not found",
            });
            return;
        }
        const scholarshipData = {
            id: scholarship._id.toString(),
            title: scholarship.title,
            description: scholarship.description,
            amount: scholarship.amount,
            university: scholarship.university,
            country: scholarship.country,
            deadline: scholarship.deadline,
            type: scholarship.type,
            requirements: scholarship.requirements,
            coverage: scholarship.coverage,
            duration: scholarship.duration,
            applicationProcess: scholarship.applicationProcess,
            eligibility: scholarship.eligibility,
            benefits: scholarship.benefits,
            image: scholarship.image,
            donor: scholarship.donor,
            contactEmail: scholarship.contactEmail,
            website: scholarship.website,
            isActive: scholarship.isActive,
            createdAt: scholarship.createdAt,
            updatedAt: scholarship.updatedAt,
        };
        res.status(200).json({
            success: true,
            data: scholarshipData,
            message: "Scholarship retrieved successfully",
        });
    }
    catch (error) {
        console.error("Error fetching scholarship by ID:", error);
        res.status(500).json({
            success: false,
            data: {},
            message: "Internal server error",
        });
    }
};
exports.getScholarshipById = getScholarshipById;
const searchScholarships = async (req, res, next) => {
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
        const scholarships = await Scholarship_1.default.find({
            isActive: true,
            $or: [
                { title: searchRegex },
                { description: searchRegex },
                { university: searchRegex },
                { country: searchRegex },
                { type: searchRegex },
            ],
        })
            .sort({ deadline: 1 })
            .lean();
        const scholarshipData = scholarships.map((scholarship) => ({
            id: scholarship._id.toString(),
            title: scholarship.title,
            description: scholarship.description,
            amount: scholarship.amount,
            university: scholarship.university,
            country: scholarship.country,
            deadline: scholarship.deadline,
            type: scholarship.type,
            requirements: scholarship.requirements,
            coverage: scholarship.coverage,
            duration: scholarship.duration,
            applicationProcess: scholarship.applicationProcess,
            eligibility: scholarship.eligibility,
            benefits: scholarship.benefits,
            image: scholarship.image,
            donor: scholarship.donor,
            contactEmail: scholarship.contactEmail,
            website: scholarship.website,
            isActive: scholarship.isActive,
            createdAt: scholarship.createdAt,
            updatedAt: scholarship.updatedAt,
        }));
        res.status(200).json({
            success: true,
            data: scholarshipData,
            message: `Found ${scholarshipData.length} scholarships matching "${q}"`,
        });
    }
    catch (error) {
        console.error("Error searching scholarships:", error);
        res.status(500).json({
            success: false,
            data: [],
            message: "Internal server error",
        });
    }
};
exports.searchScholarships = searchScholarships;
const createScholarship = async (req, res, next) => {
    try {
        const newScholarship = new Scholarship_1.default(req.body);
        const savedScholarship = await newScholarship.save();
        const scholarshipData = {
            id: savedScholarship._id.toString(),
            title: savedScholarship.title,
            description: savedScholarship.description,
            amount: savedScholarship.amount,
            university: savedScholarship.university,
            country: savedScholarship.country,
            deadline: savedScholarship.deadline,
            type: savedScholarship.type,
            requirements: savedScholarship.requirements,
            coverage: savedScholarship.coverage,
            duration: savedScholarship.duration,
            applicationProcess: savedScholarship.applicationProcess,
            eligibility: savedScholarship.eligibility,
            benefits: savedScholarship.benefits,
            image: savedScholarship.image,
            donor: savedScholarship.donor,
            contactEmail: savedScholarship.contactEmail,
            website: savedScholarship.website,
            isActive: savedScholarship.isActive,
            createdAt: savedScholarship.createdAt,
            updatedAt: savedScholarship.updatedAt,
        };
        res.status(201).json({
            success: true,
            data: scholarshipData,
            message: "Scholarship created successfully",
        });
    }
    catch (error) {
        console.error("Error creating scholarship:", error);
        res.status(500).json({
            success: false,
            data: {},
            message: "Internal server error",
        });
    }
};
exports.createScholarship = createScholarship;
//# sourceMappingURL=scholarshipController.js.map