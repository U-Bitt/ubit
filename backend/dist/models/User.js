"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UserSchema = new mongoose_1.Schema({
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
        select: false,
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
            validator: function (value) {
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
                validator: function (value) {
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
    areasOfInterest: [{
            type: String,
            trim: true,
            maxlength: [100, "Interest cannot be more than 100 characters"],
        }],
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
}, {
    timestamps: true,
    collection: "users",
});
UserSchema.index({ email: 1 });
UserSchema.index({ isActive: 1 });
UserSchema.index({ createdAt: -1 });
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();
    try {
        const salt = await bcryptjs_1.default.genSalt(12);
        this.password = await bcryptjs_1.default.hash(this.password, salt);
        next();
    }
    catch (error) {
        next(error);
    }
});
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return bcryptjs_1.default.compare(candidatePassword, this.password);
};
UserSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    delete userObject.password;
    return userObject;
};
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;
//# sourceMappingURL=User.js.map