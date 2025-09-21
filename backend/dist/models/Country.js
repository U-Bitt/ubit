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
const CountrySchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
    collection: "countries",
});
CountrySchema.index({ name: 1 });
CountrySchema.index({ rating: -1 });
CountrySchema.index({ isEnglishSpeaking: 1 });
CountrySchema.index({ isLowCost: 1 });
CountrySchema.index({ hasWorkRights: 1 });
const Country = mongoose_1.default.model("Country", CountrySchema);
exports.default = Country;
//# sourceMappingURL=Country.js.map