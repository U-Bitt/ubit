import { Request, Response, NextFunction } from "express";
import { University, Scholarship, ApiResponse } from "../types";

// Mock recommendation data
const universityRecommendations = [
  {
    id: "mit",
    name: "Massachusetts Institute of Technology",
    reason: "Based on your GRE score and interest in Computer Science",
    matchScore: 95,
    location: "Cambridge, MA, USA",
    ranking: 1,
    tuition: "$57,986/year",
  },
  {
    id: "stanford",
    name: "Stanford University",
    reason: "Strong match for your engineering background",
    matchScore: 92,
    location: "Stanford, CA, USA",
    ranking: 2,
    tuition: "$61,731/year",
  },
  {
    id: "cmu",
    name: "Carnegie Mellon University",
    reason: "Excellent for Computer Science with your profile",
    matchScore: 88,
    location: "Pittsburgh, PA, USA",
    ranking: 5,
    tuition: "$58,924/year",
  },
];

const programRecommendations = [
  {
    id: "cs-mit",
    name: "Computer Science",
    university: "MIT",
    reason: "Perfect match for your technical background",
    matchScore: 98,
    duration: "2 years",
    requirements: ["GRE: 320+", "TOEFL: 100+", "Strong math background"],
  },
  {
    id: "ai-stanford",
    name: "Artificial Intelligence",
    university: "Stanford",
    reason: "Aligns with your interest in cutting-edge technology",
    matchScore: 94,
    duration: "2 years",
    requirements: ["GRE: 325+", "TOEFL: 105+", "Programming experience"],
  },
  {
    id: "se-cmu",
    name: "Software Engineering",
    university: "Carnegie Mellon",
    reason: "Great for practical software development skills",
    matchScore: 90,
    duration: "1.5 years",
    requirements: ["GRE: 315+", "TOEFL: 95+", "Portfolio required"],
  },
];

const scholarshipRecommendations = [
  {
    id: "fulbright",
    name: "Fulbright Scholarship",
    university: "Various US Universities",
    amount: "Full tuition + living expenses",
    type: "merit",
    reason: "Based on your academic excellence and leadership",
    matchScore: 85,
    deadline: "2024-12-01",
    requirements: [
      "Excellent academic record",
      "Leadership experience",
      "Community service",
    ],
  },
  {
    id: "chevening",
    name: "Chevening Scholarship",
    university: "UK Universities",
    amount: "Full tuition + £1,200/month",
    type: "merit",
    reason: "Strong candidate for UK study",
    matchScore: 88,
    deadline: "2024-11-01",
    requirements: [
      "2+ years work experience",
      "Leadership potential",
      "English proficiency",
    ],
  },
  {
    id: "mit-aid",
    name: "MIT Financial Aid",
    university: "MIT",
    amount: "Need-based aid available",
    type: "need",
    reason: "MIT offers generous financial aid packages",
    matchScore: 92,
    deadline: "2025-01-01",
    requirements: ["Financial need", "Academic merit", "Complete FAFSA"],
  },
];

export const getUniversityRecommendations = async (
  req: Request<{}, ApiResponse<typeof universityRecommendations>>,
  res: Response<ApiResponse<typeof universityRecommendations>>,
  next: NextFunction
): Promise<void> => {
  try {
    const response: ApiResponse<typeof universityRecommendations> = {
      success: true,
      data: universityRecommendations,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const getProgramRecommendations = async (
  req: Request<{}, ApiResponse<typeof programRecommendations>>,
  res: Response<ApiResponse<typeof programRecommendations>>,
  next: NextFunction
): Promise<void> => {
  try {
    const response: ApiResponse<typeof programRecommendations> = {
      success: true,
      data: programRecommendations,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const getScholarshipRecommendations = async (
  req: Request<{}, ApiResponse<typeof scholarshipRecommendations>>,
  res: Response<ApiResponse<typeof scholarshipRecommendations>>,
  next: NextFunction
): Promise<void> => {
  try {
    const response: ApiResponse<typeof scholarshipRecommendations> = {
      success: true,
      data: scholarshipRecommendations,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
