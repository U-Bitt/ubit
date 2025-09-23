"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.suggestUniversities = void 0;
const generateAISuggestions = (gpa, sat, toefl, major) => {
    const gpaNum = parseFloat(gpa.split("/")[0]);
    const satNum = parseInt(sat);
    const toeflNum = parseInt(toefl);
    const universities = [
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
    return universities
        .map((uni) => {
        let score = 0;
        let reasons = [];
        if (gpaNum >= 3.8) {
            score += 25;
            reasons.push("High GPA");
        }
        else if (gpaNum >= 3.5) {
            score += 20;
            reasons.push("Good GPA");
        }
        else if (gpaNum >= 3.0) {
            score += 15;
            reasons.push("Average GPA");
        }
        if (satNum >= 1500) {
            score += 25;
            reasons.push("High SAT Score");
        }
        else if (satNum >= 1400) {
            score += 20;
            reasons.push("Good SAT Score");
        }
        else if (satNum >= 1300) {
            score += 15;
            reasons.push("Average SAT Score");
        }
        if (toeflNum >= 110) {
            score += 20;
            reasons.push("High TOEFL Score");
        }
        else if (toeflNum >= 100) {
            score += 15;
            reasons.push("Good TOEFL Score");
        }
        else if (toeflNum >= 90) {
            score += 10;
            reasons.push("Average TOEFL Score");
        }
        if (uni.programs.some((program) => program.toLowerCase().includes(major.toLowerCase()) ||
            major.toLowerCase().includes(program.toLowerCase()))) {
            score += 20;
            reasons.push("Matching Major");
        }
        if (uni.ranking <= 10) {
            score += 10;
            reasons.push("Top Tier University");
        }
        else if (uni.ranking <= 50) {
            score += 5;
            reasons.push("High Ranking University");
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
const suggestUniversities = async (req, res, next) => {
    try {
        const { gpa, sat, toefl, major } = req.body;
        if (!gpa || !sat || !toefl || !major) {
            const errorResponse = {
                success: false,
                message: "GPA, SAT, TOEFL, and major are required",
                data: [],
            };
            res.status(400).json(errorResponse);
            return;
        }
        const suggestions = generateAISuggestions(gpa, sat, toefl, major);
        const response = {
            success: true,
            message: "AI suggestions generated successfully",
            data: suggestions,
        };
        res.status(200).json(response);
    }
    catch (error) {
        next(error);
    }
};
exports.suggestUniversities = suggestUniversities;
//# sourceMappingURL=aiController.js.map