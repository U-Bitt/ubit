"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testScoreController = void 0;
const User_1 = __importDefault(require("../models/User"));
exports.testScoreController = {
    getAllTestScores: async (req, res) => {
        try {
            const userId = req.headers["user-id"] || "user-123";
            const user = await User_1.default.findById(userId).select("testScores");
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
        }
        catch (error) {
            console.error("Error fetching test scores:", error);
            res.status(500).json({
                success: false,
                message: "Failed to fetch test scores",
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    },
    createTestScore: async (req, res) => {
        try {
            const { examType, score, maxScore, certified, testDate, validityDate } = req.body;
            if (!examType || !score || !maxScore) {
                return res.status(400).json({
                    success: false,
                    message: "Exam type, score, and max score are required",
                });
            }
            const userId = req.headers["user-id"] || "user-123";
            const newTestScore = {
                id: Date.now().toString(),
                examType,
                score,
                maxScore,
                certified: certified || false,
                testDate: testDate || new Date().toISOString().split("T")[0],
                validityDate: validityDate ||
                    new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000)
                        .toISOString()
                        .split("T")[0],
            };
            const user = await User_1.default.findById(userId);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }
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
        }
        catch (error) {
            console.error("Error creating test score:", error);
            res.status(500).json({
                success: false,
                message: "Failed to create test score",
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    },
    updateTestScore: async (req, res) => {
        try {
            const { id } = req.params;
            const updates = req.body;
            const userId = req.headers["user-id"] || "user-123";
            const user = await User_1.default.findById(userId);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }
            const scoreIndex = user.testScores?.findIndex((score) => score.id === id || score._id?.toString() === id);
            if (scoreIndex === -1 || scoreIndex === undefined) {
                return res.status(404).json({
                    success: false,
                    message: "Test score not found",
                });
            }
            if (user.testScores && user.testScores[scoreIndex]) {
                user.testScores[scoreIndex] = { ...user.testScores[scoreIndex], ...updates };
                await user.save();
                res.status(200).json({
                    success: true,
                    data: user.testScores[scoreIndex],
                    message: "Test score updated successfully",
                });
            }
            else {
                return res.status(404).json({
                    success: false,
                    message: "Test score not found",
                });
            }
        }
        catch (error) {
            console.error("Error updating test score:", error);
            res.status(500).json({
                success: false,
                message: "Failed to update test score",
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    },
    deleteTestScore: async (req, res) => {
        try {
            const { id } = req.params;
            const userId = req.headers["user-id"] || "user-123";
            const user = await User_1.default.findById(userId);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }
            const scoreIndex = user.testScores?.findIndex((score) => score.id === id || score._id?.toString() === id);
            if (scoreIndex === -1 || scoreIndex === undefined) {
                return res.status(404).json({
                    success: false,
                    message: "Test score not found",
                });
            }
            if (user.testScores) {
                user.testScores.splice(scoreIndex, 1);
                await user.save();
            }
            res.status(200).json({
                success: true,
                message: "Test score deleted successfully",
            });
        }
        catch (error) {
            console.error("Error deleting test score:", error);
            res.status(500).json({
                success: false,
                message: "Failed to delete test score",
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    },
};
//# sourceMappingURL=testScoreController.js.map