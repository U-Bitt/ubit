import { Request, Response, NextFunction } from "express";
import { Exam, ApiResponse } from "../types";

// Mock data for exams
const exams: Exam[] = [
  {
    id: "toefl",
    name: "TOEFL",
    fullName: "Test of English as a Foreign Language",
    sections: ["Reading", "Listening", "Speaking", "Writing"],
    nextDate: "2024-12-15",
    preparation: "3-6 months",
    difficulty: "medium",
    duration: "3 hours",
    cost: "$205",
    validity: "2 years",
    description: "Measures English language proficiency for academic purposes.",
  },
  {
    id: "ielts",
    name: "IELTS",
    fullName: "International English Language Testing System",
    sections: ["Listening", "Reading", "Writing", "Speaking"],
    nextDate: "2024-12-20",
    preparation: "2-4 months",
    difficulty: "medium",
    duration: "2 hours 45 minutes",
    cost: "$245",
    validity: "2 years",
    description:
      "World's most popular English language test for higher education.",
  },
  {
    id: "gre",
    name: "GRE",
    fullName: "Graduate Record Examinations",
    sections: [
      "Verbal Reasoning",
      "Quantitative Reasoning",
      "Analytical Writing",
    ],
    nextDate: "2024-12-10",
    preparation: "4-6 months",
    difficulty: "hard",
    duration: "3 hours 45 minutes",
    cost: "$205",
    validity: "5 years",
    description: "Required for most graduate programs in the US and Canada.",
  },
  {
    id: "gmat",
    name: "GMAT",
    fullName: "Graduate Management Admission Test",
    sections: [
      "Quantitative",
      "Verbal",
      "Integrated Reasoning",
      "Analytical Writing",
    ],
    nextDate: "2024-12-18",
    preparation: "3-6 months",
    difficulty: "hard",
    duration: "3 hours 7 minutes",
    cost: "$275",
    validity: "5 years",
    description: "Required for MBA and other business graduate programs.",
  },
  {
    id: "sat",
    name: "SAT",
    fullName: "Scholastic Assessment Test",
    sections: ["Reading", "Writing and Language", "Math"],
    nextDate: "2024-12-07",
    preparation: "2-4 months",
    difficulty: "medium",
    duration: "3 hours",
    cost: "$60",
    validity: "5 years",
    description: "Standardized test for college admissions in the US.",
  },
];

export const getAllExams = async (
  req: Request<{}, ApiResponse<Exam[]>>,
  res: Response<ApiResponse<Exam[]>>,
  next: NextFunction
): Promise<void> => {
  try {
    const response: ApiResponse<Exam[]> = {
      success: true,
      data: exams,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const getExamById = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse<Exam>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const exam = exams.find((e) => e.id === id);

    if (!exam) {
      res.status(404).json({
        success: false,
        data: {} as Exam,
        message: "Exam not found",
      });
      return;
    }

    const response: ApiResponse<Exam> = {
      success: true,
      data: exam,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const getExamsByType = async (
  req: Request<{ type: string }>,
  res: Response<ApiResponse<Exam[]>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { type } = req.params;

    // Simple type filtering based on exam names
    let filteredExams = exams;

    if (type.toLowerCase() === "english") {
      filteredExams = exams.filter(
        (exam) =>
          exam.name.toLowerCase().includes("toefl") ||
          exam.name.toLowerCase().includes("ielts")
      );
    } else if (type.toLowerCase() === "graduate") {
      filteredExams = exams.filter(
        (exam) =>
          exam.name.toLowerCase().includes("gre") ||
          exam.name.toLowerCase().includes("gmat")
      );
    } else if (type.toLowerCase() === "undergraduate") {
      filteredExams = exams.filter((exam) =>
        exam.name.toLowerCase().includes("sat")
      );
    }

    const response: ApiResponse<Exam[]> = {
      success: true,
      data: filteredExams,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
