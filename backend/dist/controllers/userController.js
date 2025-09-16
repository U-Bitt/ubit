"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApplication = exports.getUserApplications = exports.updateUserProfile = exports.getUserProfile = void 0;
let currentUser = {
    id: "user_1",
    email: "user@example.com",
    firstName: "John",
    lastName: "Doe",
    dateOfBirth: "1995-01-01",
    nationality: "Mongolian",
    phone: "+976-12345678",
    avatar: "/placeholder-user.jpg",
    preferences: {
        countries: ["usa", "uk", "canada"],
        programs: ["Computer Science", "Engineering"],
        budget: {
            min: 20000,
            max: 50000,
            currency: "USD",
        },
        examScores: {
            toefl: 100,
            gre: 320,
        },
    },
    applications: [],
    createdAt: new Date(),
    updatedAt: new Date(),
};
let applications = [
    {
        id: "app_1",
        universityId: "mit",
        program: "Computer Science",
        status: "submitted",
        documents: ["transcript", "recommendation_1", "recommendation_2"],
        submittedAt: new Date("2024-10-01"),
        deadline: new Date("2025-01-01"),
    },
    {
        id: "app_2",
        universityId: "stanford",
        program: "Engineering",
        status: "under_review",
        documents: [
            "transcript",
            "recommendation_1",
            "recommendation_2",
            "portfolio",
        ],
        submittedAt: new Date("2024-10-15"),
        deadline: new Date("2025-01-02"),
    },
];
const getUserProfile = async (req, res, next) => {
    try {
        const response = {
            success: true,
            data: currentUser,
        };
        res.status(200).json(response);
    }
    catch (error) {
        next(error);
    }
};
exports.getUserProfile = getUserProfile;
const updateUserProfile = async (req, res, next) => {
    try {
        const updates = req.body;
        currentUser = {
            ...currentUser,
            ...updates,
            updatedAt: new Date(),
        };
        const response = {
            success: true,
            data: currentUser,
            message: "Profile updated successfully",
        };
        res.status(200).json(response);
    }
    catch (error) {
        next(error);
    }
};
exports.updateUserProfile = updateUserProfile;
const getUserApplications = async (req, res, next) => {
    try {
        const response = {
            success: true,
            data: applications,
        };
        res.status(200).json(response);
    }
    catch (error) {
        next(error);
    }
};
exports.getUserApplications = getUserApplications;
const createApplication = async (req, res, next) => {
    try {
        const newApplication = {
            ...req.body,
            id: `app_${Date.now()}`,
            status: "draft",
            documents: [],
        };
        applications.push(newApplication);
        const response = {
            success: true,
            data: newApplication,
            message: "Application created successfully",
        };
        res.status(201).json(response);
    }
    catch (error) {
        next(error);
    }
};
exports.createApplication = createApplication;
//# sourceMappingURL=userController.js.map