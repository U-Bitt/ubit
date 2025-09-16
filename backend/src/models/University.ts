import mongoose, { Document, Schema } from "mongoose";

// University interface extending Mongoose Document
export interface IUniversity extends Document {
  name: string;
  location: string;
  ranking: number;
  rating: number;
  tuition: string;
  acceptance: string;
  students: string;
  image: string;
  programs: string[];
  highlights: string[];
  deadline: string;
  description?: string;
  website?: string;
  founded?: number;
  type?: "public" | "private";
  size?: "small" | "medium" | "large";
  createdAt: Date;
  updatedAt: Date;
}

// University schema
const UniversitySchema = new Schema<IUniversity>(
  {
    name: {
      type: String,
      required: [true, "University name is required"],
      trim: true,
      maxlength: [200, "Name cannot be more than 200 characters"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
      maxlength: [100, "Location cannot be more than 100 characters"],
    },
    ranking: {
      type: Number,
      required: [true, "Ranking is required"],
      min: [1, "Ranking must be at least 1"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [0, "Rating must be at least 0"],
      max: [5, "Rating cannot be more than 5"],
    },
    tuition: {
      type: String,
      required: [true, "Tuition information is required"],
      trim: true,
    },
    acceptance: {
      type: String,
      required: [true, "Acceptance rate is required"],
      trim: true,
    },
    students: {
      type: String,
      required: [true, "Student count is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Image is required"],
      trim: true,
    },
    programs: [
      {
        type: String,
        trim: true,
      },
    ],
    highlights: [
      {
        type: String,
        trim: true,
      },
    ],
    deadline: {
      type: String,
      required: [true, "Application deadline is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot be more than 1000 characters"],
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
    founded: {
      type: Number,
      min: [1000, "Founded year must be realistic"],
      max: [new Date().getFullYear(), "Founded year cannot be in the future"],
    },
    type: {
      type: String,
      enum: ["public", "private"],
      default: "private",
    },
    size: {
      type: String,
      enum: ["small", "medium", "large"],
      default: "medium",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
    collection: "universities",
  }
);

// Indexes for better query performance
UniversitySchema.index({ name: 1 });
UniversitySchema.index({ location: 1 });
UniversitySchema.index({ ranking: 1 });
UniversitySchema.index({ rating: -1 });
UniversitySchema.index({ programs: 1 });

// Create and export the model
const University = mongoose.model<IUniversity>("University", UniversitySchema);

export default University;
