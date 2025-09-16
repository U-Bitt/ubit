import { Request, Response, NextFunction } from "express";
import { University, ApiResponse, SearchQuery } from "../types";
import UniversityModel from "../models/University";

// Get all universities
export const getAllUniversities = async (
  req: Request<{}, ApiResponse<University[]>, {}, SearchQuery>,
  res: Response<ApiResponse<University[]>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { page = 1, limit = 10, sort = "ranking", order = "asc" } = req.query;

    // Build sort object for MongoDB
    const sortObj: any = {};
    sortObj[sort] = order === "asc" ? 1 : -1;

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get universities from MongoDB
    const universities = await UniversityModel.find()
      .sort(sortObj)
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const total = await UniversityModel.countDocuments();

    // Convert MongoDB documents to University interface
    const universityData: University[] = universities.map((uni) => ({
      id: (uni._id as any).toString(),
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

    const response: ApiResponse<University[]> = {
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
  } catch (error) {
    next(error);
  }
};

// Get university by ID
export const getUniversityById = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse<University>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const university = await UniversityModel.findById(id).lean();

    if (!university) {
      res.status(404).json({
        success: false,
        data: {} as University,
        message: "University not found",
      });
      return;
    }

    const universityData: University = {
      id: (university._id as any).toString(),
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

    const response: ApiResponse<University> = {
      success: true,
      data: universityData,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

// Search universities
export const searchUniversities = async (
  req: Request<{}, ApiResponse<University[]>, {}, SearchQuery>,
  res: Response<ApiResponse<University[]>>,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      q,
      country,
      program,
      minRating,
      maxTuition,
      page = 1,
      limit = 10,
      sort = "ranking",
      order = "asc",
    } = req.query;

    // Build MongoDB query
    const query: any = {};

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
      // This would need more complex parsing for tuition comparison
      // For now, we'll skip this filter
    }

    // Build sort object
    const sortObj: any = {};
    sortObj[sort] = order === "asc" ? 1 : -1;

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Execute query
    const universities = await UniversityModel.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const total = await UniversityModel.countDocuments(query);

    // Convert to University interface
    const universityData: University[] = universities.map((uni) => ({
      id: (uni._id as any).toString(),
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

    const response: ApiResponse<University[]> = {
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
  } catch (error) {
    next(error);
  }
};

// Create university (admin only)
export const createUniversity = async (
  req: Request<{}, ApiResponse<University>, University>,
  res: Response<ApiResponse<University>>,
  next: NextFunction
): Promise<void> => {
  try {
    // Create new university in MongoDB
    const newUniversity = new UniversityModel(req.body);
    const savedUniversity = await newUniversity.save();

    // Convert to University interface
    const universityData: University = {
      id: (savedUniversity._id as any).toString(),
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

    const response: ApiResponse<University> = {
      success: true,
      data: universityData,
      message: "University created successfully",
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

// Update university (admin only)
export const updateUniversity = async (
  req: Request<{ id: string }, ApiResponse<University>, Partial<University>>,
  res: Response<ApiResponse<University>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedUniversity = await UniversityModel.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).lean();

    if (!updatedUniversity) {
      res.status(404).json({
        success: false,
        data: {} as University,
        message: "University not found",
      });
      return;
    }

    const universityData: University = {
      id: (updatedUniversity._id as any).toString(),
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

    const response: ApiResponse<University> = {
      success: true,
      data: universityData,
      message: "University updated successfully",
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

// Delete university (admin only)
export const deleteUniversity = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse<{}>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedUniversity = await UniversityModel.findByIdAndDelete(id);

    if (!deletedUniversity) {
      res.status(404).json({
        success: false,
        data: {},
        message: "University not found",
      });
      return;
    }

    const response: ApiResponse<{}> = {
      success: true,
      data: {},
      message: "University deleted successfully",
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
