"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchScholarships = exports.getScholarshipById = exports.getAllScholarships = void 0;
const seedData_1 = require("../utils/seedData");
const getAllScholarships = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            data: seedData_1.scholarshipData,
            message: "Scholarships retrieved successfully",
        });
    }
    catch (error) {
        console.error("Error fetching scholarships:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getAllScholarships = getAllScholarships;
const getScholarshipById = async (req, res) => {
    try {
        const { id } = req.params;
        const scholarship = seedData_1.scholarshipData.find(s => s.id === id);
        if (!scholarship) {
            return res.status(404).json({
                success: false,
                message: "Scholarship not found",
            });
        }
        return res.status(200).json({
            success: true,
            data: scholarship,
            message: "Scholarship retrieved successfully",
        });
    }
    catch (error) {
        console.error("Error fetching scholarship by ID:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getScholarshipById = getScholarshipById;
const searchScholarships = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q || typeof q !== 'string') {
            return res.status(400).json({
                success: false,
                message: "Search query is required",
            });
        }
        const searchTerm = q.toLowerCase();
        const filteredScholarships = seedData_1.scholarshipData.filter(scholarship => scholarship.title.toLowerCase().includes(searchTerm) ||
            scholarship.description.toLowerCase().includes(searchTerm) ||
            scholarship.university.toLowerCase().includes(searchTerm) ||
            scholarship.country.toLowerCase().includes(searchTerm));
        return res.status(200).json({
            success: true,
            data: filteredScholarships,
            message: `Found ${filteredScholarships.length} scholarships matching "${q}"`,
        });
    }
    catch (error) {
        console.error("Error searching scholarships:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.searchScholarships = searchScholarships;
//# sourceMappingURL=scholarshipController.js.map