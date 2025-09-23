import mongoose, { Document, Schema } from "mongoose";

// Scholarship interface extending Mongoose Document
export interface IScholarship extends Document {
  title: string;
  description: string;
  amount: string;
  university: string;
  country: string;
  deadline: string;
  type: string;
  requirements: string[];
  coverage: string;
  duration: string;
  applicationProcess: string;
  eligibility: string;
  benefits: string[];
  image: string;
  donor?: string;
  contactEmail?: string;
  website?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Scholarship schema
const ScholarshipSchema = new Schema<IScholarship>(
  {
    title: {
      type: String,
      required: [true, "Scholarship title is required"],
      trim: true,
      maxlength: [200, "Title cannot be more than 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [1000, "Description cannot be more than 1000 characters"],
    },
    amount: {
      type: String,
      required: [true, "Amount is required"],
      trim: true,
    },
    university: {
      type: String,
      required: [true, "University is required"],
      trim: true,
      maxlength: [200, "University name cannot be more than 200 characters"],
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
      maxlength: [100, "Country cannot be more than 100 characters"],
    },
    deadline: {
      type: String,
      required: [true, "Deadline is required"],
      trim: true,
    },
    type: {
      type: String,
      required: [true, "Scholarship type is required"],
      enum: ["Merit-based", "Leadership-based", "Need-based", "Athletic", "Academic", "Research", "Government-funded"],
      trim: true,
    },
    requirements: [
      {
        type: String,
        trim: true,
      },
    ],
    coverage: {
      type: String,
      required: [true, "Coverage information is required"],
      trim: true,
    },
    duration: {
      type: String,
      required: [true, "Duration is required"],
      trim: true,
    },
    applicationProcess: {
      type: String,
      required: [true, "Application process is required"],
      trim: true,
      maxlength: [500, "Application process cannot be more than 500 characters"],
    },
    eligibility: {
      type: String,
      required: [true, "Eligibility criteria is required"],
      trim: true,
      maxlength: [500, "Eligibility cannot be more than 500 characters"],
    },
    benefits: [
      {
        type: String,
        trim: true,
      },
    ],
    image: {
      type: String,
      required: [true, "Image is required"],
      trim: true,
    },
    donor: {
      type: String,
      trim: true,
      maxlength: [200, "Donor name cannot be more than 200 characters"],
    },
    contactEmail: {
      type: String,
      trim: true,
      validate: {
        validator: function (v: string) {
          return !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: "Contact email must be a valid email address",
      },
    },
    website: {
      type: String,
      trim: true,
      validate: {
        validator: function (v: string) {
          return !v || /^https?:\/\/.+/.test(v);
        },
        message: "Website must be a valid URL",
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
    collection: "scholarships",
  }
);

// Indexes for better query performance
ScholarshipSchema.index({ title: 1 });
ScholarshipSchema.index({ university: 1 });
ScholarshipSchema.index({ country: 1 });
ScholarshipSchema.index({ type: 1 });
ScholarshipSchema.index({ isActive: 1 });
ScholarshipSchema.index({ deadline: 1 });

// Create and export the model
const Scholarship = mongoose.model<IScholarship>("Scholarship", ScholarshipSchema);

export default Scholarship;