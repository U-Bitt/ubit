import { Request, Response, NextFunction } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import User, { IUser } from "../models/User";
import { User as UserType, Application, ApiResponse, SearchQuery } from "../types";

// JWT Secret (should be in environment variables)
const JWT_SECRET: string = process.env.JWT_SECRET || "your-secret-key";
const JWT_EXPIRE: string = process.env.JWT_EXPIRE || "7d";

// Generate JWT token
const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRE } as any);
};

// Register a new user
export const registerUser = async (
  req: Request<{}, ApiResponse<{ user: UserType; token: string }>, {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    nationality?: string;
    phone?: string;
  }>,
  res: Response<ApiResponse<{ user: UserType; token: string }>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password, firstName, lastName, nationality, phone } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        success: false,
        data: {} as { user: UserType; token: string },
        message: "User already exists with this email",
      });
      return;
    }

    // Create new user
    const user = new User({
      email,
      password,
      firstName,
      lastName,
      nationality,
      phone,
    });

    await user.save();

    // Generate token
    const token = generateToken((user._id as any).toString());

    // Convert to UserType interface
    const userData: UserType = {
      id: (user._id as any).toString(),
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
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      success: false,
      data: {} as { user: UserType; token: string },
      message: "Internal server error",
    });
  }
};

// Login user
export const loginUser = async (
  req: Request<{}, ApiResponse<{ user: UserType; token: string }>, {
    email: string;
    password: string;
  }>,
  res: Response<ApiResponse<{ user: UserType; token: string }>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user and include password
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      res.status(401).json({
        success: false,
        data: {} as { user: UserType; token: string },
        message: "Invalid credentials",
      });
      return;
    }

    // Check if user is active
    if (!user.isActive) {
      res.status(401).json({
        success: false,
        data: {} as { user: UserType; token: string },
        message: "Account is deactivated",
      });
      return;
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        data: {} as { user: UserType; token: string },
        message: "Invalid credentials",
      });
      return;
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken((user._id as any).toString());

    // Convert to UserType interface
    const userData: UserType = {
      id: (user._id as any).toString(),
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
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({
      success: false,
      data: {} as { user: UserType; token: string },
      message: "Internal server error",
    });
  }
};

// Get all users (admin only)
export const getAllUsers = async (
  req: Request<{}, ApiResponse<UserType[]>, {}, SearchQuery>,
  res: Response<ApiResponse<UserType[]>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { page = 1, limit = 10, sort = "createdAt", order = "desc" } = req.query;

    // Build sort object for MongoDB
    const sortObj: any = {};
    sortObj[sort] = order === "asc" ? 1 : -1;

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get users from MongoDB
    const users = await User.find({ isActive: true })
      .sort(sortObj)
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const total = await User.countDocuments({ isActive: true });

    // Convert MongoDB documents to UserType interface
    const userData: UserType[] = users.map((user) => ({
      id: (user._id as any).toString(),
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
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      data: [] as UserType[],
      message: "Internal server error",
    });
  }
};

// Get user by ID
export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse<UserType>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).json({
        success: false,
        data: {} as UserType,
        message: "Invalid user ID format",
      });
      return;
    }

    const user = await User.findById(id).lean();

    if (!user) {
      res.status(404).json({
        success: false,
        data: {} as UserType,
        message: "User not found",
      });
      return;
    }

    const userData: UserType = {
      id: (user._id as any).toString(),
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
        percentile: 0, // Default value since it's not in the model
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
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({
      success: false,
      data: {} as UserType,
      message: "Internal server error",
    });
  }
};

// Update user by ID
export const updateUserById = async (
  req: Request<{ id: string }, ApiResponse<UserType>, Partial<IUser>>,
  res: Response<ApiResponse<UserType>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Validate ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).json({
        success: false,
        data: {} as UserType,
        message: "Invalid user ID format",
      });
      return;
    }

    // Find and update user
    const user = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).lean();

    if (!user) {
      res.status(404).json({
        success: false,
        data: {} as UserType,
        message: "User not found",
      });
      return;
    }

    const userData: UserType = {
      id: (user._id as any).toString(),
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
  } catch (error) {
    console.error("Error updating user by ID:", error);
    res.status(500).json({
      success: false,
      data: {} as UserType,
      message: "Internal server error",
    });
  }
};

// Get current user profile
export const getUserProfile = async (
  req: Request<{}, ApiResponse<UserType>>,
  res: Response<ApiResponse<UserType>>,
  next: NextFunction
): Promise<void> => {
  try {
    // This would typically get user ID from JWT token
    // For now, we'll use a mock user ID
    const userId = req.headers["x-user-id"] as string || "68d24c510a783721f2e82368";
    
    const user = await User.findById(userId).lean();

    if (!user) {
      res.status(404).json({
        success: false,
        data: {} as UserType,
        message: "User not found",
      });
      return;
    }

    const userData: UserType = {
      id: (user._id as any).toString(),
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
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({
      success: false,
      data: {} as UserType,
      message: "Internal server error",
    });
  }
};

// Update user profile
export const updateUserProfile = async (
  req: Request<{}, ApiResponse<UserType>, Partial<UserType>>,
  res: Response<ApiResponse<UserType>>,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.headers["x-user-id"] as string || "68d24c510a783721f2e82368";
    const updates = req.body;

    // Remove fields that shouldn't be updated directly
    const { id, createdAt, ...allowedUpdates } = updates;

    const user = await User.findByIdAndUpdate(
      userId,
      { ...allowedUpdates, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).lean();

    if (!user) {
      res.status(404).json({
        success: false,
        data: {} as UserType,
        message: "User not found",
      });
      return;
    }

    const userData: UserType = {
      id: (user._id as any).toString(),
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
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({
      success: false,
      data: {} as UserType,
      message: "Internal server error",
    });
  }
};

// Delete user
export const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse<{}>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).json({
        success: false,
        data: {},
        message: "Invalid user ID format",
      });
      return;
    }

    const user = await User.findByIdAndUpdate(
      id,
      { isActive: false, updatedAt: new Date() },
      { new: true }
    );

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
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      success: false,
      data: {},
      message: "Internal server error",
    });
  }
};

// Get user applications
export const getUserApplications = async (
  req: Request<{}, ApiResponse<Application[]>>,
  res: Response<ApiResponse<Application[]>>,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.headers["x-user-id"] as string || "68d24c510a783721f2e82368";
    
    const user = await User.findById(userId).lean();

    if (!user) {
      res.status(404).json({
        success: false,
        data: [] as Application[],
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: user.applications || [],
      message: "Applications retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching user applications:", error);
    res.status(500).json({
      success: false,
      data: [] as Application[],
      message: "Internal server error",
    });
  }
};

// Create new application
export const createApplication = async (
  req: Request<{}, ApiResponse<Application>, Partial<Application>>,
  res: Response<ApiResponse<Application>>,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.headers["x-user-id"] as string || "68d24c510a783721f2e82368";
    const applicationData = req.body;

    const newApplication: Application = {
      id: `app_${Date.now()}`,
      universityId: applicationData.universityId,
      program: applicationData.program,
      status: "draft",
      documents: applicationData.documents || [],
      submittedAt: applicationData.submittedAt,
      deadline: applicationData.deadline,
    };

    const user = await User.findByIdAndUpdate(
      userId,
      { 
        $push: { applications: newApplication },
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!user) {
      res.status(404).json({
        success: false,
        data: {} as Application,
        message: "User not found",
      });
      return;
    }

    res.status(201).json({
      success: true,
      data: newApplication,
      message: "Application created successfully",
    });
  } catch (error) {
    console.error("Error creating application:", error);
    res.status(500).json({
      success: false,
      data: {} as Application,
      message: "Internal server error",
    });
  }
};

// Update application
export const updateApplication = async (
  req: Request<{ appId: string }, ApiResponse<Application>, Partial<Application>>,
  res: Response<ApiResponse<Application>>,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.headers["x-user-id"] as string || "68d24c510a783721f2e82368";
    const { appId } = req.params;
    const updates = req.body;

    const user = await User.findOneAndUpdate(
      { 
        _id: userId, 
        "applications.id": appId 
      },
      { 
        $set: { 
          "applications.$": { ...updates, id: appId },
          updatedAt: new Date()
        }
      },
      { new: true }
    );

    if (!user) {
      res.status(404).json({
        success: false,
        data: {} as Application,
        message: "User or application not found",
      });
      return;
    }

    const updatedApplication = user.applications?.find(app => app.id === appId);

    res.status(200).json({
      success: true,
      data: updatedApplication as Application,
      message: "Application updated successfully",
    });
  } catch (error) {
    console.error("Error updating application:", error);
    res.status(500).json({
      success: false,
      data: {} as Application,
      message: "Internal server error",
    });
  }
};

// Delete application
export const deleteApplication = async (
  req: Request<{ appId: string }>,
  res: Response<ApiResponse<{}>>,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.headers["x-user-id"] as string || "68d24c510a783721f2e82368";
    const { appId } = req.params;

    const user = await User.findByIdAndUpdate(
      userId,
      { 
        $pull: { applications: { id: appId } },
        updatedAt: new Date()
      },
      { new: true }
    );

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
  } catch (error) {
    console.error("Error deleting application:", error);
    res.status(500).json({
      success: false,
      data: {},
      message: "Internal server error",
    });
  }
};

// Test Scores Management
export const getTestScores = async (
  req: Request<{}, ApiResponse<any[]>>,
  res: Response<ApiResponse<any[]>>,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.headers["x-user-id"] as string || "68d24c510a783721f2e82368";
    
    const user = await User.findById(userId).lean();

    if (!user) {
      res.status(404).json({
        success: false,
        data: [] as any[],
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: user.testScores || [],
      message: "Test scores retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching test scores:", error);
    res.status(500).json({
      success: false,
      data: [] as any[],
      message: "Internal server error",
    });
  }
};

export const addTestScore = async (
  req: Request<{}, ApiResponse<any>, {
    testName: string;
    score: string;
    date: string;
    maxScore?: string;
    percentile?: number;
  }>,
  res: Response<ApiResponse<any>>,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.headers["x-user-id"] as string || "68d24c510a783721f2e82368";
    const testScoreData = req.body;

    const newTestScore = {
      id: `test_${Date.now()}`,
      testName: testScoreData.testName,
      score: testScoreData.score,
      date: new Date(testScoreData.date),
      maxScore: testScoreData.maxScore,
      percentile: testScoreData.percentile,
    };

    const user = await User.findByIdAndUpdate(
      userId,
      { 
        $push: { testScores: newTestScore },
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!user) {
      res.status(404).json({
        success: false,
        data: {} as any,
        message: "User not found",
      });
      return;
    }

    res.status(201).json({
      success: true,
      data: newTestScore,
      message: "Test score added successfully",
    });
  } catch (error) {
    console.error("Error adding test score:", error);
    res.status(500).json({
      success: false,
      data: {} as any,
      message: "Internal server error",
    });
  }
};

export const updateTestScore = async (
  req: Request<{ testId: string }, ApiResponse<any>, {
    testName?: string;
    score?: string;
    date?: string;
    maxScore?: string;
    percentile?: number;
  }>,
  res: Response<ApiResponse<any>>,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.headers["x-user-id"] as string || "68d24c510a783721f2e82368";
    const { testId } = req.params;
    const updates = req.body;

    const updateData: any = {};
    if (updates.testName) updateData["testScores.$.testName"] = updates.testName;
    if (updates.score) updateData["testScores.$.score"] = updates.score;
    if (updates.date) updateData["testScores.$.date"] = new Date(updates.date);
    if (updates.maxScore) updateData["testScores.$.maxScore"] = updates.maxScore;
    if (updates.percentile !== undefined) updateData["testScores.$.percentile"] = updates.percentile;

    const user = await User.findOneAndUpdate(
      { 
        _id: userId, 
        "testScores.id": testId 
      },
      { 
        $set: { 
          ...updateData,
          updatedAt: new Date()
        }
      },
      { new: true }
    );

    if (!user) {
      res.status(404).json({
        success: false,
        data: {} as any,
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
  } catch (error) {
    console.error("Error updating test score:", error);
    res.status(500).json({
      success: false,
      data: {} as any,
      message: "Internal server error",
    });
  }
};

export const deleteTestScore = async (
  req: Request<{ testId: string }>,
  res: Response<ApiResponse<{}>>,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.headers["x-user-id"] as string || "68d24c510a783721f2e82368";
    const { testId } = req.params;

    const user = await User.findByIdAndUpdate(
      userId,
      { 
        $pull: { testScores: { id: testId } },
        updatedAt: new Date()
      },
      { new: true }
    );

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
  } catch (error) {
    console.error("Error deleting test score:", error);
    res.status(500).json({
      success: false,
      data: {},
      message: "Internal server error",
    });
  }
};

// Documents Management
export const getDocuments = async (
  req: Request<{}, ApiResponse<any[]>>,
  res: Response<ApiResponse<any[]>>,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.headers["x-user-id"] as string || "68d24c510a783721f2e82368";
    
    // Import Document model
    const Document = require("../models/Document").default;
    
    // Fetch documents from Document collection
    const documents = await Document.find({
      uploadedBy: userId,
      isLatestVersion: true,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: documents,
      message: "Documents retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({
      success: false,
      data: [] as any[],
      message: "Internal server error",
    });
  }
};

export const addDocument = async (
  req: Request<{}, ApiResponse<any>, {
    name: string;
    type: string;
    url?: string;
  }>,
  res: Response<ApiResponse<any>>,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.headers["x-user-id"] as string || "68d24c510a783721f2e82368";
    const documentData = req.body;

    // Import Document model
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
  } catch (error) {
    console.error("Error adding document:", error);
    res.status(500).json({
      success: false,
      data: {} as any,
      message: "Internal server error",
    });
  }
};

export const updateDocument = async (
  req: Request<{ docId: string }, ApiResponse<any>, {
    name?: string;
    type?: string;
    url?: string;
    status?: string;
  }>,
  res: Response<ApiResponse<any>>,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.headers["x-user-id"] as string || "68d24c510a783721f2e82368";
    const { docId } = req.params;
    const updates = req.body;

    // Import Document model
    const Document = require("../models/Document").default;

    const updateData: any = {};
    if (updates.name) updateData.name = updates.name;
    if (updates.type) updateData.type = updates.type;
    if (updates.url) updateData.filePath = updates.url;
    if (updates.status) updateData.status = updates.status;

    const updatedDocument = await Document.findOneAndUpdate(
      { 
        _id: docId,
        uploadedBy: userId
      },
      updateData,
      { new: true }
    );

    if (!updatedDocument) {
      res.status(404).json({
        success: false,
        data: {} as any,
        message: "Document not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: updatedDocument,
      message: "Document updated successfully",
    });
  } catch (error) {
    console.error("Error updating document:", error);
    res.status(500).json({
      success: false,
      data: {} as any,
      message: "Internal server error",
    });
  }
};

export const deleteDocument = async (
  req: Request<{ docId: string }>,
  res: Response<ApiResponse<{}>>,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.headers["x-user-id"] as string || "68d24c510a783721f2e82368";
    const { docId } = req.params;

    // Import Document model
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
  } catch (error) {
    console.error("Error deleting document:", error);
    res.status(500).json({
      success: false,
      data: {},
      message: "Internal server error",
    });
  }
};

// Saved Universities Management
export const getSavedUniversities = async (
  req: Request<{}, ApiResponse<any[]>>,
  res: Response<ApiResponse<any[]>>,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.headers["x-user-id"] as string || "68d24c510a783721f2e82368";
    
    const user = await User.findById(userId).lean();

    if (!user) {
      res.status(404).json({
        success: false,
        data: [] as any[],
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: user.savedUniversities || [],
      message: "Saved universities retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching saved universities:", error);
    res.status(500).json({
      success: false,
      data: [] as any[],
      message: "Internal server error",
    });
  }
};

export const saveUniversity = async (
  req: Request<{}, ApiResponse<any>, {
    universityId: string;
    universityName: string;
    notes?: string;
  }>,
  res: Response<ApiResponse<any>>,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.headers["x-user-id"] as string || "68d24c510a783721f2e82368";
    const universityData = req.body;

    const newSavedUniversity = {
      id: `saved_${Date.now()}`,
      universityId: universityData.universityId,
      universityName: universityData.universityName,
      savedAt: new Date(),
      notes: universityData.notes,
    };

    const user = await User.findByIdAndUpdate(
      userId,
      { 
        $push: { savedUniversities: newSavedUniversity },
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!user) {
      res.status(404).json({
        success: false,
        data: {} as any,
        message: "User not found",
      });
      return;
    }

    res.status(201).json({
      success: true,
      data: newSavedUniversity,
      message: "University saved successfully",
    });
  } catch (error) {
    console.error("Error saving university:", error);
    res.status(500).json({
      success: false,
      data: {} as any,
      message: "Internal server error",
    });
  }
};

export const unsaveUniversity = async (
  req: Request<{ savedId: string }>,
  res: Response<ApiResponse<{}>>,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.headers["x-user-id"] as string || "68d24c510a783721f2e82368";
    const { savedId } = req.params;

    const user = await User.findByIdAndUpdate(
      userId,
      { 
        $pull: { savedUniversities: { id: savedId } },
        updatedAt: new Date()
      },
      { new: true }
    );

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
  } catch (error) {
    console.error("Error removing saved university:", error);
    res.status(500).json({
      success: false,
      data: {},
      message: "Internal server error",
    });
  }
};

// Update personal information
export const updatePersonalInfo = async (
  req: Request<{}, ApiResponse<any>, {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    dateOfBirth?: string;
    nationality?: string;
  }>,
  res: Response<ApiResponse<any>>,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.headers["x-user-id"] as string || "68d24c510a783721f2e82368";
    const updates = req.body;

    const updateData: any = {};
    if (updates.firstName) updateData["personalInfo.firstName"] = updates.firstName;
    if (updates.lastName) updateData["personalInfo.lastName"] = updates.lastName;
    if (updates.email) updateData["personalInfo.email"] = updates.email;
    if (updates.phone) updateData["personalInfo.phone"] = updates.phone;
    if (updates.dateOfBirth) updateData["personalInfo.dateOfBirth"] = new Date(updates.dateOfBirth);
    if (updates.nationality) updateData["personalInfo.nationality"] = updates.nationality;

    const user = await User.findByIdAndUpdate(
      userId,
      { 
        $set: { 
          ...updateData,
          updatedAt: new Date()
        }
      },
      { new: true }
    );

    if (!user) {
      res.status(404).json({
        success: false,
        data: {} as any,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: user.personalInfo,
      message: "Personal information updated successfully",
    });
  } catch (error) {
    console.error("Error updating personal information:", error);
    res.status(500).json({
      success: false,
      data: {} as any,
      message: "Internal server error",
    });
  }
};

// Update academic information
export const updateAcademicInfo = async (
  req: Request<{}, ApiResponse<any>, {
    gpa?: number;
    highSchoolName?: string;
    graduationYear?: number;
    intendedMajors?: string[];
  }>,
  res: Response<ApiResponse<any>>,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.headers["x-user-id"] as string || "68d24c510a783721f2e82368";
    const updates = req.body;

    const updateData: any = {};
    if (updates.gpa !== undefined) updateData["academicInfo.gpa"] = updates.gpa;
    if (updates.highSchoolName) updateData["academicInfo.highSchoolName"] = updates.highSchoolName;
    if (updates.graduationYear) updateData["academicInfo.graduationYear"] = updates.graduationYear;
    if (updates.intendedMajors) updateData["academicInfo.intendedMajors"] = updates.intendedMajors;

    const user = await User.findByIdAndUpdate(
      userId,
      { 
        $set: { 
          ...updateData,
          updatedAt: new Date()
        }
      },
      { new: true }
    );

    if (!user) {
      res.status(404).json({
        success: false,
        data: {} as any,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: user.academicInfo,
      message: "Academic information updated successfully",
    });
  } catch (error) {
    console.error("Error updating academic information:", error);
    res.status(500).json({
      success: false,
      data: {} as any,
      message: "Internal server error",
    });
  }
};

// Update areas of interest
export const updateAreasOfInterest = async (
  req: Request<{}, ApiResponse<string[]>, {
    areasOfInterest: string[];
  }>,
  res: Response<ApiResponse<string[]>>,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.headers["x-user-id"] as string || "68d24c510a783721f2e82368";
    const { areasOfInterest } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { 
        $set: { 
          areasOfInterest,
          updatedAt: new Date()
        }
      },
      { new: true }
    );

    if (!user) {
      res.status(404).json({
        success: false,
        data: [] as string[],
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: user.areasOfInterest || [],
      message: "Areas of interest updated successfully",
    });
  } catch (error) {
    console.error("Error updating areas of interest:", error);
    res.status(500).json({
      success: false,
      data: [] as string[],
      message: "Internal server error",
    });
  }
};