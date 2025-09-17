import { Request, Response } from "express";
import { scholarshipData } from "../utils/seedData";

// Get all scholarships
export const getAllScholarships = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      success: true,
      data: scholarshipData,
      message: "Scholarships retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching scholarships:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Get scholarship by ID
export const getScholarshipById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    
    const scholarship = scholarshipData.find(s => s.id === id);
    
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
  } catch (error) {
    console.error("Error fetching scholarship by ID:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Search scholarships
export const searchScholarships = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { q } = req.query;
    
    if (!q || typeof q !== 'string') {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const searchTerm = q.toLowerCase();
    const filteredScholarships = scholarshipData.filter(scholarship =>
      scholarship.title.toLowerCase().includes(searchTerm) ||
      scholarship.description.toLowerCase().includes(searchTerm) ||
      scholarship.university.toLowerCase().includes(searchTerm) ||
      scholarship.country.toLowerCase().includes(searchTerm)
    );

    return res.status(200).json({
      success: true,
      data: filteredScholarships,
      message: `Found ${filteredScholarships.length} scholarships matching "${q}"`,
    });
  } catch (error) {
    console.error("Error searching scholarships:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};