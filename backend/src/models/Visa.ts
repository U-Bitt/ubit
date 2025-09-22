import mongoose, { Document, Schema } from "mongoose";

// Visa interface extending Mongoose Document
export interface IVisa extends Document {
  country: string;
  type: string;
  processingTime: string;
  cost: string;
  validity: string;
  requirements: string[];
  documents: string[];
  officialWebsite: string;
  description?: string;
  eligibility?: string[];
  restrictions?: string[];
  benefits?: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Visa schema
const VisaSchema = new Schema<IVisa>(
  {
    country: {
      type: String,
      required: [true, "Country name is required"],
      trim: true,
      maxlength: [100, "Country name cannot be more than 100 characters"],
    },
    type: {
      type: String,
      required: [true, "Visa type is required"],
      trim: true,
      maxlength: [200, "Visa type cannot be more than 200 characters"],
    },
    processingTime: {
      type: String,
      required: [true, "Processing time is required"],
      trim: true,
    },
    cost: {
      type: String,
      required: [true, "Cost is required"],
      trim: true,
    },
    validity: {
      type: String,
      required: [true, "Validity period is required"],
      trim: true,
    },
    requirements: [
      {
        type: String,
        trim: true,
      },
    ],
    documents: [
      {
        type: String,
        trim: true,
      },
    ],
    officialWebsite: {
      type: String,
      required: [true, "Official website is required"],
      trim: true,
      validate: {
        validator: function (v: string) {
          return /^https?:\/\/.+/.test(v);
        },
        message: "Official website must be a valid URL",
      },
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot be more than 1000 characters"],
    },
    eligibility: [
      {
        type: String,
        trim: true,
      },
    ],
    restrictions: [
      {
        type: String,
        trim: true,
      },
    ],
    benefits: [
      {
        type: String,
        trim: true,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
    collection: "visas",
  }
);

// Indexes for better query performance
VisaSchema.index({ country: 1 });
VisaSchema.index({ type: 1 });
VisaSchema.index({ isActive: 1 });

// Create and export the model
const Visa = mongoose.model<IVisa>("Visa", VisaSchema);

export default Visa;