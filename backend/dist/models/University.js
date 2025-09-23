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
const UniversitySchema = new mongoose_1.Schema({
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
            validator: function (v) {
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
    requirements: [
        {
            type: String,
            trim: true,
        },
    ],
    scholarships: [
        {
            name: {
                type: String,
                required: true,
                trim: true,
            },
            amount: {
                type: String,
                required: true,
                trim: true,
            },
            requirements: [
                {
                    type: String,
                    trim: true,
                },
            ],
            deadline: {
                type: String,
                required: true,
                trim: true,
            },
            description: {
                type: String,
                trim: true,
            },
        },
    ],
    campusSize: {
        type: String,
        trim: true,
    },
    studentFacultyRatio: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true,
    collection: "universities",
});
UniversitySchema.index({ name: 1 });
UniversitySchema.index({ location: 1 });
UniversitySchema.index({ ranking: 1 });
UniversitySchema.index({ rating: -1 });
UniversitySchema.index({ programs: 1 });
const University = mongoose_1.default.model("University", UniversitySchema);
exports.default = University;
//# sourceMappingURL=University.js.map