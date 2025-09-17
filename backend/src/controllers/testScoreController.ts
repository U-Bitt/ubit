import { Request, Response } from "express";

// Mock data for now - in production this would come from database
let testScores = [
  {
    id: "1",
    examType: "SAT",
    score: "1450",
    maxScore: "1600",
    certified: true,
    testDate: "2024-10-15",
    validityDate: "2026-10-15",
    userId: "user1",
  },
  {
    id: "2",
    examType: "IELTS",
    score: "7.5",
    maxScore: "9.0",
    certified: true,
    testDate: "2024-09-20",
    validityDate: "2026-09-20",
    userId: "user1",
  },
];

export const testScoreController = {
  // Get all test scores for a user
  getAllTestScores: async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    try {
      // In production, filter by authenticated user ID
      const userId = (req.headers["user-id"] as string) || "user1";
      const userTestScores = testScores.filter(
        (score) => score.userId === userId
      );

      res.status(200).json({
        success: true,
        data: userTestScores,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch test scores",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  // Create a new test score
  createTestScore: async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    try {
      const { examType, score, maxScore, certified, testDate, validityDate } =
        req.body;

      // Validate required fields
      if (!examType || !score || !maxScore) {
        return res.status(400).json({
          success: false,
          message: "Exam type, score, and max score are required",
        });
      }

      const newTestScore = {
        id: Date.now().toString(),
        examType,
        score,
        maxScore,
        certified: certified || false,
        testDate: testDate || new Date().toISOString().split("T")[0],
        validityDate:
          validityDate ||
          new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0], // 2 years from now
        userId: (req.headers["user-id"] as string) || "user1",
      };

      testScores.push(newTestScore);

      res.status(201).json({
        success: true,
        data: newTestScore,
        message: "Test score created successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to create test score",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  // Update a test score
  updateTestScore: async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    try {
      const { id } = req.params;
      const updates = req.body;

      const scoreIndex = testScores.findIndex((score) => score.id === id);
      if (scoreIndex === -1) {
        return res.status(404).json({
          success: false,
          message: "Test score not found",
        });
      }

      testScores[scoreIndex] = { ...testScores[scoreIndex], ...updates };

      res.status(200).json({
        success: true,
        data: testScores[scoreIndex],
        message: "Test score updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to update test score",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  // Delete a test score
  deleteTestScore: async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    try {
      const { id } = req.params;

      const scoreIndex = testScores.findIndex((score) => score.id === id);
      if (scoreIndex === -1) {
        return res.status(404).json({
          success: false,
          message: "Test score not found",
        });
      }

      testScores.splice(scoreIndex, 1);

      res.status(200).json({
        success: true,
        message: "Test score deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to delete test score",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
};
