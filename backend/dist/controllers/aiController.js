"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.suggestUniversities = void 0;
const University_1 = __importDefault(require("../models/University"));
const getGPAStatus = (gpa) => {
    if (gpa >= 3.9)
        return { status: "excellent", points: 20, required: "3.9+" };
    if (gpa >= 3.7)
        return { status: "good", points: 17, required: "3.7-3.8" };
    if (gpa >= 3.5)
        return { status: "good", points: 14, required: "3.5-3.6" };
    if (gpa >= 3.0)
        return { status: "average", points: 10, required: "3.0-3.4" };
    return {
        status: "below_average",
        points: 5,
        required: "Below 3.0",
    };
};
const getSATStatus = (sat) => {
    if (sat >= 1500)
        return { status: "excellent", points: 24, required: "1500+" };
    if (sat >= 1400)
        return { status: "good", points: 20, required: "1400-1499" };
    if (sat >= 1300)
        return { status: "good", points: 16, required: "1300-1399" };
    if (sat >= 1200)
        return { status: "average", points: 12, required: "1200-1299" };
    return {
        status: "below_average",
        points: 6,
        required: "Below 1200",
    };
};
const getIELTSStatus = (ielts) => {
    if (ielts >= 7.5)
        return { status: "excellent", points: 24, required: "7.5+" };
    if (ielts >= 7.0)
        return { status: "good", points: 20, required: "7.0-7.4" };
    if (ielts >= 6.5)
        return { status: "good", points: 16, required: "6.5-6.9" };
    if (ielts >= 6.0)
        return { status: "average", points: 12, required: "6.0-6.4" };
    return { status: "below_average", points: 6, required: "Below 6.0" };
};
const getMajorMatchStatus = (userMajor, programs) => {
    const matchingPrograms = programs.filter((program) => program.toLowerCase().includes(userMajor.toLowerCase()) ||
        userMajor.toLowerCase().includes(program.toLowerCase()));
    if (matchingPrograms.length > 0) {
        if (matchingPrograms.some((p) => p.toLowerCase().includes(userMajor.toLowerCase()))) {
            return { status: "perfect_match", points: 5, matchingPrograms };
        }
        return { status: "good_match", points: 3, matchingPrograms };
    }
    const partialMatches = programs.filter((program) => {
        const programWords = program.toLowerCase().split(/[\s,&-]+/);
        const majorWords = userMajor.toLowerCase().split(/[\s,&-]+/);
        return majorWords.some((word) => programWords.some((pWord) => pWord.includes(word) || word.includes(pWord)));
    });
    if (partialMatches.length > 0) {
        return {
            status: "partial_match",
            points: 2,
            matchingPrograms: partialMatches,
        };
    }
    return { status: "no_match", points: 0, matchingPrograms: [] };
};
const calculateBaselineScore = (gpaPoints, satPoints, ieltsPoints) => {
    const totalTestPoints = gpaPoints + satPoints + ieltsPoints;
    const maxTestPoints = 20 + 24 + 24;
    return Math.min((totalTestPoints / maxTestPoints) * 44, 44);
};
const scoreEssay = (essayContent) => {
    if (!essayContent || essayContent.length < 100)
        return 0;
    let score = 0;
    const wordCount = essayContent.split(/\s+/).length;
    if (wordCount >= 250 && wordCount <= 650)
        score += 5;
    if (essayContent.includes("I ") ||
        essayContent.includes("my ") ||
        essayContent.includes("me "))
        score += 5;
    if (essayContent.split(".").length >= 3)
        score += 5;
    if (essayContent.length > 500)
        score += 5;
    const hasIntroduction = essayContent.toLowerCase().includes("introduction") ||
        essayContent.split(".").length >= 2;
    const hasConclusion = essayContent.toLowerCase().includes("conclusion") ||
        essayContent.split(".").length >= 3;
    const hasMainPoint = wordCount >= 300;
    if (hasIntroduction)
        score += 5;
    if (hasConclusion)
        score += 5;
    if (hasMainPoint)
        score += 5;
    return Math.min(score, 30);
};
const scoreRecommendationLetters = (recommendations) => {
    if (!recommendations || recommendations.length === 0)
        return 0;
    let score = 0;
    const requiredCount = 2;
    const actualCount = Math.min(recommendations.length, requiredCount);
    score += actualCount * 5;
    recommendations.forEach((rec) => {
        if (rec.completed && rec.submitted)
            score += 2;
        if (rec.letterContent && rec.letterContent.length > 100)
            score += 3;
    });
    return Math.min(score, 15);
};
const scoreOtherDocuments = (documents) => {
    if (!documents || documents.length === 0)
        return 0;
    let score = 0;
    const requiredDocs = [
        "transcript",
        "certificate",
        "diploma",
        "test_score",
        "identification",
    ];
    requiredDocs.forEach((docType) => {
        const hasDoc = documents.some((doc) => (doc.type && doc.type.toLowerCase().includes(docType)) ||
            (doc.name && doc.name.toLowerCase().includes(docType)));
        if (hasDoc)
            score += 3;
    });
    documents.forEach((doc) => {
        if (doc.verified)
            score += 1;
        if (doc.complete)
            score += 1;
    });
    return Math.min(score, 20);
};
const calculateDocumentScore = (userDocuments) => {
    let totalScore = 0;
    if (userDocuments.essays) {
        const essayScore = scoreEssay(userDocuments.essays.content || "");
        totalScore += essayScore;
    }
    if (userDocuments.recommendations) {
        const recScore = scoreRecommendationLetters(userDocuments.recommendations);
        totalScore += recScore;
    }
    if (userDocuments.documents) {
        const docScore = scoreOtherDocuments(userDocuments.documents);
        totalScore += docScore;
    }
    return Math.min(totalScore, 20);
};
const calculateValueAddScore = () => {
    return 4;
};
const generateAISuggestions = async (gpa, sat, ieltsScore, major, userDocuments) => {
    const gpaNum = parseFloat(gpa.split("/")[0]);
    const satNum = parseInt(sat);
    const ieltsNum = parseFloat(ieltsScore);
    const universities = await University_1.default.find().lean();
    const suggestions = universities
        .map((uni) => {
        let compatibilityScore = 0;
        let reasons = [];
        let acceptanceProbability = 0;
        const gpaStatus = getGPAStatus(gpaNum);
        reasons.push(`${gpaStatus.status.replace("_", " ").toUpperCase()} GPA`);
        const satStatus = getSATStatus(satNum);
        reasons.push(`${satStatus.status.replace("_", " ").toUpperCase()} SAT Score`);
        const ieltsStatus = getIELTSStatus(ieltsNum);
        reasons.push(`${ieltsStatus.status.replace("_", " ").toUpperCase()} IELTS Score`);
        const majorStatus = getMajorMatchStatus(major, uni.programs);
        reasons.push(`${majorStatus.status.replace("_", " ").toUpperCase()} Major Match`);
        const baselineScore = calculateBaselineScore(gpaStatus.points, satStatus.points, ieltsStatus.points);
        const documentScore = calculateDocumentScore(userDocuments || {});
        const valueAddScore = calculateValueAddScore();
        const majorBonus = majorStatus.points;
        compatibilityScore = Math.round(Math.min(baselineScore + documentScore + valueAddScore + majorBonus, 80));
        acceptanceProbability = Math.round(Math.min(compatibilityScore * 0.8, 70));
        const uniAcceptanceRate = parseFloat(uni.acceptance.replace("%", ""));
        let rankingBonus = 0;
        if (uni.ranking <= 10) {
            rankingBonus = 5;
            reasons.push("Top Tier University");
            acceptanceProbability = Math.max(acceptanceProbability - 20, 5);
        }
        else if (uni.ranking <= 50) {
            rankingBonus = 3;
            reasons.push("High Ranking University");
            acceptanceProbability = Math.max(acceptanceProbability - 10, 10);
        }
        else if (uni.ranking <= 100) {
            rankingBonus = 1;
            reasons.push("Good University");
            acceptanceProbability = Math.max(acceptanceProbability - 5, 15);
        }
        else {
            acceptanceProbability = Math.min(acceptanceProbability + 10, 80);
        }
        compatibilityScore += rankingBonus;
        const finalAcceptanceProbability = Math.min(Math.max(acceptanceProbability - uniAcceptanceRate / 2, 5), 95);
        return {
            id: uni._id.toString(),
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
        .filter((uni) => uni.matchScore >= 30)
        .reduce((unique, uni) => {
        if (!unique.find((u) => u.name === uni.name)) {
            unique.push(uni);
        }
        return unique;
    }, [])
        .sort((a, b) => {
        if (a.matchScore !== b.matchScore) {
            return b.matchScore - a.matchScore;
        }
        return a.ranking - b.ranking;
    })
        .slice(0, 6);
    return suggestions;
};
const suggestUniversities = async (req, res, next) => {
    try {
        const { gpa, sat, toefl, major, documents } = req.body;
        if (!gpa || !sat || !toefl || !major) {
            const errorResponse = {
                success: false,
                message: "GPA, SAT, IELTS, and major are required",
                data: [],
            };
            res.status(400).json(errorResponse);
            return;
        }
        const suggestions = await generateAISuggestions(gpa, sat, toefl, major, documents);
        const response = {
            success: true,
            message: `Found ${suggestions.length} compatible universities based on your academic profile`,
            data: suggestions,
        };
        res.status(200).json(response);
    }
    catch (error) {
        console.error("Error generating AI suggestions:", error);
        next(error);
    }
};
exports.suggestUniversities = suggestUniversities;
//# sourceMappingURL=aiController.js.map