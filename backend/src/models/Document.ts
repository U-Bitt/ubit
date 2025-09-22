import mongoose, { Document as MongoDocument, Schema } from "mongoose";

export interface IDocument extends MongoDocument {
  name: string;
  type: string;
  university: string;
  status: "Uploaded" | "Draft" | "Pending" | "Rejected";
  uploadDate: Date;
  size: string;
  format: string;
  filePath: string;
  version: number;
  parentDocumentId?: string; // For versioning - points to the original document
  isLatestVersion: boolean;
  uploadedBy: string; // User ID who uploaded the document
  metadata?: {
    originalFileName?: string;
    mimeType?: string;
    checksum?: string;
    description?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const DocumentSchema = new Schema<IDocument>(
  {
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
      type: Schema.Types.ObjectId,
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
  },
  {
    timestamps: true,
  }
);

// Index for efficient querying
DocumentSchema.index({ uploadedBy: 1, isLatestVersion: 1 });
DocumentSchema.index({ parentDocumentId: 1 });
DocumentSchema.index({ name: 1, uploadedBy: 1 });

// Pre-save middleware to handle versioning
DocumentSchema.pre("save", async function (next) {
  if (this.isNew) {
    const DocumentModel = this.constructor as any;

    // If this is a new document, check if there are existing versions
    const existingDocs = await DocumentModel.find({
      name: this.name,
      uploadedBy: this.uploadedBy,
      type: this.type,
    }).sort({ version: -1 });

    if (existingDocs.length > 0) {
      // This is a new version
      const latestDoc = existingDocs[0];
      this.parentDocumentId = (
        latestDoc.parentDocumentId || latestDoc._id
      ).toString();
      this.version = latestDoc.version + 1;

      // Mark all previous versions as not latest
      await DocumentModel.updateMany(
        {
          $or: [
            { _id: this.parentDocumentId },
            { parentDocumentId: this.parentDocumentId },
          ],
        },
        { isLatestVersion: false }
      );
    } else {
      // This is the first version
      this.parentDocumentId = (this._id as any).toString();
      this.version = 1;
    }
  }
  next();
});

export default mongoose.model<IDocument>("Document", DocumentSchema);
