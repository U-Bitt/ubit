import mongoose, { Schema } from "mongoose";
import { IScholarship } from "@/types";

const scholarshipSchema = new Schema<IScholarship>(
  {
    name: {
      type: String,
      required: [true, "Scholarship name is required"],
      trim: true,
      maxlength: [200, "Scholarship name cannot exceed 200 characters"],
    },
    university: {
      type: String,
      required: [true, "University is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount cannot be negative"],
    },
    currency: {
      type: String,
      required: [true, "Currency is required"],
      uppercase: true,
      length: [3, "Currency must be 3 characters"],
    },
    type: {
      type: String,
      enum: ["merit", "need-based", "athletic", "academic"],
      required: [true, "Scholarship type is required"],
    },
    requirements: [
      {
        type: String,
        trim: true,
      },
    ],
    deadline: {
      type: Date,
      required: [true, "Deadline is required"],
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
scholarshipSchema.index({ university: 1 });
scholarshipSchema.index({ type: 1 });
scholarshipSchema.index({ deadline: 1 });
scholarshipSchema.index({ isActive: 1 });
scholarshipSchema.index({ amount: 1 });

// Text search index
scholarshipSchema.index({
  name: "text",
  description: "text",
  university: "text",
});

export const Scholarship = mongoose.model<IScholarship>(
  "Scholarship",
  scholarshipSchema
);
