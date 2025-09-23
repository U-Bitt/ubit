import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

// User interface extending Mongoose Document
export interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: Date;
  nationality?: string;
  avatar?: string;
  
  // Personal Information
  personalInfo?: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    dateOfBirth?: Date;
    nationality?: string;
  };
  
  // Academic Information
  academicInfo?: {
    gpa: number; // GPA out of 4
    highSchoolName: string;
    graduationYear: number;
    intendedMajors: string[];
  };
  
  // Areas of Interest
  areasOfInterest?: string[];
  
  // Test Scores
  testScores?: Array<{
    id: string;
    examType: string;
    score: string;
    maxScore: string;
    certified: boolean;
    testDate: string;
    validityDate: string;
  }>;
  
  // Documents
  documents?: Array<{
    id: string;
    name: string;
    type: string;
    url?: string;
    uploadedAt: Date;
    status: "draft" | "uploaded" | "verified" | "rejected";
  }>;
  
  // Saved Universities
  savedUniversities?: Array<{
    id: string;
    universityId: string;
    universityName: string;
    savedAt: Date;
    notes?: string;
  }>;
  
  // Legacy fields for backward compatibility
  preferences?: {
    countries: string[];
    programs: string[];
    budget: {
      min: number;
      max: number;
      currency: string;
    };
    examScores?: Record<string, number>;
  };
  applications?: Array<{
    id: string;
    universityId?: string;
    program?: string;
    status: "draft" | "submitted" | "under_review" | "accepted" | "rejected";
    documents: string[];
    submittedAt?: Date;
    deadline?: Date;
  }>;
  
  isActive: boolean;
  isEmailVerified: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  
  // Instance methods
  comparePassword(candidatePassword: string): Promise<boolean>;
  toJSON(): any;
}

// User schema
const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // Don't include password in queries by default
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      maxlength: [50, "First name cannot be more than 50 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      maxlength: [50, "Last name cannot be more than 50 characters"],
    },
    phone: {
      type: String,
      trim: true,
      match: [/^[\+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number"],
    },
    dateOfBirth: {
      type: Date,
      validate: {
        validator: function (value: Date) {
          return !value || value < new Date();
        },
        message: "Date of birth must be in the past",
      },
    },
    nationality: {
      type: String,
      trim: true,
      maxlength: [50, "Nationality cannot be more than 50 characters"],
    },
    avatar: {
      type: String,
      trim: true,
    },
    
    // Personal Information
    personalInfo: {
      firstName: {
        type: String,
        trim: true,
        maxlength: [50, "First name cannot be more than 50 characters"],
      },
      lastName: {
        type: String,
        trim: true,
        maxlength: [50, "Last name cannot be more than 50 characters"],
      },
      email: {
        type: String,
        lowercase: true,
        trim: true,
        match: [
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
          "Please enter a valid email",
        ],
      },
      phone: {
        type: String,
        trim: true,
        match: [/^[\+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number"],
      },
      dateOfBirth: {
        type: Date,
        validate: {
          validator: function (value: Date) {
            return !value || value < new Date();
          },
          message: "Date of birth must be in the past",
        },
      },
      nationality: {
        type: String,
        trim: true,
        maxlength: [50, "Nationality cannot be more than 50 characters"],
      },
    },
    
    // Academic Information
    academicInfo: {
      gpa: {
        type: Number,
        min: [0, "GPA cannot be negative"],
        max: [4, "GPA cannot exceed 4.0"],
      },
      highSchoolName: {
        type: String,
        trim: true,
        maxlength: [200, "High school name cannot be more than 200 characters"],
      },
      graduationYear: {
        type: Number,
        min: [1900, "Graduation year must be realistic"],
        max: [new Date().getFullYear() + 10, "Graduation year cannot be too far in the future"],
      },
      intendedMajors: [{
        type: String,
        trim: true,
        maxlength: [100, "Major name cannot be more than 100 characters"],
      }],
    },
    
    // Areas of Interest
    areasOfInterest: [{
      type: String,
      trim: true,
      maxlength: [100, "Interest cannot be more than 100 characters"],
    }],
    
    // Test Scores
    testScores: [{
      id: {
        type: String,
        required: false,
      },
      examType: {
        type: String,
        required: true,
        trim: true,
        maxlength: [100, "Exam type cannot be more than 100 characters"],
      },
      score: {
        type: String,
        required: true,
        trim: true,
      },
      maxScore: {
        type: String,
        required: true,
        trim: true,
      },
      certified: {
        type: Boolean,
        default: false,
      },
      testDate: {
        type: String,
        required: true,
        trim: true,
      },
      validityDate: {
        type: String,
        required: true,
        trim: true,
      },
    }],
    
    // Documents
    documents: [{
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
        trim: true,
        maxlength: [200, "Document name cannot be more than 200 characters"],
      },
      type: {
        type: String,
        required: true,
        trim: true,
        enum: ["transcript", "recommendation", "essay", "portfolio", "certificate", "other"],
      },
      url: {
        type: String,
        trim: true,
      },
      uploadedAt: {
        type: Date,
        default: Date.now,
      },
      status: {
        type: String,
        enum: ["draft", "uploaded", "verified", "rejected"],
        default: "draft",
      },
    }],
    
    // Saved Universities
    savedUniversities: [{
      id: {
        type: String,
        required: true,
      },
      universityId: {
        type: String,
        required: true,
        trim: true,
      },
      universityName: {
        type: String,
        required: true,
        trim: true,
        maxlength: [200, "University name cannot be more than 200 characters"],
      },
      savedAt: {
        type: Date,
        default: Date.now,
      },
      notes: {
        type: String,
        trim: true,
        maxlength: [1000, "Notes cannot be more than 1000 characters"],
      },
    }],
    
    // Legacy fields for backward compatibility
    preferences: {
      countries: [{
        type: String,
        trim: true,
      }],
      programs: [{
        type: String,
        trim: true,
      }],
      budget: {
        min: {
          type: Number,
          min: [0, "Minimum budget must be positive"],
        },
        max: {
          type: Number,
          min: [0, "Maximum budget must be positive"],
        },
        currency: {
          type: String,
          default: "USD",
          enum: ["USD", "EUR", "GBP", "CAD", "AUD", "JPY", "CNY"],
        },
      },
      examScores: {
        type: Map,
        of: Number,
      },
    },
    applications: [{
      id: {
        type: String,
        required: true,
      },
      universityId: {
        type: String,
        trim: true,
      },
      program: {
        type: String,
        trim: true,
      },
      status: {
        type: String,
        enum: ["draft", "submitted", "under_review", "accepted", "rejected"],
        default: "draft",
      },
      documents: [{
        type: String,
        trim: true,
      }],
      submittedAt: {
        type: Date,
      },
      deadline: {
        type: Date,
      },
    }],
    
    isActive: {
      type: Boolean,
      default: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
    collection: "users",
  }
);

// Indexes for better query performance
UserSchema.index({ email: 1 });
UserSchema.index({ isActive: 1 });
UserSchema.index({ createdAt: -1 });

// Pre-save middleware to hash password
UserSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return next();

  try {
    // Hash password with cost of 12
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Instance method to compare password
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Instance method to remove password from JSON output
UserSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

// Create and export the model
const User = mongoose.model<IUser>("User", UserSchema);

export default User;