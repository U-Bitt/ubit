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
const VisaSchema = new mongoose_1.Schema({
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
            validator: function (v) {
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
}, {
    timestamps: true,
    collection: "visas",
});
VisaSchema.index({ country: 1 });
VisaSchema.index({ type: 1 });
VisaSchema.index({ isActive: 1 });
const Visa = mongoose_1.default.model("Visa", VisaSchema);
exports.default = Visa;
//# sourceMappingURL=Visa.js.map