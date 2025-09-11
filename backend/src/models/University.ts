import mongoose, { Schema } from "mongoose";
import { IUniversity } from "@/types";

const universitySchema = new Schema<IUniversity>(
  {
    name: {
      type: String,
      required: [true, "University name is required"],
      trim: true,
      maxlength: [200, "University name cannot exceed 200 characters"],
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    website: {
      type: String,
      required: [true, "Website is required"],
      match: [/^https?:\/\/.+/, "Please enter a valid website URL"],
    },
    logo: {
      type: String,
      required: [true, "Logo is required"],
    },
    images: [
      {
        type: String,
      },
    ],
    ranking: {
      type: Number,
      min: [1, "Ranking must be a positive number"],
    },
    tuitionFee: {
      undergraduate: {
        type: Number,
        required: [true, "Undergraduate tuition fee is required"],
        min: [0, "Tuition fee cannot be negative"],
      },
      graduate: {
        type: Number,
        required: [true, "Graduate tuition fee is required"],
        min: [0, "Tuition fee cannot be negative"],
      },
      currency: {
        type: String,
        required: [true, "Currency is required"],
        uppercase: true,
        length: [3, "Currency must be 3 characters"],
      },
    },
    requirements: {
      ielts: {
        type: Number,
        min: [0, "IELTS score cannot be negative"],
        max: [9, "IELTS score cannot exceed 9"],
      },
      toefl: {
        type: Number,
        min: [0, "TOEFL score cannot be negative"],
        max: [120, "TOEFL score cannot exceed 120"],
      },
      gpa: {
        type: Number,
        min: [0, "GPA cannot be negative"],
        max: [4, "GPA cannot exceed 4"],
      },
      sat: {
        type: Number,
        min: [400, "SAT score must be at least 400"],
        max: [1600, "SAT score cannot exceed 1600"],
      },
      gre: {
        type: Number,
        min: [260, "GRE score must be at least 260"],
        max: [340, "GRE score cannot exceed 340"],
      },
    },
    majors: [
      {
        type: String,
        trim: true,
      },
    ],
    scholarships: [
      {
        type: Schema.Types.ObjectId,
        ref: "Scholarship",
      },
    ],
    dormitories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Dormitory",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
universitySchema.index({ name: 1 });
universitySchema.index({ country: 1 });
universitySchema.index({ city: 1 });
universitySchema.index({ ranking: 1 });
universitySchema.index({ "tuitionFee.undergraduate": 1 });
universitySchema.index({ "tuitionFee.graduate": 1 });

// Text search index
universitySchema.index({
  name: "text",
  description: "text",
  country: "text",
  city: "text",
  majors: "text",
});

export const University = mongoose.model<IUniversity>(
  "University",
  universitySchema
);
