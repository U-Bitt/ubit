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
    const { sort = "deadline", order = "asc" } = req.query;

    // Build sort object for MongoDB
    const sortObj: any = {};
    sortObj[sort] = order === "asc" ? 1 : -1;

    // Get all scholarships from MongoDB
    const scholarships = await ScholarshipModel.find({ isActive: true })
      .sort(sortObj)
      .lean();

    // Get total count
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
        page: 1,
        limit: total,
        total,
        pages: 1,
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

// Get scholarships by university name
export const getScholarshipsByUniversity = async (
  req: Request<{ universityName: string }, ApiResponse<Scholarship[]>, {}, {}>,
  res: Response<ApiResponse<Scholarship[]>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { universityName } = req.params;

    if (!universityName) {
      res.status(400).json({
        success: false,
        data: [] as Scholarship[],
        message: "University name is required",
      });
      return;
    }

    // Decode the university name and search for scholarships
    const decodedUniversityName = decodeURIComponent(universityName);

    // Search for scholarships with university name (case insensitive)
    const scholarships = await ScholarshipModel.find({
      university: { $regex: new RegExp(decodedUniversityName, "i") },
      isActive: true,
    }).lean();

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
      message: `Found ${scholarshipData.length} scholarships for ${decodedUniversityName}`,
    });
  } catch (error) {
    console.error("Error fetching scholarships by university:", error);
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

// Create new scholarship
export const createScholarship = async (
  req: Request<{}, ApiResponse<Scholarship>, Scholarship>,
  res: Response<ApiResponse<Scholarship>>,
  next: NextFunction
): Promise<void> => {
  try {
    const newScholarship = new ScholarshipModel(req.body);
    const savedScholarship = await newScholarship.save();

    const scholarshipData: Scholarship = {
      id: (savedScholarship._id as any).toString(),
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
  } catch (error) {
    console.error("Error creating scholarship:", error);
    res.status(500).json({
      success: false,
      data: {} as Scholarship,
      message: "Internal server error",
    });
  }
};

// Delete scholarship
export const deleteScholarship = async (
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
        message: "Invalid scholarship ID format",
      });
      return;
    }

    const deletedScholarship = await ScholarshipModel.findByIdAndDelete(id);

    if (!deletedScholarship) {
      res.status(404).json({
        success: false,
        data: {},
        message: "Scholarship not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {},
      message: "Scholarship deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting scholarship:", error);
    res.status(500).json({
      success: false,
      data: {},
      message: "Internal server error",
    });
  }
};
