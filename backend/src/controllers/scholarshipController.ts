import { Request, Response, NextFunction } from "express";
import { Scholarship, ApiResponse, SearchQuery } from "../types";
import ScholarshipModel from "../models/Scholarship";

// Get all scholarships
export const getAllScholarships = async (
  req: Request<{}, ApiResponse<Scholarship[]>, {}, SearchQuery>,
  res: Response<ApiResponse<Scholarship[]>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { page = 1, limit = 10, sort = "deadline", order = "asc" } = req.query;

    // Build sort object for MongoDB
    const sortObj: any = {};
    sortObj[sort] = order === "asc" ? 1 : -1;

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get scholarships from MongoDB
    const scholarships = await ScholarshipModel.find({ isActive: true })
      .sort(sortObj)
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const total = await ScholarshipModel.countDocuments({ isActive: true });

    // Convert MongoDB documents to Scholarship interface
    const scholarshipData: Scholarship[] = scholarships.map((scholarship) => ({
      id: (scholarship._id as any).toString(),
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
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    console.error("Error fetching scholarships:", error);
    res.status(500).json({
      success: false,
      data: [] as Scholarship[],
      message: "Internal server error",
    });
  }
};

// Get scholarship by ID
export const getScholarshipById = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse<Scholarship>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).json({
        success: false,
        data: {} as Scholarship,
        message: "Invalid scholarship ID format",
      });
      return;
    }

    const scholarship = await ScholarshipModel.findById(id).lean();

    if (!scholarship) {
      res.status(404).json({
        success: false,
        data: {} as Scholarship,
        message: "Scholarship not found",
      });
      return;
    }

    const scholarshipData: Scholarship = {
      id: (scholarship._id as any).toString(),
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
  } catch (error) {
    console.error("Error fetching scholarship by ID:", error);
    res.status(500).json({
      success: false,
      data: {} as Scholarship,
      message: "Internal server error",
    });
  }
};

// Search scholarships
export const searchScholarships = async (
  req: Request<{}, ApiResponse<Scholarship[]>, {}, { q: string }>,
  res: Response<ApiResponse<Scholarship[]>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { q } = req.query;

    if (!q || typeof q !== "string") {
      res.status(400).json({
        success: false,
        data: [] as Scholarship[],
        message: "Search query is required",
      });
      return;
    }

    // Create search regex
    const searchRegex = new RegExp(q, "i");

    // Search in multiple fields
    const scholarships = await ScholarshipModel.find({
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

    // Convert MongoDB documents to Scholarship interface
    const scholarshipData: Scholarship[] = scholarships.map((scholarship) => ({
      id: (scholarship._id as any).toString(),
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
  } catch (error) {
    console.error("Error searching scholarships:", error);
    res.status(500).json({
      success: false,
      data: [] as Scholarship[],
      message: "Internal server error",
    });
  }
};