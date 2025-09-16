"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExamsByType = exports.getExamById = exports.getAllExams = void 0;
const exams = [
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
        description: "World's most popular English language test for higher education.",
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
const getAllExams = async (req, res, next) => {
    try {
        const response = {
            success: true,
            data: exams,
        };
        res.status(200).json(response);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllExams = getAllExams;
const getExamById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const exam = exams.find((e) => e.id === id);
        if (!exam) {
            res.status(404).json({
                success: false,
                data: {},
                message: "Exam not found",
            });
            return;
        }
        const response = {
            success: true,
            data: exam,
        };
        res.status(200).json(response);
    }
    catch (error) {
        next(error);
    }
};
exports.getExamById = getExamById;
const getExamsByType = async (req, res, next) => {
    try {
        const { type } = req.params;
        let filteredExams = exams;
        if (type.toLowerCase() === "english") {
            filteredExams = exams.filter((exam) => exam.name.toLowerCase().includes("toefl") ||
                exam.name.toLowerCase().includes("ielts"));
        }
        else if (type.toLowerCase() === "graduate") {
            filteredExams = exams.filter((exam) => exam.name.toLowerCase().includes("gre") ||
                exam.name.toLowerCase().includes("gmat"));
        }
        else if (type.toLowerCase() === "undergraduate") {
            filteredExams = exams.filter((exam) => exam.name.toLowerCase().includes("sat"));
        }
        const response = {
            success: true,
            data: filteredExams,
        };
        res.status(200).json(response);
    }
    catch (error) {
        next(error);
    }
};
exports.getExamsByType = getExamsByType;
//# sourceMappingURL=examController.js.map