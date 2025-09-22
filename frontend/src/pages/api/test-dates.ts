/**
 * API endpoint for fetching real-time test dates
 * This could be extended to fetch from actual exam provider APIs
 */

import { NextApiRequest, NextApiResponse } from "next";
import {
  getRealisticTestDate,
  getAllExamSchedules,
} from "@/utils/testDateService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { exam } = req.query;

    if (exam) {
      // Return specific exam date
      const testDateInfo = getRealisticTestDate(exam as string);
      return res.status(200).json({
        exam,
        ...testDateInfo,
        lastUpdated: new Date().toISOString(),
      });
    } else {
      // Return all exam schedules
      const allSchedules = getAllExamSchedules();
      const examDates = allSchedules.map(schedule => ({
        exam: schedule.name,
        category: schedule.category,
        ...getRealisticTestDate(schedule.name),
      }));

      return res.status(200).json({
        exams: examDates,
        lastUpdated: new Date().toISOString(),
        count: examDates.length,
      });
    }
  } catch (error) {
    console.error("Error fetching test dates:", error);
    return res.status(500).json({
      error: "Failed to fetch test dates",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

// Example usage:
// GET /api/test-dates - Get all exam dates
// GET /api/test-dates?exam=SAT - Get specific exam date
