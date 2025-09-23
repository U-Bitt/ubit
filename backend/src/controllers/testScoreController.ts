import { Request, Response } from "express";
import User from "../models/User";

export const testScoreController = {
  // Get all test scores for a user
  getAllTestScores: async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    try {
      const userId = (req.headers["x-user-id"] as string) || "user-123";

      // Find user and return their test scores
      const user = await User.findById(userId).select("testScores");

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res.status(200).json({
        success: true,
        data: user.testScores || [],
      });
    } catch (error) {
      console.error("Error fetching test scores:", error);
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

      const userId = (req.headers["x-user-id"] as string) || "user-123";

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
      };

      // Find user and add test score
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // Initialize testScores array if it doesn't exist
      if (!user.testScores) {
        user.testScores = [];
      }

      user.testScores.push(newTestScore);
      await user.save();

      res.status(201).json({
        success: true,
        data: newTestScore,
        message: "Test score created successfully",
      });
    } catch (error) {
      console.error("Error creating test score:", error);
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
      const userId = (req.headers["x-user-id"] as string) || "user-123";

      // Find user
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // Find the test score to update by custom id field or MongoDB _id
      const scoreIndex = user.testScores?.findIndex(
        (score: any) => score.id === id || score._id?.toString() === id
      );

      if (scoreIndex === -1 || scoreIndex === undefined) {
        return res.status(404).json({
          success: false,
          message: "Test score not found",
        });
      }

      // Update the test score
      if (user.testScores && user.testScores[scoreIndex]) {
        user.testScores[scoreIndex] = {
          ...user.testScores[scoreIndex],
          ...updates,
        };
        await user.save();

        res.status(200).json({
          success: true,
          data: user.testScores[scoreIndex],
          message: "Test score updated successfully",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "Test score not found",
        });
      }
    } catch (error) {
      console.error("Error updating test score:", error);
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
      const userId = (req.headers["x-user-id"] as string) || "user-123";

      // Find user
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // Find the test score to delete by custom id field or MongoDB _id
      const scoreIndex = user.testScores?.findIndex(
        (score: any) => score.id === id || score._id?.toString() === id
      );

      if (scoreIndex === -1 || scoreIndex === undefined) {
        return res.status(404).json({
          success: false,
          message: "Test score not found",
        });
      }

      // Remove the test score
      if (user.testScores) {
        user.testScores.splice(scoreIndex, 1);
        await user.save();
      }

      res.status(200).json({
        success: true,
        message: "Test score deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting test score:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete test score",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
};
