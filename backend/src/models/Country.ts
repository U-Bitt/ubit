import mongoose, { Document, Schema } from "mongoose";

// Country interface extending Mongoose Document
export interface ICountry extends Document {
  name: string;
  flag: string;
  popularCities: string[];
  rating: number;
  description: string;
  visaType: string;
  workRights: string;
  avgTuition: string;
  livingCost: string;
  currency: string;
  language: string[];
  climate: string;
  isEnglishSpeaking?: boolean;
  isLowCost?: boolean;
  hasWorkRights?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Country schema
const CountrySchema = new Schema<ICountry>(
  {
    name: {
      type: String,
      required: [true, "Country name is required"],
      trim: true,
      maxlength: [100, "Name cannot be more than 100 characters"],
    },
    flag: {
      type: String,
      required: [true, "Flag emoji is required"],
      trim: true,
    },
    popularCities: [
      {
        type: String,
        trim: true,
      },
    ],
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [0, "Rating must be at least 0"],
      max: [5, "Rating cannot be more than 5"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [500, "Description cannot be more than 500 characters"],
    },
    visaType: {
      type: String,
      required: [true, "Visa type is required"],
      trim: true,
    },
    workRights: {
      type: String,
      required: [true, "Work rights information is required"],
      trim: true,
    },
    avgTuition: {
      type: String,
      required: [true, "Average tuition is required"],
      trim: true,
    },
    livingCost: {
      type: String,
      required: [true, "Living cost is required"],
      trim: true,
    },
    currency: {
      type: String,
      required: [true, "Currency is required"],
      trim: true,
    },
    language: [
      {
        type: String,
        trim: true,
      },
    ],
    climate: {
      type: String,
      required: [true, "Climate information is required"],
      trim: true,
    },
    isEnglishSpeaking: {
      type: Boolean,
      default: false,
    },
    isLowCost: {
      type: Boolean,
      default: false,
    },
    hasWorkRights: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
    collection: "countries",
  }
);

// Indexes for better query performance
CountrySchema.index({ name: 1 });
CountrySchema.index({ rating: -1 });
CountrySchema.index({ isEnglishSpeaking: 1 });
CountrySchema.index({ isLowCost: 1 });
CountrySchema.index({ hasWorkRights: 1 });

// Create and export the model
const Country = mongoose.model<ICountry>("Country", CountrySchema);

export default Country;