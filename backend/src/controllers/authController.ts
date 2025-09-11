import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "@/models";
import { config } from "@/config";
import { asyncHandler, CustomError } from "@/middleware";
import { ApiResponse, JWTPayload } from "@/types";

// Generate JWT Token
const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req: Request, res: Response) => {
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    dateOfBirth,
    nationality,
  } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new CustomError("User already exists with this email", 400);
  }

  // Create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    phone,
    dateOfBirth,
    nationality,
  });

  // Generate token
  const token = generateToken(user._id);

  const response: ApiResponse = {
    success: true,
    message: "User registered successfully",
    data: {
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
      token,
    },
  };

  res.status(201).json(response);
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Check for user
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new CustomError("Invalid credentials", 401);
  }

  // Check if user is active
  if (!user.isActive) {
    throw new CustomError("Account is deactivated", 401);
  }

  // Check password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new CustomError("Invalid credentials", 401);
  }

  // Generate token
  const token = generateToken(user._id);

  const response: ApiResponse = {
    success: true,
    message: "Login successful",
    data: {
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
      token,
    },
  };

  res.json(response);
});

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;

  const response: ApiResponse = {
    success: true,
    message: "User profile retrieved successfully",
    data: { user },
  };

  res.json(response);
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req as any).user._id;
    const {
      firstName,
      lastName,
      phone,
      dateOfBirth,
      nationality,
      preferences,
    } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        phone,
        dateOfBirth,
        nationality,
        preferences,
      },
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new CustomError("User not found", 404);
    }

    const response: ApiResponse = {
      success: true,
      message: "Profile updated successfully",
      data: { user },
    };

    res.json(response);
  }
);

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
export const changePassword = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req as any).user._id;
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(userId).select("+password");
    if (!user) {
      throw new CustomError("User not found", 404);
    }

    // Check current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      throw new CustomError("Current password is incorrect", 400);
    }

    // Update password
    user.password = newPassword;
    await user.save();

    const response: ApiResponse = {
      success: true,
      message: "Password changed successfully",
    };

    res.json(response);
  }
);

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logout = asyncHandler(async (req: Request, res: Response) => {
  const response: ApiResponse = {
    success: true,
    message: "Logout successful",
  };

  res.json(response);
});
