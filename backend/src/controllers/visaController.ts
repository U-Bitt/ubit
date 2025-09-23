import { Request, Response, NextFunction } from "express";
import { Visa, ApiResponse, SearchQuery } from "../types";
import VisaModel from "../models/Visa";

// Get all visas
export const getAllVisas = async (
  req: Request<{}, ApiResponse<Visa[]>, {}, SearchQuery>,
  res: Response<ApiResponse<Visa[]>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { page = 1, limit = 10, sort = "country", order = "asc" } = req.query;

    // Build sort object for MongoDB
    const sortObj: any = {};
    sortObj[sort] = order === "asc" ? 1 : -1;

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get visas from MongoDB
    const visas = await VisaModel.find({ isActive: true })
      .sort(sortObj)
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const total = await VisaModel.countDocuments({ isActive: true });

    // Convert MongoDB documents to Visa interface
    const visaData: Visa[] = visas.map((visa) => ({
      id: (visa._id as any).toString(),
      country: visa.country,
      type: visa.type,
      processingTime: visa.processingTime,
      cost: visa.cost,
      validity: visa.validity,
      requirements: visa.requirements,
      documents: visa.documents,
      officialWebsite: visa.officialWebsite,
      description: visa.description,
      eligibility: visa.eligibility?.join(", ") || "",
      restrictions: visa.restrictions || [],
      benefits: visa.benefits || [],
      workRights: "",
      studyRights: "",
      familyRights: "",
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
  } catch (error) {
    console.error("Error fetching visas:", error);
    res.status(500).json({
      success: false,
      data: [] as Visa[],
      message: "Internal server error",
    });
  }
};

// Get visa by ID
export const getVisaById = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse<Visa>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).json({
        success: false,
        data: {} as Visa,
        message: "Invalid visa ID format",
      });
      return;
    }

    const visa = await VisaModel.findById(id).lean();

    if (!visa) {
      res.status(404).json({
        success: false,
        data: {} as Visa,
        message: "Visa not found",
      });
      return;
    }

    const visaData: Visa = {
      id: (visa._id as any).toString(),
      country: visa.country,
      type: visa.type,
      processingTime: visa.processingTime,
      cost: visa.cost,
      validity: visa.validity,
      requirements: visa.requirements,
      documents: visa.documents,
      officialWebsite: visa.officialWebsite,
      description: visa.description,
      eligibility: Array.isArray(visa.eligibility)
        ? visa.eligibility.join(", ")
        : visa.eligibility || "",
      restrictions: visa.restrictions || [],
      benefits: visa.benefits || [],
      workRights: "",
      studyRights: "",
      familyRights: "",
      createdAt: visa.createdAt,
      updatedAt: visa.updatedAt,
    };

    res.status(200).json({
      success: true,
      data: visaData,
      message: "Visa retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching visa by ID:", error);
    res.status(500).json({
      success: false,
      data: {} as Visa,
      message: "Internal server error",
    });
  }
};

// Search visas
export const searchVisas = async (
  req: Request<{}, ApiResponse<Visa[]>, {}, { q: string }>,
  res: Response<ApiResponse<Visa[]>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { q } = req.query;

    if (!q || typeof q !== "string") {
      res.status(400).json({
        success: false,
        data: [] as Visa[],
        message: "Search query is required",
      });
      return;
    }

    // Create search regex
    const searchRegex = new RegExp(q, "i");

    // Search in multiple fields
    const visas = await VisaModel.find({
      isActive: true,
      $or: [
        { country: searchRegex },
        { type: searchRegex },
        { description: searchRegex },
      ],
    })
      .sort({ country: 1 })
      .lean();

    // Convert MongoDB documents to Visa interface
    const visaData: Visa[] = visas.map((visa) => ({
      id: (visa._id as any).toString(),
      country: visa.country,
      type: visa.type,
      processingTime: visa.processingTime,
      cost: visa.cost,
      validity: visa.validity,
      requirements: visa.requirements,
      documents: visa.documents,
      officialWebsite: visa.officialWebsite,
      description: visa.description,
      eligibility: visa.eligibility?.join(", ") || "",
      restrictions: visa.restrictions || [],
      benefits: visa.benefits || [],
      workRights: "",
      studyRights: "",
      familyRights: "",
      createdAt: visa.createdAt,
      updatedAt: visa.updatedAt,
    }));

    res.status(200).json({
      success: true,
      data: visaData,
      message: `Found ${visaData.length} visas matching "${q}"`,
    });
  } catch (error) {
    console.error("Error searching visas:", error);
    res.status(500).json({
      success: false,
      data: [] as Visa[],
      message: "Internal server error",
    });
  }
};
