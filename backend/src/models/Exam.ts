import mongoose, { Schema } from "mongoose";
import { IExam } from "@/types";

const examSchema = new Schema<IExam>(
  {
    name: {
      type: String,
      required: [true, "Exam name is required"],
      trim: true,
      maxlength: [100, "Exam name cannot exceed 100 characters"],
    },
    type: {
      type: String,
      enum: ["ielts", "toefl", "sat", "gre", "gmat", "other"],
      required: [true, "Exam type is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    sections: [
      {
        name: {
          type: String,
          required: [true, "Section name is required"],
          trim: true,
        },
        duration: {
          type: Number,
          required: [true, "Duration is required"],
          min: [1, "Duration must be at least 1 minute"],
        },
        questions: {
          type: Number,
          required: [true, "Number of questions is required"],
          min: [1, "Must have at least 1 question"],
        },
        maxScore: {
          type: Number,
          required: [true, "Maximum score is required"],
          min: [0, "Score cannot be negative"],
        },
      },
    ],
    totalDuration: {
      type: Number,
      required: [true, "Total duration is required"],
      min: [1, "Total duration must be at least 1 minute"],
    },
    maxScore: {
      type: Number,
      required: [true, "Maximum score is required"],
      min: [0, "Score cannot be negative"],
    },
    validity: {
      type: Number,
      required: [true, "Validity period is required"],
      min: [1, "Validity must be at least 1 month"],
    },
    cost: {
      type: Number,
      required: [true, "Cost is required"],
      min: [0, "Cost cannot be negative"],
    },
    currency: {
      type: String,
      required: [true, "Currency is required"],
      uppercase: true,
      length: [3, "Currency must be 3 characters"],
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
examSchema.index({ type: 1 });
examSchema.index({ isActive: 1 });
examSchema.index({ cost: 1 });
examSchema.index({ maxScore: 1 });

// Text search index
examSchema.index({
  name: "text",
  description: "text",
});

export const Exam = mongoose.model<IExam>("Exam", examSchema);
