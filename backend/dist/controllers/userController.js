"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAreasOfInterest = exports.updateAcademicInfo = exports.updatePersonalInfo = exports.unsaveUniversity = exports.saveUniversity = exports.getSavedUniversities = exports.deleteDocument = exports.updateDocument = exports.addDocument = exports.getDocuments = exports.deleteTestScore = exports.updateTestScore = exports.addTestScore = exports.getTestScores = exports.deleteApplication = exports.updateApplication = exports.createApplication = exports.getUserApplications = exports.deleteUser = exports.updateUserProfile = exports.getUserProfile = exports.updateUserById = exports.getUserById = exports.getAllUsers = exports.loginUser = exports.registerUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_EXPIRE = process.env.JWT_EXPIRE || "7d";
const generateToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
};
const registerUser = async (req, res, next) => {
    try {
        const { email, password, firstName, lastName, nationality, phone } = req.body;
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({
                success: false,
                data: {},
                message: "User already exists with this email",
            });
            return;
        }
        const user = new User_1.default({
            email,
            password,
            firstName,
            lastName,
            nationality,
            phone,
        });
        await user.save();
        const token = generateToken(user._id.toString());
        const userData = {
            id: user._id.toString(),
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            dateOfBirth: user.dateOfBirth?.toISOString(),
            nationality: user.nationality,
            phone: user.phone,
            avatar: user.avatar,
            preferences: user.preferences,
            applications: user.applications,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
        res.status(201).json({
            success: true,
            data: { user: userData, token },
            message: "User registered successfully",
        });
    }
    catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({
            success: false,
            data: {},
            message: "Internal server error",
        });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User_1.default.findOne({ email }).select("+password");
        if (!user) {
            res.status(401).json({
                success: false,
                data: {},
                message: "Invalid credentials",
            });
            return;
        }
        if (!user.isActive) {
            res.status(401).json({
                success: false,
                data: {},
                message: "Account is deactivated",
            });
            return;
        }
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            res.status(401).json({
                success: false,
                data: {},
                message: "Invalid credentials",
            });
            return;
        }
        user.lastLogin = new Date();
        await user.save();
        const token = generateToken(user._id.toString());
        const userData = {
            id: user._id.toString(),
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            dateOfBirth: user.dateOfBirth?.toISOString(),
            nationality: user.nationality,
            phone: user.phone,
            avatar: user.avatar,
            preferences: user.preferences,
            applications: user.applications,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
        res.status(200).json({
            success: true,
            data: { user: userData, token },
            message: "Login successful",
        });
    }
    catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({
            success: false,
            data: {},
            message: "Internal server error",
        });
    }
};
exports.loginUser = loginUser;
const getAllUsers = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, sort = "createdAt", order = "desc" } = req.query;
        const sortObj = {};
        sortObj[sort] = order === "asc" ? 1 : -1;
        const skip = (page - 1) * limit;
        const users = await User_1.default.find({ isActive: true })
            .sort(sortObj)
            .skip(skip)
            .limit(limit)
            .lean();
        const total = await User_1.default.countDocuments({ isActive: true });
        const userData = users.map((user) => ({
            id: user._id.toString(),
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            dateOfBirth: user.dateOfBirth?.toISOString(),
            nationality: user.nationality,
            phone: user.phone,
            avatar: user.avatar,
            preferences: user.preferences,
            applications: user.applications,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }));
        res.status(200).json({
            success: true,
            data: userData,
            message: "Users retrieved successfully",
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                pages: Math.ceil(total / Number(limit)),
            },
        });
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({
            success: false,
            data: [],
            message: "Internal server error",
        });
    }
};
exports.getAllUsers = getAllUsers;
const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            res.status(400).json({
                success: false,
                data: {},
                message: "Invalid user ID format",
            });
            return;
        }
        const user = await User_1.default.findById(id).lean();
        if (!user) {
            res.status(404).json({
                success: false,
                data: {},
                message: "User not found",
            });
            return;
        }
        const userData = {
            id: user._id.toString(),
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            dateOfBirth: user.dateOfBirth?.toISOString(),
            nationality: user.nationality,
            phone: user.phone,
            avatar: user.avatar,
            personalInfo: user.personalInfo ? {
                ...user.personalInfo,
                dateOfBirth: user.personalInfo.dateOfBirth?.toISOString(),
            } : undefined,
            academicInfo: user.academicInfo,
            areasOfInterest: user.areasOfInterest,
            testScores: user.testScores?.map(score => ({
                id: score.id,
                testName: score.examType,
                score: score.score,
                date: score.testDate,
                maxScore: score.maxScore,
                percentile: 0,
            })),
            documents: user.documents?.map(doc => ({
                ...doc,
                uploadedAt: doc.uploadedAt.toISOString(),
            })),
            savedUniversities: user.savedUniversities?.map(saved => ({
                ...saved,
                savedAt: saved.savedAt.toISOString(),
            })),
            preferences: user.preferences,
            applications: user.applications,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
        res.status(200).json({
            success: true,
            data: userData,
            message: "User retrieved successfully",
        });
    }
    catch (error) {
        console.error("Error fetching user by ID:", error);
        res.status(500).json({
            success: false,
            data: {},
            message: "Internal server error",
        });
    }
};
exports.getUserById = getUserById;
const updateUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            res.status(400).json({
                success: false,
                data: {},
                message: "Invalid user ID format",
            });
            return;
        }
        const user = await User_1.default.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).lean();
        if (!user) {
            res.status(404).json({
                success: false,
                data: {},
                message: "User not found",
            });
            return;
        }
        const userData = {
            id: user._id.toString(),
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            dateOfBirth: user.dateOfBirth?.toISOString(),
            nationality: user.nationality,
            phone: user.phone,
            avatar: user.avatar,
            personalInfo: user.personalInfo ? {
                ...user.personalInfo,
                dateOfBirth: user.personalInfo.dateOfBirth?.toISOString(),
            } : undefined,
            academicInfo: user.academicInfo,
            areasOfInterest: user.areasOfInterest,
            preferences: user.preferences,
            applications: user.applications,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
        res.status(200).json({
            success: true,
            data: userData,
            message: "User updated successfully",
        });
    }
    catch (error) {
        console.error("Error updating user by ID:", error);
        res.status(500).json({
            success: false,
            data: {},
            message: "Internal server error",
        });
    }
};
exports.updateUserById = updateUserById;
const getUserProfile = async (req, res, next) => {
    try {
        const userId = req.headers["x-user-id"] || "68d24c510a783721f2e82368";
        const user = await User_1.default.findById(userId).lean();
        if (!user) {
            res.status(404).json({
                success: false,
                data: {},
                message: "User not found",
            });
            return;
        }
        const userData = {
            id: user._id.toString(),
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            dateOfBirth: user.dateOfBirth?.toISOString(),
            nationality: user.nationality,
            phone: user.phone,
            avatar: user.avatar,
            preferences: user.preferences,
            applications: user.applications,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
        res.status(200).json({
            success: true,
            data: userData,
            message: "Profile retrieved successfully",
        });
    }
    catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({
            success: false,
            data: {},
            message: "Internal server error",
        });
    }
};
exports.getUserProfile = getUserProfile;
const updateUserProfile = async (req, res, next) => {
    try {
        const userId = req.headers["x-user-id"] || "68d24c510a783721f2e82368";
        const updates = req.body;
        const { id, createdAt, ...allowedUpdates } = updates;
        const user = await User_1.default.findByIdAndUpdate(userId, { ...allowedUpdates, updatedAt: new Date() }, { new: true, runValidators: true }).lean();
        if (!user) {
            res.status(404).json({
                success: false,
                data: {},
                message: "User not found",
            });
            return;
        }
        const userData = {
            id: user._id.toString(),
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            dateOfBirth: user.dateOfBirth?.toISOString(),
            nationality: user.nationality,
            phone: user.phone,
            avatar: user.avatar,
            preferences: user.preferences,
            applications: user.applications,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
        res.status(200).json({
            success: true,
            data: userData,
            message: "Profile updated successfully",
        });
    }
    catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({
            success: false,
            data: {},
            message: "Internal server error",
        });
    }
};
exports.updateUserProfile = updateUserProfile;
const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            res.status(400).json({
                success: false,
                data: {},
                message: "Invalid user ID format",
            });
            return;
        }
        const user = await User_1.default.findByIdAndUpdate(id, { isActive: false, updatedAt: new Date() }, { new: true });
        if (!user) {
            res.status(404).json({
                success: false,
                data: {},
                message: "User not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: {},
            message: "User deleted successfully",
        });
    }
    catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({
            success: false,
            data: {},
            message: "Internal server error",
        });
    }
};
exports.deleteUser = deleteUser;
const getUserApplications = async (req, res, next) => {
    try {
        const userId = req.headers["x-user-id"] || "68d24c510a783721f2e82368";
        const user = await User_1.default.findById(userId).lean();
        if (!user) {
            res.status(404).json({
                success: false,
                data: [],
                message: "User not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: user.applications || [],
            message: "Applications retrieved successfully",
        });
    }
    catch (error) {
        console.error("Error fetching user applications:", error);
        res.status(500).json({
            success: false,
            data: [],
            message: "Internal server error",
        });
    }
};
exports.getUserApplications = getUserApplications;
const createApplication = async (req, res, next) => {
    try {
        const userId = req.headers["x-user-id"] || "68d24c510a783721f2e82368";
        const applicationData = req.body;
        const newApplication = {
            id: `app_${Date.now()}`,
            universityId: applicationData.universityId,
            program: applicationData.program,
            status: "draft",
            documents: applicationData.documents || [],
            submittedAt: applicationData.submittedAt,
            deadline: applicationData.deadline,
        };
        const user = await User_1.default.findByIdAndUpdate(userId, {
            $push: { applications: newApplication },
            updatedAt: new Date()
        }, { new: true });
        if (!user) {
            res.status(404).json({
                success: false,
                data: {},
                message: "User not found",
            });
            return;
        }
        res.status(201).json({
            success: true,
            data: newApplication,
            message: "Application created successfully",
        });
    }
    catch (error) {
        console.error("Error creating application:", error);
        res.status(500).json({
            success: false,
            data: {},
            message: "Internal server error",
        });
    }
};
exports.createApplication = createApplication;
const updateApplication = async (req, res, next) => {
    try {
        const userId = req.headers["x-user-id"] || "68d24c510a783721f2e82368";
        const { appId } = req.params;
        const updates = req.body;
        const user = await User_1.default.findOneAndUpdate({
            _id: userId,
            "applications.id": appId
        }, {
            $set: {
                "applications.$": { ...updates, id: appId },
                updatedAt: new Date()
            }
        }, { new: true });
        if (!user) {
            res.status(404).json({
                success: false,
                data: {},
                message: "User or application not found",
            });
            return;
        }
        const updatedApplication = user.applications?.find(app => app.id === appId);
        res.status(200).json({
            success: true,
            data: updatedApplication,
            message: "Application updated successfully",
        });
    }
    catch (error) {
        console.error("Error updating application:", error);
        res.status(500).json({
            success: false,
            data: {},
            message: "Internal server error",
        });
    }
};
exports.updateApplication = updateApplication;
const deleteApplication = async (req, res, next) => {
    try {
        const userId = req.headers["x-user-id"] || "68d24c510a783721f2e82368";
        const { appId } = req.params;
        const user = await User_1.default.findByIdAndUpdate(userId, {
            $pull: { applications: { id: appId } },
            updatedAt: new Date()
        }, { new: true });
        if (!user) {
            res.status(404).json({
                success: false,
                data: {},
                message: "User not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: {},
            message: "Application deleted successfully",
        });
    }
    catch (error) {
        console.error("Error deleting application:", error);
        res.status(500).json({
            success: false,
            data: {},
            message: "Internal server error",
        });
    }
};
exports.deleteApplication = deleteApplication;
const getTestScores = async (req, res, next) => {
    try {
        const userId = req.headers["x-user-id"] || "68d24c510a783721f2e82368";
        const user = await User_1.default.findById(userId).lean();
        if (!user) {
            res.status(404).json({
                success: false,
                data: [],
                message: "User not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: user.testScores || [],
            message: "Test scores retrieved successfully",
        });
    }
    catch (error) {
        console.error("Error fetching test scores:", error);
        res.status(500).json({
            success: false,
            data: [],
            message: "Internal server error",
        });
    }
};
exports.getTestScores = getTestScores;
const addTestScore = async (req, res, next) => {
    try {
        const userId = req.headers["x-user-id"] || "68d24c510a783721f2e82368";
        const testScoreData = req.body;
        const newTestScore = {
            id: `test_${Date.now()}`,
            testName: testScoreData.testName,
            score: testScoreData.score,
            date: new Date(testScoreData.date),
            maxScore: testScoreData.maxScore,
            percentile: testScoreData.percentile,
        };
        const user = await User_1.default.findByIdAndUpdate(userId, {
            $push: { testScores: newTestScore },
            updatedAt: new Date()
        }, { new: true });
        if (!user) {
            res.status(404).json({
                success: false,
                data: {},
                message: "User not found",
            });
            return;
        }
        res.status(201).json({
            success: true,
            data: newTestScore,
            message: "Test score added successfully",
        });
    }
    catch (error) {
        console.error("Error adding test score:", error);
        res.status(500).json({
            success: false,
            data: {},
            message: "Internal server error",
        });
    }
};
exports.addTestScore = addTestScore;
const updateTestScore = async (req, res, next) => {
    try {
        const userId = req.headers["x-user-id"] || "68d24c510a783721f2e82368";
        const { testId } = req.params;
        const updates = req.body;
        const updateData = {};
        if (updates.testName)
            updateData["testScores.$.testName"] = updates.testName;
        if (updates.score)
            updateData["testScores.$.score"] = updates.score;
        if (updates.date)
            updateData["testScores.$.date"] = new Date(updates.date);
        if (updates.maxScore)
            updateData["testScores.$.maxScore"] = updates.maxScore;
        if (updates.percentile !== undefined)
            updateData["testScores.$.percentile"] = updates.percentile;
        const user = await User_1.default.findOneAndUpdate({
            _id: userId,
            "testScores.id": testId
        }, {
            $set: {
                ...updateData,
                updatedAt: new Date()
            }
        }, { new: true });
        if (!user) {
            res.status(404).json({
                success: false,
                data: {},
                message: "User or test score not found",
            });
            return;
        }
        const updatedTestScore = user.testScores?.find(score => score.id === testId);
        res.status(200).json({
            success: true,
            data: updatedTestScore,
            message: "Test score updated successfully",
        });
    }
    catch (error) {
        console.error("Error updating test score:", error);
        res.status(500).json({
            success: false,
            data: {},
            message: "Internal server error",
        });
    }
};
exports.updateTestScore = updateTestScore;
const deleteTestScore = async (req, res, next) => {
    try {
        const userId = req.headers["x-user-id"] || "68d24c510a783721f2e82368";
        const { testId } = req.params;
        const user = await User_1.default.findByIdAndUpdate(userId, {
            $pull: { testScores: { id: testId } },
            updatedAt: new Date()
        }, { new: true });
        if (!user) {
            res.status(404).json({
                success: false,
                data: {},
                message: "User not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: {},
            message: "Test score deleted successfully",
        });
    }
    catch (error) {
        console.error("Error deleting test score:", error);
        res.status(500).json({
            success: false,
            data: {},
            message: "Internal server error",
        });
    }
};
exports.deleteTestScore = deleteTestScore;
const getDocuments = async (req, res, next) => {
    try {
        const userId = req.headers["x-user-id"] || "68d24c510a783721f2e82368";
        const Document = require("../models/Document").default;
        const documents = await Document.find({
            uploadedBy: userId,
            isLatestVersion: true,
        }).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: documents,
            message: "Documents retrieved successfully",
        });
    }
    catch (error) {
        console.error("Error fetching documents:", error);
        res.status(500).json({
            success: false,
            data: [],
            message: "Internal server error",
        });
    }
};
exports.getDocuments = getDocuments;
const addDocument = async (req, res, next) => {
    try {
        const userId = req.headers["x-user-id"] || "68d24c510a783721f2e82368";
        const documentData = req.body;
        const Document = require("../models/Document").default;
        const newDocument = new Document({
            name: documentData.name,
            type: documentData.type,
            university: "All",
            status: "Draft",
            uploadDate: new Date(),
            size: "0 MB",
            format: "URL",
            filePath: documentData.url || "",
            uploadedBy: userId,
            metadata: {
                description: documentData.url ? "External URL document" : "Draft document",
            },
        });
        await newDocument.save();
        res.status(201).json({
            success: true,
            data: newDocument,
            message: "Document added successfully",
        });
    }
    catch (error) {
        console.error("Error adding document:", error);
        res.status(500).json({
            success: false,
            data: {},
            message: "Internal server error",
        });
    }
};
exports.addDocument = addDocument;
const updateDocument = async (req, res, next) => {
    try {
        const userId = req.headers["x-user-id"] || "68d24c510a783721f2e82368";
        const { docId } = req.params;
        const updates = req.body;
        const Document = require("../models/Document").default;
        const updateData = {};
        if (updates.name)
            updateData.name = updates.name;
        if (updates.type)
            updateData.type = updates.type;
        if (updates.url)
            updateData.filePath = updates.url;
        if (updates.status)
            updateData.status = updates.status;
        const updatedDocument = await Document.findOneAndUpdate({
            _id: docId,
            uploadedBy: userId
        }, updateData, { new: true });
        if (!updatedDocument) {
            res.status(404).json({
                success: false,
                data: {},
                message: "Document not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: updatedDocument,
            message: "Document updated successfully",
        });
    }
    catch (error) {
        console.error("Error updating document:", error);
        res.status(500).json({
            success: false,
            data: {},
            message: "Internal server error",
        });
    }
};
exports.updateDocument = updateDocument;
const deleteDocument = async (req, res, next) => {
    try {
        const userId = req.headers["x-user-id"] || "68d24c510a783721f2e82368";
        const { docId } = req.params;
        const Document = require("../models/Document").default;
        const document = await Document.findOneAndDelete({
            _id: docId,
            uploadedBy: userId
        });
        if (!document) {
            res.status(404).json({
                success: false,
                data: {},
                message: "Document not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: {},
            message: "Document deleted successfully",
        });
    }
    catch (error) {
        console.error("Error deleting document:", error);
        res.status(500).json({
            success: false,
            data: {},
            message: "Internal server error",
        });
    }
};
exports.deleteDocument = deleteDocument;
const getSavedUniversities = async (req, res, next) => {
    try {

        const userId = req.headers["x-user-id"] || "68d24c510a783721f2e82368";

        const user = await User_1.default.findById(userId).lean();
        if (!user) {
            console.log("User not found:", userId);
            res.status(404).json({
                success: false,
                data: [],
                message: "User not found",
            });
            return;
        }
        console.log("User found, savedUniversities:", user.savedUniversities);
        res.status(200).json({
            success: true,
            data: user.savedUniversities || [],
            message: "Saved universities retrieved successfully",
        });
    }
    catch (error) {
        console.error("Error fetching saved universities:", error);
        res.status(500).json({
            success: false,
            data: [],
            message: "Internal server error",
        });
    }
};
exports.getSavedUniversities = getSavedUniversities;
const saveUniversity = async (req, res, next) => {
    try {
        const userId = req.headers["x-user-id"] || "68d24c510a783721f2e82368";
        const universityData = req.body;
        const newSavedUniversity = {
            id: `saved_${Date.now()}`,
            universityId: universityData.universityId,
            universityName: universityData.universityName,
            savedAt: new Date(),
            notes: universityData.notes,
        };
        const user = await User_1.default.findByIdAndUpdate(userId, {
            $push: { savedUniversities: newSavedUniversity },
            updatedAt: new Date()
        }, { new: true });
        if (!user) {
            res.status(404).json({
                success: false,
                data: {},
                message: "User not found",
            });
            return;
        }
        res.status(201).json({
            success: true,
            data: newSavedUniversity,
            message: "University saved successfully",
        });
    }
    catch (error) {
        console.error("Error saving university:", error);
        res.status(500).json({
            success: false,
            data: {},
            message: "Internal server error",
        });
    }
};
exports.saveUniversity = saveUniversity;
const unsaveUniversity = async (req, res, next) => {
    try {
        const userId = req.headers["x-user-id"] || "68d24c510a783721f2e82368";
        const { savedId } = req.params;
        const user = await User_1.default.findByIdAndUpdate(userId, {
            $pull: { savedUniversities: { id: savedId } },
            updatedAt: new Date()
        }, { new: true });
        if (!user) {
            res.status(404).json({
                success: false,
                data: {},
                message: "User not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: {},
            message: "University removed from saved list",
        });
    }
    catch (error) {
        console.error("Error removing saved university:", error);
        res.status(500).json({
            success: false,
            data: {},
            message: "Internal server error",
        });
    }
};
exports.unsaveUniversity = unsaveUniversity;
const updatePersonalInfo = async (req, res, next) => {
    try {
        const userId = req.headers["x-user-id"] || "68d24c510a783721f2e82368";
        const updates = req.body;
        const updateData = {};
        if (updates.firstName)
            updateData["personalInfo.firstName"] = updates.firstName;
        if (updates.lastName)
            updateData["personalInfo.lastName"] = updates.lastName;
        if (updates.email)
            updateData["personalInfo.email"] = updates.email;
        if (updates.phone)
            updateData["personalInfo.phone"] = updates.phone;
        if (updates.dateOfBirth)
            updateData["personalInfo.dateOfBirth"] = new Date(updates.dateOfBirth);
        if (updates.nationality)
            updateData["personalInfo.nationality"] = updates.nationality;
        const user = await User_1.default.findByIdAndUpdate(userId, {
            $set: {
                ...updateData,
                updatedAt: new Date()
            }
        }, { new: true });
        if (!user) {
            res.status(404).json({
                success: false,
                data: {},
                message: "User not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: user.personalInfo,
            message: "Personal information updated successfully",
        });
    }
    catch (error) {
        console.error("Error updating personal information:", error);
        res.status(500).json({
            success: false,
            data: {},
            message: "Internal server error",
        });
    }
};
exports.updatePersonalInfo = updatePersonalInfo;
const updateAcademicInfo = async (req, res, next) => {
    try {
        const userId = req.headers["x-user-id"] || "68d24c510a783721f2e82368";
        const updates = req.body;
        const updateData = {};
        if (updates.gpa !== undefined)
            updateData["academicInfo.gpa"] = updates.gpa;
        if (updates.highSchoolName)
            updateData["academicInfo.highSchoolName"] = updates.highSchoolName;
        if (updates.graduationYear)
            updateData["academicInfo.graduationYear"] = updates.graduationYear;
        if (updates.intendedMajors)
            updateData["academicInfo.intendedMajors"] = updates.intendedMajors;
        const user = await User_1.default.findByIdAndUpdate(userId, {
            $set: {
                ...updateData,
                updatedAt: new Date()
            }
        }, { new: true });
        if (!user) {
            res.status(404).json({
                success: false,
                data: {},
                message: "User not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: user.academicInfo,
            message: "Academic information updated successfully",
        });
    }
    catch (error) {
        console.error("Error updating academic information:", error);
        res.status(500).json({
            success: false,
            data: {},
            message: "Internal server error",
        });
    }
};
exports.updateAcademicInfo = updateAcademicInfo;
const updateAreasOfInterest = async (req, res, next) => {
    try {
        const userId = req.headers["x-user-id"] || "68d24c510a783721f2e82368";
        const { areasOfInterest } = req.body;
        const user = await User_1.default.findByIdAndUpdate(userId, {
            $set: {
                areasOfInterest,
                updatedAt: new Date()
            }
        }, { new: true });
        if (!user) {
            res.status(404).json({
                success: false,
                data: [],
                message: "User not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: user.areasOfInterest || [],
            message: "Areas of interest updated successfully",
        });
    }
    catch (error) {
        console.error("Error updating areas of interest:", error);
        res.status(500).json({
            success: false,
            data: [],
            message: "Internal server error",
        });
    }
};
exports.updateAreasOfInterest = updateAreasOfInterest;
//# sourceMappingURL=userController.js.map