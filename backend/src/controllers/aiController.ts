import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../types";
import UniversityModel from "../models/University";

interface AISuggestRequest {
  gpa: string;
  sat: string;
  toefl: string; // This will contain IELTS score from frontend
  major: string;
  documents?: {
    essays?: {
      content?: string;
    };
    recommendations?: Array<{
      completed?: boolean;
      submitted?: boolean;
      letterContent?: string;
    }>;
    documents?: Array<{
      type?: string;
      name?: string;
      verified?: boolean;
      complete?: boolean;
    }>;
  };
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
  scoreDetails: {
    gpa: {
      yourScore: number;
      required: string;
      status: "excellent" | "good" | "average" | "below_average";
      points: number;
    };
    sat: {
      yourScore: number;
      required: string;
      status: "excellent" | "good" | "average" | "below_average";
      points: number;
    };
    ielts: {
      yourScore: number;
      required: string;
      status: "excellent" | "good" | "average" | "below_average";
      points: number;
    };
    major: {
      yourMajor: string;
      matchingPrograms: string[];
      status: "perfect_match" | "good_match" | "partial_match" | "no_match";
      points: number;
    };
  };
}

// Helper function to get GPA status and points (25% of total 80%)
const getGPAStatus = (gpa: number) => {
  if (gpa >= 3.9)
    return { status: "excellent" as const, points: 20, required: "3.9+" }; // 25% of 80%
  if (gpa >= 3.7)
    return { status: "good" as const, points: 17, required: "3.7-3.8" };
  if (gpa >= 3.5)
    return { status: "good" as const, points: 14, required: "3.5-3.6" };
  if (gpa >= 3.0)
    return { status: "average" as const, points: 10, required: "3.0-3.4" };
  return {
    status: "below_average" as const,
    points: 5,
    required: "Below 3.0",
  };
};

// Helper function to get SAT status and points (30% of total 80%)
const getSATStatus = (sat: number) => {
  if (sat >= 1500)
    return { status: "excellent" as const, points: 24, required: "1500+" }; // 30% of 80%
  if (sat >= 1400)
    return { status: "good" as const, points: 20, required: "1400-1499" };
  if (sat >= 1300)
    return { status: "good" as const, points: 16, required: "1300-1399" };
  if (sat >= 1200)
    return { status: "average" as const, points: 12, required: "1200-1299" };
  return {
    status: "below_average" as const,
    points: 6,
    required: "Below 1200",
  };
};

// Helper function to get IELTS status and points (30% of total 80%)
const getIELTSStatus = (ielts: number) => {
  if (ielts >= 7.5)
    return { status: "excellent" as const, points: 24, required: "7.5+" }; // 30% of 80%
  if (ielts >= 7.0)
    return { status: "good" as const, points: 20, required: "7.0-7.4" };
  if (ielts >= 6.5)
    return { status: "good" as const, points: 16, required: "6.5-6.9" };
  if (ielts >= 6.0)
    return { status: "average" as const, points: 12, required: "6.0-6.4" };
  return { status: "below_average" as const, points: 6, required: "Below 6.0" };
};

// Helper function to get major match status (baseline qualification)
const getMajorMatchStatus = (userMajor: string, programs: string[]) => {
  const matchingPrograms = programs.filter(
    (program) =>
      program.toLowerCase().includes(userMajor.toLowerCase()) ||
      userMajor.toLowerCase().includes(program.toLowerCase())
  );

  if (matchingPrograms.length > 0) {
    if (
      matchingPrograms.some((p) =>
        p.toLowerCase().includes(userMajor.toLowerCase())
      )
    ) {
      return { status: "perfect_match" as const, points: 5, matchingPrograms }; // Small bonus for perfect match
    }
    return { status: "good_match" as const, points: 3, matchingPrograms };
  }

  // Check for partial matches
  const partialMatches = programs.filter((program) => {
    const programWords = program.toLowerCase().split(/[\s,&-]+/);
    const majorWords = userMajor.toLowerCase().split(/[\s,&-]+/);
    return majorWords.some((word) =>
      programWords.some((pWord) => pWord.includes(word) || word.includes(pWord))
    );
  });

  if (partialMatches.length > 0) {
    return {
      status: "partial_match" as const,
      points: 2,
      matchingPrograms: partialMatches,
    };
  }

  return { status: "no_match" as const, points: 0, matchingPrograms: [] };
};

// Helper function to calculate baseline score (GPA + Test Scores = 55% of 80%)
const calculateBaselineScore = (
  gpaPoints: number,
  satPoints: number,
  ieltsPoints: number
) => {
  // Baseline = 55% of 80% = 44 points max
  const totalTestPoints = gpaPoints + satPoints + ieltsPoints;
  const maxTestPoints = 20 + 24 + 24; // 68 points max for tests
  return Math.min((totalTestPoints / maxTestPoints) * 44, 44);
};

// Helper function to score essay based on structure and content
const scoreEssay = (essayContent: string) => {
  if (!essayContent || essayContent.length < 100) return 0;

  let score = 0;
  const wordCount = essayContent.split(/\s+/).length;

  // Basic requirements (5 points each)
  if (wordCount >= 250 && wordCount <= 650) score += 5; // Length requirement
  if (
    essayContent.includes("I ") ||
    essayContent.includes("my ") ||
    essayContent.includes("me ")
  )
    score += 5; // Personal voice
  if (essayContent.split(".").length >= 3) score += 5; // Multiple sentences/paragraphs
  if (essayContent.length > 500) score += 5; // Substantial content

  // Essay structure analysis (5 points each)
  const hasIntroduction =
    essayContent.toLowerCase().includes("introduction") ||
    essayContent.split(".").length >= 2;
  const hasConclusion =
    essayContent.toLowerCase().includes("conclusion") ||
    essayContent.split(".").length >= 3;
  const hasMainPoint = wordCount >= 300; // Substantial main point development

  if (hasIntroduction) score += 5;
  if (hasConclusion) score += 5;
  if (hasMainPoint) score += 5;

  return Math.min(score, 30); // Max 30 points for essay
};

// Helper function to score recommendation letters (simple checklist)
const scoreRecommendationLetters = (recommendations: any[]) => {
  if (!recommendations || recommendations.length === 0) return 0;

  let score = 0;
  const requiredCount = 2; // Usually need 2 recommendation letters
  const actualCount = Math.min(recommendations.length, requiredCount);

  // 5 points per recommendation letter (up to 2)
  score += actualCount * 5;

  // Additional points for completeness
  recommendations.forEach((rec) => {
    if (rec.completed && rec.submitted) score += 2; // Submitted
    if (rec.letterContent && rec.letterContent.length > 100) score += 3; // Has content
  });

  return Math.min(score, 15); // Max 15 points for recommendations
};

// Helper function to score other documents (transcripts, certificates, etc.)
const scoreOtherDocuments = (documents: any[]) => {
  if (!documents || documents.length === 0) return 0;

  let score = 0;
  const requiredDocs = [
    "transcript",
    "certificate",
    "diploma",
    "test_score",
    "identification",
  ];

  // Check for each required document type
  requiredDocs.forEach((docType) => {
    const hasDoc = documents.some(
      (doc) =>
        (doc.type && doc.type.toLowerCase().includes(docType)) ||
        (doc.name && doc.name.toLowerCase().includes(docType))
    );
    if (hasDoc) score += 3; // 3 points per document type
  });

  // Additional points for document completeness
  documents.forEach((doc) => {
    if (doc.verified) score += 1; // Verified document
    if (doc.complete) score += 1; // Complete document
  });

  return Math.min(score, 20); // Max 20 points for other documents
};

// Helper function to calculate document score (25% of 80% = 20 points max)
const calculateDocumentScore = (userDocuments: any) => {
  let totalScore = 0;

  // Essay scoring (up to 15 points)
  if (userDocuments.essays) {
    const essayScore = scoreEssay(userDocuments.essays.content || "");
    totalScore += essayScore;
  }

  // Recommendation letters (up to 15 points)
  if (userDocuments.recommendations) {
    const recScore = scoreRecommendationLetters(userDocuments.recommendations);
    totalScore += recScore;
  }

  // Other documents (up to 20 points)
  if (userDocuments.documents) {
    const docScore = scoreOtherDocuments(userDocuments.documents);
    totalScore += docScore;
  }

  return Math.min(totalScore, 20); // Cap at 20 points (25% of 80%)
};

// Helper function to calculate value-add score (Extracurricular + Awards + Portfolio = 20% of 80%)
const calculateValueAddScore = () => {
  // Placeholder: Extracurricular + Awards + Portfolio = 16 points max (20% of 80%)
  // For now, return a base score since we don't have this data
  return 4; // Base score for having basic profile
};

// Advanced AI suggestion logic with detailed score analysis
const generateAISuggestions = async (
  gpa: string,
  sat: string,
  ieltsScore: string,
  major: string,
  userDocuments?: any
): Promise<UniversitySuggestion[]> => {
  const gpaNum = parseFloat(gpa.split("/")[0]);
  const satNum = parseInt(sat);
  const ieltsNum = parseFloat(ieltsScore);

  // Get all universities from database
  const universities = await UniversityModel.find().lean();

  // Convert to suggestion format and calculate compatibility
  const suggestions = universities
    .map((uni) => {
      let compatibilityScore = 0;
      let reasons: string[] = [];
      let acceptanceProbability = 0;

      // GPA Analysis with detailed scoring (25% of 80%)
      const gpaStatus = getGPAStatus(gpaNum);
      reasons.push(`${gpaStatus.status.replace("_", " ").toUpperCase()} GPA`);

      // SAT Analysis with detailed scoring (30% of 80%)
      const satStatus = getSATStatus(satNum);
      reasons.push(
        `${satStatus.status.replace("_", " ").toUpperCase()} SAT Score`
      );

      // IELTS Analysis with detailed scoring (30% of 80%)
      const ieltsStatus = getIELTSStatus(ieltsNum);
      reasons.push(
        `${ieltsStatus.status.replace("_", " ").toUpperCase()} IELTS Score`
      );

      // Major Matching (small bonus)
      const majorStatus = getMajorMatchStatus(major, uni.programs);
      reasons.push(
        `${majorStatus.status.replace("_", " ").toUpperCase()} Major Match`
      );

      // Calculate comprehensive score using new system
      const baselineScore = calculateBaselineScore(
        gpaStatus.points,
        satStatus.points,
        ieltsStatus.points
      );
      const documentScore = calculateDocumentScore(userDocuments || {});
      const valueAddScore = calculateValueAddScore();
      const majorBonus = majorStatus.points;

      // Total score out of 80 points max
      compatibilityScore = Math.round(
        Math.min(baselineScore + documentScore + valueAddScore + majorBonus, 80)
      );

      // Acceptance probability based on comprehensive score
      acceptanceProbability = Math.round(
        Math.min(compatibilityScore * 0.8, 70)
      );

      // University Ranking Impact on Acceptance
      const uniAcceptanceRate = parseFloat(uni.acceptance.replace("%", ""));
      let rankingBonus = 0;

      if (uni.ranking <= 10) {
        rankingBonus = 5;
        reasons.push("Top Tier University");
        acceptanceProbability = Math.max(acceptanceProbability - 20, 5);
      } else if (uni.ranking <= 50) {
        rankingBonus = 3;
        reasons.push("High Ranking University");
        acceptanceProbability = Math.max(acceptanceProbability - 10, 10);
      } else if (uni.ranking <= 100) {
        rankingBonus = 1;
        reasons.push("Good University");
        acceptanceProbability = Math.max(acceptanceProbability - 5, 15);
      } else {
        acceptanceProbability = Math.min(acceptanceProbability + 10, 80);
      }

      compatibilityScore += rankingBonus;

      // Calculate final acceptance probability
      const finalAcceptanceProbability = Math.min(
        Math.max(acceptanceProbability - uniAcceptanceRate / 2, 5),
        95
      );

      return {
        id: (uni._id as any).toString(),
        name: uni.name,
        location: uni.location,
        ranking: uni.ranking,
        rating: uni.rating,
        tuition: uni.tuition,
        acceptance: uni.acceptance,
        students: uni.students,
        image: uni.image,
        programs: uni.programs,
        highlights: uni.highlights,
        matchScore: Math.min(compatibilityScore, 100),
        reason: reasons.join(", "),
        deadline: uni.deadline,
        scoreDetails: {
          gpa: {
            yourScore: gpaNum,
            required: gpaStatus.required,
            status: gpaStatus.status,
            points: gpaStatus.points,
          },
          sat: {
            yourScore: satNum,
            required: satStatus.required,
            status: satStatus.status,
            points: satStatus.points,
          },
          ielts: {
            yourScore: ieltsNum,
            required: ieltsStatus.required,
            status: ieltsStatus.status,
            points: ieltsStatus.points,
          },
          major: {
            yourMajor: major,
            matchingPrograms: majorStatus.matchingPrograms,
            status: majorStatus.status,
            points: majorStatus.points,
          },
        },
      };
    })
    .filter((uni) => uni.matchScore >= 30) // Filter out very low compatibility
    .reduce((unique, uni) => {
      // Remove duplicates by university name
      if (!unique.find((u) => u.name === uni.name)) {
        unique.push(uni);
      }
      return unique;
    }, [] as UniversitySuggestion[])
    .sort((a, b) => {
      // Sort by match score first, then by ranking (lower ranking = better)
      if (a.matchScore !== b.matchScore) {
        return b.matchScore - a.matchScore;
      }
      return a.ranking - b.ranking;
    })
    .slice(0, 6); // Return top 6 universities

  return suggestions;
};

export const suggestUniversities = async (
  req: Request<{}, ApiResponse<UniversitySuggestion[]>, AISuggestRequest>,
  res: Response<ApiResponse<UniversitySuggestion[]>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { gpa, sat, toefl, major, documents } = req.body;

    // Validate input
    if (!gpa || !sat || !toefl || !major) {
      const errorResponse: ApiResponse<UniversitySuggestion[]> = {
        success: false,
        message: "GPA, SAT, IELTS, and major are required",
        data: [],
      };
      res.status(400).json(errorResponse);
      return;
    }

    // Generate AI suggestions using database with document scoring
    const suggestions = await generateAISuggestions(
      gpa,
      sat,
      toefl,
      major,
      documents
    );

    const response: ApiResponse<UniversitySuggestion[]> = {
      success: true,
      message: `Found ${suggestions.length} compatible universities based on your academic profile`,
      data: suggestions,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error generating AI suggestions:", error);
    next(error);
  }
};
