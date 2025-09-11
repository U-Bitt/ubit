import { Request, Response } from "express";
import { University } from "@/models";
import { asyncHandler, CustomError } from "@/middleware";
import { ApiResponse, QueryParams } from "@/types";

// @desc    Get all universities
// @route   GET /api/universities
// @access  Public
export const getUniversities = asyncHandler(
  async (req: Request, res: Response) => {
    const { page = 1, limit = 10, search, country, sort = "name" } = req.query;

    // Build query
    const query: any = {};

    if (search) {
      query.$text = { $search: search as string };
    }

    if (country) {
      query.country = country;
    }

    // Calculate pagination
    const skip = (Number(page) - 1) * Number(limit);

    // Build sort object
    const sortObj: any = {};
    if (sort === "name") sortObj.name = 1;
    if (sort === "ranking") sortObj.ranking = 1;
    if (sort === "tuition") sortObj["tuitionFee.undergraduate"] = 1;

    const universities = await University.find(query)
      .populate("scholarships", "name amount type")
      .populate("dormitories", "name type price")
      .sort(sortObj)
      .skip(skip)
      .limit(Number(limit));

    const total = await University.countDocuments(query);

    const response: ApiResponse = {
      success: true,
      message: "Universities retrieved successfully",
      data: universities,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    };

    res.json(response);
  }
);

// @desc    Get single university
// @route   GET /api/universities/:id
// @access  Public
export const getUniversity = asyncHandler(
  async (req: Request, res: Response) => {
    const university = await University.findById(req.params.id)
      .populate("scholarships")
      .populate("dormitories");

    if (!university) {
      throw new CustomError("University not found", 404);
    }

    const response: ApiResponse = {
      success: true,
      message: "University retrieved successfully",
      data: university,
    };

    res.json(response);
  }
);

// @desc    Create university
// @route   POST /api/universities
// @access  Private/Admin
export const createUniversity = asyncHandler(
  async (req: Request, res: Response) => {
    const university = await University.create(req.body);

    const response: ApiResponse = {
      success: true,
      message: "University created successfully",
      data: university,
    };

    res.status(201).json(response);
  }
);

// @desc    Update university
// @route   PUT /api/universities/:id
// @access  Private/Admin
export const updateUniversity = asyncHandler(
  async (req: Request, res: Response) => {
    const university = await University.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!university) {
      throw new CustomError("University not found", 404);
    }

    const response: ApiResponse = {
      success: true,
      message: "University updated successfully",
      data: university,
    };

    res.json(response);
  }
);

// @desc    Delete university
// @route   DELETE /api/universities/:id
// @access  Private/Admin
export const deleteUniversity = asyncHandler(
  async (req: Request, res: Response) => {
    const university = await University.findByIdAndDelete(req.params.id);

    if (!university) {
      throw new CustomError("University not found", 404);
    }

    const response: ApiResponse = {
      success: true,
      message: "University deleted successfully",
    };

    res.json(response);
  }
);

// @desc    Search universities
// @route   GET /api/universities/search
// @access  Public
export const searchUniversities = asyncHandler(
  async (req: Request, res: Response) => {
    const { q, country, minTuition, maxTuition, majors } = req.query;

    const query: any = {};

    if (q) {
      query.$text = { $search: q as string };
    }

    if (country) {
      query.country = country;
    }

    if (minTuition || maxTuition) {
      query["tuitionFee.undergraduate"] = {};
      if (minTuition)
        query["tuitionFee.undergraduate"].$gte = Number(minTuition);
      if (maxTuition)
        query["tuitionFee.undergraduate"].$lte = Number(maxTuition);
    }

    if (majors) {
      query.majors = { $in: (majors as string).split(",") };
    }

    const universities = await University.find(query)
      .populate("scholarships", "name amount type")
      .populate("dormitories", "name type price")
      .limit(20);

    const response: ApiResponse = {
      success: true,
      message: "Search completed successfully",
      data: universities,
    };

    res.json(response);
  }
);
