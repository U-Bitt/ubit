import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../types";

interface AISuggestRequest {
  gpa: string;
  sat: string;
  toefl: string;
  major: string;
}

interface UniversitySuggestion {
  id: string;
  name: string;
  location: string;
  ranking: number;
  rating: number;
  tuition: string;
  acceptance: string;
  students: string;
  image: string;
  programs: string[];
  highlights: string[];
  matchScore: number;
  reason: string;
  deadline: string;
}

// Mock AI suggestion logic - replace with actual AI service
const generateAISuggestions = (
  gpa: string,
  sat: string,
  toefl: string,
  major: string
): UniversitySuggestion[] => {
  const gpaNum = parseFloat(gpa.split("/")[0]);
  const satNum = parseInt(sat);
  const toeflNum = parseInt(toefl);

  // Mock university data with AI scoring
  const universities: UniversitySuggestion[] = [
    {
      id: "1",
      name: "Massachusetts Institute of Technology",
      location: "Cambridge, MA, USA",
      ranking: 1,
      rating: 4.8,
      tuition: "$57,986/year",
      acceptance: "6.7%",
      students: "15,000+",
      image: "/mit-campus-aerial.png",
      programs: ["Computer Science", "Engineering"],
      highlights: ["Computer Science", "Engineering"],
      matchScore: 0,
      reason: "",
      deadline: "Jan 1, 2025",
    },
    {
      id: "2",
      name: "Stanford University",
      location: "Stanford, CA, USA",
      ranking: 2,
      rating: 4.7,
      tuition: "$61,731/year",
      acceptance: "4.3%",
      students: "15,000+",
      image: "/stanford-campus.jpg",
      programs: ["Computer Science", "Business"],
      highlights: ["Computer Science", "Business"],
      matchScore: 0,
      reason: "",
      deadline: "Jan 2, 2025",
    },
    {
      id: "3",
      name: "Harvard University",
      location: "Cambridge, MA, USA",
      ranking: 3,
      rating: 4.9,
      tuition: "$57,261/year",
      acceptance: "3.4%",
      students: "15,000+",
      image: "/harvard-campus.jpg",
      programs: ["Liberal Arts", "Medicine"],
      highlights: ["Liberal Arts", "Medicine"],
      matchScore: 0,
      reason: "",
      deadline: "Jan 1, 2025",
    },
    {
      id: "4",
      name: "University of Oxford",
      location: "Oxford, UK",
      ranking: 4,
      rating: 4.6,
      tuition: "£26,770/year",
      acceptance: "17%",
      students: "15,000+",
      image: "/oxford-university-campus.jpg",
      programs: ["Philosophy", "Literature"],
      highlights: ["Philosophy", "Literature"],
      matchScore: 0,
      reason: "",
      deadline: "Oct 15, 2024",
    },
    {
      id: "5",
      name: "University of California, Berkeley",
      location: "Berkeley, CA, USA",
      ranking: 5,
      rating: 4.5,
      tuition: "$44,115/year (out-of-state)",
      acceptance: "14.5%",
      students: "45,000+",
      image: "/berkeley-logo.svg",
      programs: ["Computer Science", "Engineering"],
      highlights: ["Computer Science", "Engineering"],
      matchScore: 0,
      reason: "",
      deadline: "Nov 30, 2024",
    },
    {
      id: "6",
      name: "Carnegie Mellon University",
      location: "Pittsburgh, PA, USA",
      ranking: 8,
      rating: 4.4,
      tuition: "$61,344/year",
      acceptance: "15%",
      students: "16,000+",
      image: "/placeholder-logo.svg",
      programs: ["Computer Science", "AI"],
      highlights: ["Computer Science", "AI"],
      matchScore: 0,
      reason: "",
      deadline: "Jan 5, 2025",
    },
  ];

  // AI scoring algorithm
  return universities
    .map((uni) => {
      let score = 0;
      let reasons: string[] = [];

      // GPA scoring
      if (gpaNum >= 3.8) {
        score += 25;
        reasons.push("Өндөр GPA");
      } else if (gpaNum >= 3.5) {
        score += 20;
        reasons.push("Сайн GPA");
      } else if (gpaNum >= 3.0) {
        score += 15;
        reasons.push("Дундаж GPA");
      }

      // SAT scoring
      if (satNum >= 1500) {
        score += 25;
        reasons.push("Өндөр SAT оноо");
      } else if (satNum >= 1400) {
        score += 20;
        reasons.push("Сайн SAT оноо");
      } else if (satNum >= 1300) {
        score += 15;
        reasons.push("Дундаж SAT оноо");
      }

      // TOEFL scoring
      if (toeflNum >= 110) {
        score += 20;
        reasons.push("Өндөр TOEFL оноо");
      } else if (toeflNum >= 100) {
        score += 15;
        reasons.push("Сайн TOEFL оноо");
      } else if (toeflNum >= 90) {
        score += 10;
        reasons.push("Дундаж TOEFL оноо");
      }

      // Major matching
      if (
        uni.programs.some(
          (program) =>
            program.toLowerCase().includes(major.toLowerCase()) ||
            major.toLowerCase().includes(program.toLowerCase())
        )
      ) {
        score += 20;
        reasons.push("Тохирсон мэргэжил");
      }

      // Ranking adjustment
      if (uni.ranking <= 10) {
        score += 10;
        reasons.push("Дээд зэрэглэлийн их сургууль");
      } else if (uni.ranking <= 50) {
        score += 5;
        reasons.push("Сайн зэрэглэлийн их сургууль");
      }

      return {
        ...uni,
        matchScore: Math.min(score, 100),
        reason: reasons.join(", "),
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 5);
};

export const suggestUniversities = async (
  req: Request<{}, ApiResponse<UniversitySuggestion[]>, AISuggestRequest>,
  res: Response<ApiResponse<UniversitySuggestion[]>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { gpa, sat, toefl, major } = req.body;

    // Validate input
    if (!gpa || !sat || !toefl || !major) {
      const errorResponse: ApiResponse<UniversitySuggestion[]> = {
        success: false,
        message: "GPA, SAT, TOEFL, болон мэргэжил заавал оруулах шаардлагатай",
        data: [],
      };
      res.status(400).json(errorResponse);
      return;
    }

    // Generate AI suggestions
    const suggestions = generateAISuggestions(gpa, sat, toefl, major);

    const response: ApiResponse<UniversitySuggestion[]> = {
      success: true,
      message: "AI санал амжилттай үүсгэгдлээ",
      data: suggestions,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
