import { Request, Response } from "express";
import { Package } from "@/models";
import { asyncHandler, CustomError } from "@/middleware";
import { ApiResponse } from "@/types";

// @desc    Get all packages
// @route   GET /api/packages
// @access  Public
export const getPackages = asyncHandler(async (req: Request, res: Response) => {
  const { page = 1, limit = 10, search, minPrice, maxPrice } = req.query;

  // Build query
  const query: any = { isActive: true };

  if (search) {
    query.$text = { $search: search as string };
  }

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  // Calculate pagination
  const skip = (Number(page) - 1) * Number(limit);

  const packages = await Package.find(query)
    .sort({ price: 1 })
    .skip(skip)
    .limit(Number(limit));

  const total = await Package.countDocuments(query);

  const response: ApiResponse = {
    success: true,
    message: "Packages retrieved successfully",
    data: packages,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / Number(limit)),
    },
  };

  res.json(response);
});

// @desc    Get single package
// @route   GET /api/packages/:id
// @access  Public
export const getPackage = asyncHandler(async (req: Request, res: Response) => {
  const packageItem = await Package.findById(req.params.id);

  if (!packageItem) {
    throw new CustomError("Package not found", 404);
  }

  const response: ApiResponse = {
    success: true,
    message: "Package retrieved successfully",
    data: packageItem,
  };

  res.json(response);
});

// @desc    Create package
// @route   POST /api/packages
// @access  Private/Admin
export const createPackage = asyncHandler(
  async (req: Request, res: Response) => {
    const packageItem = await Package.create(req.body);

    const response: ApiResponse = {
      success: true,
      message: "Package created successfully",
      data: packageItem,
    };

    res.status(201).json(response);
  }
);

// @desc    Update package
// @route   PUT /api/packages/:id
// @access  Private/Admin
export const updatePackage = asyncHandler(
  async (req: Request, res: Response) => {
    const packageItem = await Package.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!packageItem) {
      throw new CustomError("Package not found", 404);
    }

    const response: ApiResponse = {
      success: true,
      message: "Package updated successfully",
      data: packageItem,
    };

    res.json(response);
  }
);

// @desc    Delete package
// @route   DELETE /api/packages/:id
// @access  Private/Admin
export const deletePackage = asyncHandler(
  async (req: Request, res: Response) => {
    const packageItem = await Package.findByIdAndDelete(req.params.id);

    if (!packageItem) {
      throw new CustomError("Package not found", 404);
    }

    const response: ApiResponse = {
      success: true,
      message: "Package deleted successfully",
    };

    res.json(response);
  }
);

// @desc    Get featured packages
// @route   GET /api/packages/featured
// @access  Public
export const getFeaturedPackages = asyncHandler(
  async (req: Request, res: Response) => {
    const packages = await Package.find({ isActive: true })
      .sort({ price: 1 })
      .limit(6);

    const response: ApiResponse = {
      success: true,
      message: "Featured packages retrieved successfully",
      data: packages,
    };

    res.json(response);
  }
);
