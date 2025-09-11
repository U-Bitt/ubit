import { Request, Response } from "express";
import { Exam } from "@/models";
import { asyncHandler, CustomError } from "@/middleware";
import { ApiResponse } from "@/types";

// @desc    Get all exams
// @route   GET /api/exams
// @access  Public
export const getExams = asyncHandler(async (req: Request, res: Response) => {
  const { page = 1, limit = 10, type, search } = req.query;

  // Build query
  const query: any = { isActive: true };

  if (type) {
    query.type = type;
  }

  if (search) {
    query.$text = { $search: search as string };
  }

  // Calculate pagination
  const skip = (Number(page) - 1) * Number(limit);

  const exams = await Exam.find(query)
    .sort({ name: 1 })
    .skip(skip)
    .limit(Number(limit));

  const total = await Exam.countDocuments(query);

  const response: ApiResponse = {
    success: true,
    message: "Exams retrieved successfully",
    data: exams,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / Number(limit)),
    },
  };

  res.json(response);
});

// @desc    Get single exam
// @route   GET /api/exams/:id
// @access  Public
export const getExam = asyncHandler(async (req: Request, res: Response) => {
  const exam = await Exam.findById(req.params.id);

  if (!exam) {
    throw new CustomError("Exam not found", 404);
  }

  const response: ApiResponse = {
    success: true,
    message: "Exam retrieved successfully",
    data: exam,
  };

  res.json(response);
});

// @desc    Create exam
// @route   POST /api/exams
// @access  Private/Admin
export const createExam = asyncHandler(async (req: Request, res: Response) => {
  const exam = await Exam.create(req.body);

  const response: ApiResponse = {
    success: true,
    message: "Exam created successfully",
    data: exam,
  };

  res.status(201).json(response);
});

// @desc    Update exam
// @route   PUT /api/exams/:id
// @access  Private/Admin
export const updateExam = asyncHandler(async (req: Request, res: Response) => {
  const exam = await Exam.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!exam) {
    throw new CustomError("Exam not found", 404);
  }

  const response: ApiResponse = {
    success: true,
    message: "Exam updated successfully",
    data: exam,
  };

  res.json(response);
});

// @desc    Delete exam
// @route   DELETE /api/exams/:id
// @access  Private/Admin
export const deleteExam = asyncHandler(async (req: Request, res: Response) => {
  const exam = await Exam.findByIdAndDelete(req.params.id);

  if (!exam) {
    throw new CustomError("Exam not found", 404);
  }

  const response: ApiResponse = {
    success: true,
    message: "Exam deleted successfully",
  };

  res.json(response);
});

// @desc    Get exam types
// @route   GET /api/exams/types
// @access  Public
export const getExamTypes = asyncHandler(
  async (req: Request, res: Response) => {
    const types = await Exam.distinct("type");

    const response: ApiResponse = {
      success: true,
      message: "Exam types retrieved successfully",
      data: types,
    };

    res.json(response);
  }
);
