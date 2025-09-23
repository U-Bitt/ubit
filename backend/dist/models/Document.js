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
const DocumentSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        required: true,
        enum: [
            "CV/Resume",
            "Portfolio",
            "Transcript",
            "Personal Statement",
            "Recommendation Letter",
            "Research Paper",
            "Certificate",
            "Other",
        ],
    },
    university: {
        type: String,
        required: true,
        default: "All",
    },
    status: {
        type: String,
        required: true,
        enum: ["Uploaded", "Draft", "Pending", "Rejected"],
        default: "Uploaded",
    },
    uploadDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    size: {
        type: String,
        required: true,
    },
    format: {
        type: String,
        required: true,
        uppercase: true,
    },
    filePath: {
        type: String,
        required: true,
    },
    version: {
        type: Number,
        required: true,
        default: 1,
    },
    parentDocumentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Document",
        default: null,
    },
    isLatestVersion: {
        type: Boolean,
        required: true,
        default: true,
    },
    uploadedBy: {
        type: String,
        required: true,
    },
    metadata: {
        originalFileName: String,
        mimeType: String,
        checksum: String,
        description: String,
    },
}, {
    timestamps: true,
});
DocumentSchema.index({ uploadedBy: 1, isLatestVersion: 1 });
DocumentSchema.index({ parentDocumentId: 1 });
DocumentSchema.index({ name: 1, uploadedBy: 1 });
DocumentSchema.pre("save", async function (next) {
    if (this.isNew) {
        const DocumentModel = this.constructor;
        const existingDocs = await DocumentModel.find({
            name: this.name,
            uploadedBy: this.uploadedBy,
            type: this.type,
        }).sort({ version: -1 });
        if (existingDocs.length > 0) {
            const latestDoc = existingDocs[0];
            this.parentDocumentId = (latestDoc.parentDocumentId || latestDoc._id).toString();
            this.version = latestDoc.version + 1;
            await DocumentModel.updateMany({
                $or: [
                    { _id: this.parentDocumentId },
                    { parentDocumentId: this.parentDocumentId },
                ],
            }, { isLatestVersion: false });
        }
        else {
            this.parentDocumentId = this._id.toString();
            this.version = 1;
        }
    }
    next();
});
exports.default = mongoose_1.default.model("Document", DocumentSchema);
//# sourceMappingURL=Document.js.map