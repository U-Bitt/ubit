"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUniversity = exports.updateUniversity = exports.createUniversity = exports.searchUniversities = exports.getUniversityById = exports.getAllUniversities = void 0;
const University_1 = __importDefault(require("../models/University"));
const getAllUniversities = async (req, res, next) => {
    try {
        const { sort = "ranking", order = "asc" } = req.query;
        const sortObj = {};
        sortObj[sort] = order === "asc" ? 1 : -1;
        const universities = await University_1.default.find()
            .sort(sortObj)
            .lean();
        const total = await University_1.default.countDocuments();
        const universityData = universities.map((uni) => ({
            id: uni._id.toString(),
            name: uni.name,
            location: uni.location,
            ranking: uni.ranking,
            rating: uni.rating,
            tuition: uni.tuition,
            acceptance: uni.acceptance,
            students: uni.students,
            image: uni.image,
            programs: uni.programs,
            highlights: uni.highlights,
            deadline: uni.deadline,
            description: uni.description,
            website: uni.website,
            founded: uni.founded,
            type: uni.type,
            size: uni.size,
            createdAt: uni.createdAt,
            updatedAt: uni.updatedAt,
        }));
        const response = {
            success: true,
            data: universityData,
            pagination: {
                page: 1,
                limit: total,
                total,
                pages: 1,
            },
        };
        res.status(200).json(response);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllUniversities = getAllUniversities;
const getUniversityById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const university = await University_1.default.findById(id).lean();
        if (!university) {
            res.status(404).json({
                success: false,
                data: {},
                message: "University not found",
            });
            return;
        }
        const universityData = {
            id: university._id.toString(),
            name: university.name,
            location: university.location,
            ranking: university.ranking,
            rating: university.rating,
            tuition: university.tuition,
            acceptance: university.acceptance,
            students: university.students,
            image: university.image,
            programs: university.programs,
            highlights: university.highlights,
            deadline: university.deadline,
            description: university.description,
            website: university.website,
            founded: university.founded,
            type: university.type,
            size: university.size,
            createdAt: university.createdAt,
            updatedAt: university.updatedAt,
        };
        const response = {
            success: true,
            data: universityData,
        };
        res.status(200).json(response);
    }
    catch (error) {
        next(error);
    }
};
exports.getUniversityById = getUniversityById;
const searchUniversities = async (req, res, next) => {
    try {
        const { q, country, program, minRating, maxTuition, page = 1, limit = 10, sort = "ranking", order = "asc", } = req.query;
        const query = {};
        if (q) {
            query.$or = [
                { name: { $regex: q, $options: "i" } },
                { location: { $regex: q, $options: "i" } },
                { programs: { $in: [new RegExp(q, "i")] } },
            ];
        }
        if (country) {
            query.location = { $regex: country, $options: "i" };
        }
        if (program) {
            query.programs = { $in: [new RegExp(program, "i")] };
        }
        if (minRating) {
            query.rating = { $gte: minRating };
        }
        if (maxTuition) {
        }
        const sortObj = {};
        sortObj[sort] = order === "asc" ? 1 : -1;
        const skip = (page - 1) * limit;
        const universities = await University_1.default.find(query)
            .sort(sortObj)
            .skip(skip)
            .limit(limit)
            .lean();
        const total = await University_1.default.countDocuments(query);
        const universityData = universities.map((uni) => ({
            id: uni._id.toString(),
            name: uni.name,
            location: uni.location,
            ranking: uni.ranking,
            rating: uni.rating,
            tuition: uni.tuition,
            acceptance: uni.acceptance,
            students: uni.students,
            image: uni.image,
            programs: uni.programs,
            highlights: uni.highlights,
            deadline: uni.deadline,
            description: uni.description,
            website: uni.website,
            founded: uni.founded,
            type: uni.type,
            size: uni.size,
            createdAt: uni.createdAt,
            updatedAt: uni.updatedAt,
        }));
        const response = {
            success: true,
            data: universityData,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
        res.status(200).json(response);
    }
    catch (error) {
        next(error);
    }
};
exports.searchUniversities = searchUniversities;
const createUniversity = async (req, res, next) => {
    try {
        const newUniversity = new University_1.default(req.body);
        const savedUniversity = await newUniversity.save();
        const universityData = {
            id: savedUniversity._id.toString(),
            name: savedUniversity.name,
            location: savedUniversity.location,
            ranking: savedUniversity.ranking,
            rating: savedUniversity.rating,
            tuition: savedUniversity.tuition,
            acceptance: savedUniversity.acceptance,
            students: savedUniversity.students,
            image: savedUniversity.image,
            programs: savedUniversity.programs,
            highlights: savedUniversity.highlights,
            deadline: savedUniversity.deadline,
            description: savedUniversity.description,
            website: savedUniversity.website,
            founded: savedUniversity.founded,
            type: savedUniversity.type,
            size: savedUniversity.size,
            createdAt: savedUniversity.createdAt,
            updatedAt: savedUniversity.updatedAt,
        };
        const response = {
            success: true,
            data: universityData,
            message: "University created successfully",
        };
        res.status(201).json(response);
    }
    catch (error) {
        next(error);
    }
};
exports.createUniversity = createUniversity;
const updateUniversity = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedUniversity = await University_1.default.findByIdAndUpdate(id, { ...updateData, updatedAt: new Date() }, { new: true, runValidators: true }).lean();
        if (!updatedUniversity) {
            res.status(404).json({
                success: false,
                data: {},
                message: "University not found",
            });
            return;
        }
        const universityData = {
            id: updatedUniversity._id.toString(),
            name: updatedUniversity.name,
            location: updatedUniversity.location,
            ranking: updatedUniversity.ranking,
            rating: updatedUniversity.rating,
            tuition: updatedUniversity.tuition,
            acceptance: updatedUniversity.acceptance,
            students: updatedUniversity.students,
            image: updatedUniversity.image,
            programs: updatedUniversity.programs,
            highlights: updatedUniversity.highlights,
            deadline: updatedUniversity.deadline,
            description: updatedUniversity.description,
            website: updatedUniversity.website,
            founded: updatedUniversity.founded,
            type: updatedUniversity.type,
            size: updatedUniversity.size,
            createdAt: updatedUniversity.createdAt,
            updatedAt: updatedUniversity.updatedAt,
        };
        const response = {
            success: true,
            data: universityData,
            message: "University updated successfully",
        };
        res.status(200).json(response);
    }
    catch (error) {
        next(error);
    }
};
exports.updateUniversity = updateUniversity;
const deleteUniversity = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedUniversity = await University_1.default.findByIdAndDelete(id);
        if (!deletedUniversity) {
            res.status(404).json({
                success: false,
                data: {},
                message: "University not found",
            });
            return;
        }
        const response = {
            success: true,
            data: {},
            message: "University deleted successfully",
        };
        res.status(200).json(response);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteUniversity = deleteUniversity;
//# sourceMappingURL=universityController.js.map