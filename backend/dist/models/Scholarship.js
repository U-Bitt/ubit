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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const ScholarshipSchema = new mongoose_1.Schema({
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
            validator: function (v) {
                return !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: "Contact email must be a valid email address",
        },
    },
    website: {
        type: String,
        trim: true,
        validate: {
            validator: function (v) {
                return !v || /^https?:\/\/.+/.test(v);
            },
            message: "Website must be a valid URL",
        },
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
    collection: "scholarships",
});
ScholarshipSchema.index({ title: 1 });
ScholarshipSchema.index({ university: 1 });
ScholarshipSchema.index({ country: 1 });
ScholarshipSchema.index({ type: 1 });
ScholarshipSchema.index({ isActive: 1 });
ScholarshipSchema.index({ deadline: 1 });
const Scholarship = mongoose_1.default.model("Scholarship", ScholarshipSchema);
exports.default = Scholarship;
//# sourceMappingURL=Scholarship.js.map