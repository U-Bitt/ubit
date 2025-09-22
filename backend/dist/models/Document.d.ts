import mongoose, { Document as MongoDocument } from "mongoose";
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
    parentDocumentId?: string;
    isLatestVersion: boolean;
    uploadedBy: string;
    metadata?: {
        originalFileName?: string;
        mimeType?: string;
        checksum?: string;
        description?: string;
    };
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<IDocument, {}, {}, {}, mongoose.Document<unknown, {}, IDocument, {}, {}> & IDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Document.d.ts.map