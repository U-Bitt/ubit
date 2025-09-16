import { Request, Response, NextFunction } from "express";
import { User, Application, ApiResponse } from "../types";

// Mock user data
let currentUser: User = {
  id: "user_1",
  email: "user@example.com",
  firstName: "John",
  lastName: "Doe",
  dateOfBirth: "1995-01-01",
  nationality: "Mongolian",
  phone: "+976-12345678",
  avatar: "/placeholder-user.jpg",
  preferences: {
    countries: ["usa", "uk", "canada"],
    programs: ["Computer Science", "Engineering"],
    budget: {
      min: 20000,
      max: 50000,
      currency: "USD",
    },
    examScores: {
      toefl: 100,
      gre: 320,
    },
  },
  applications: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Mock applications data
let applications: Application[] = [
  {
    id: "app_1",
    universityId: "mit",
    program: "Computer Science",
    status: "submitted",
    documents: ["transcript", "recommendation_1", "recommendation_2"],
    submittedAt: new Date("2024-10-01"),
    deadline: new Date("2025-01-01"),
  },
  {
    id: "app_2",
    universityId: "stanford",
    program: "Engineering",
    status: "under_review",
    documents: [
      "transcript",
      "recommendation_1",
      "recommendation_2",
      "portfolio",
    ],
    submittedAt: new Date("2024-10-15"),
    deadline: new Date("2025-01-02"),
  },
];

export const getUserProfile = async (
  req: Request<{}, ApiResponse<User>>,
  res: Response<ApiResponse<User>>,
  next: NextFunction
): Promise<void> => {
  try {
    const response: ApiResponse<User> = {
      success: true,
      data: currentUser,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const updateUserProfile = async (
  req: Request<{}, ApiResponse<User>, Partial<User>>,
  res: Response<ApiResponse<User>>,
  next: NextFunction
): Promise<void> => {
  try {
    const updates = req.body;

    currentUser = {
      ...currentUser,
      ...updates,
      updatedAt: new Date(),
    };

    const response: ApiResponse<User> = {
      success: true,
      data: currentUser,
      message: "Profile updated successfully",
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const getUserApplications = async (
  req: Request<{}, ApiResponse<Application[]>>,
  res: Response<ApiResponse<Application[]>>,
  next: NextFunction
): Promise<void> => {
  try {
    const response: ApiResponse<Application[]> = {
      success: true,
      data: applications,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const createApplication = async (
  req: Request<{}, ApiResponse<Application>, Partial<Application>>,
  res: Response<ApiResponse<Application>>,
  next: NextFunction
): Promise<void> => {
  try {
    const newApplication: Application = {
      ...req.body,
      id: `app_${Date.now()}`,
      status: "draft",
      documents: [],
    };

    applications.push(newApplication);

    const response: ApiResponse<Application> = {
      success: true,
      data: newApplication,
      message: "Application created successfully",
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};
