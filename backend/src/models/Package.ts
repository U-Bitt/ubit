import mongoose, { Schema } from "mongoose";
import { IPackage } from "@/types";

const packageSchema = new Schema<IPackage>(
  {
    name: {
      type: String,
      required: [true, "Package name is required"],
      trim: true,
      maxlength: [100, "Package name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    currency: {
      type: String,
      required: [true, "Currency is required"],
      uppercase: true,
      length: [3, "Currency must be 3 characters"],
    },
    duration: {
      type: Number,
      required: [true, "Duration is required"],
      min: [1, "Duration must be at least 1 month"],
    },
    features: [
      {
        type: String,
        trim: true,
      },
    ],
    includes: {
      universities: [
        {
          type: String,
          trim: true,
        },
      ],
      exams: [
        {
          type: String,
          trim: true,
        },
      ],
      consultations: {
        type: Number,
        default: 0,
        min: [0, "Consultations cannot be negative"],
      },
      documents: [
        {
          type: String,
          trim: true,
        },
      ],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
packageSchema.index({ price: 1 });
packageSchema.index({ duration: 1 });
packageSchema.index({ isActive: 1 });

// Text search index
packageSchema.index({
  name: "text",
  description: "text",
  features: "text",
});

export const Package = mongoose.model<IPackage>("Package", packageSchema);
