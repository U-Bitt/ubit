"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMiddleware = exports.deleteDocument = exports.uploadNewVersion = exports.updateDocument = exports.uploadDocument = exports.getDocumentVersions = exports.getDocumentById = exports.getAllDocuments = void 0;
const Document_1 = __importDefault(require("../models/Document"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const crypto_1 = __importDefault(require("crypto"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = "uploads/documents";
        if (!fs_1.default.existsSync(uploadDir)) {
            fs_1.default.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
});
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /pdf|doc|docx|jpg|jpeg|png|gif|zip/;
        const extname = allowedTypes.test(path_1.default.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        }
        else {
            cb(new Error("Invalid file type. Only PDF, DOC, DOCX, JPG, PNG, GIF, ZIP files are allowed."));
        }
    },
});
const getAllDocuments = async (req, res) => {
    try {
        const { userId } = req.params;
        const documents = await Document_1.default.find({
            uploadedBy: userId,
            isLatestVersion: true,
        }).sort({ createdAt: -1 });
        res.json({
            success: true,
            data: documents,
        });
    }
    catch (error) {
        console.error("Error fetching documents:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching documents",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getAllDocuments = getAllDocuments;
const getDocumentById = async (req, res) => {
    try {
        const { id } = req.params;
        const document = await Document_1.default.findById(id);
        if (!document) {
            return res.status(404).json({
                success: false,
                message: "Document not found",
            });
        }
        return res.json({
            success: true,
            data: document,
        });
    }
    catch (error) {
        console.error("Error fetching document:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching document",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getDocumentById = getDocumentById;
const getDocumentVersions = async (req, res) => {
    try {
        const { id } = req.params;
        const document = await Document_1.default.findById(id);
        if (!document) {
            return res.status(404).json({
                success: false,
                message: "Document not found",
            });
        }
        const parentId = document.parentDocumentId || document._id;
        const versions = await Document_1.default.find({
            $or: [{ _id: parentId }, { parentDocumentId: parentId }],
        }).sort({ version: -1 });
        return res.json({
            success: true,
            data: versions,
        });
    }
    catch (error) {
        console.error("Error fetching document versions:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching document versions",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getDocumentVersions = getDocumentVersions;
const uploadDocument = async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, type, university = "All", description } = req.body;
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }
        const fileBuffer = fs_1.default.readFileSync(req.file.path);
        const checksum = crypto_1.default.createHash("md5").update(fileBuffer).digest("hex");
        const fileSizeInMB = (req.file.size / (1024 * 1024)).toFixed(2);
        const documentData = {
            name,
            type,
            university,
            status: "Uploaded",
            uploadDate: new Date(),
            size: `${fileSizeInMB} MB`,
            format: path_1.default.extname(req.file.originalname).toUpperCase().slice(1),
            filePath: `/uploads/documents/${req.file.filename}`,
            uploadedBy: userId,
            metadata: {
                originalFileName: req.file.originalname,
                mimeType: req.file.mimetype,
                checksum,
                description,
            },
        };
        const document = new Document_1.default(documentData);
        await document.save();
        return res.json({
            success: true,
            data: document,
            message: "Document uploaded successfully",
        });
    }
    catch (error) {
        console.error("Error uploading document:", error);
        if (req.file) {
            fs_1.default.unlinkSync(req.file.path);
        }
        return res.status(500).json({
            success: false,
            message: "Error uploading document",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.uploadDocument = uploadDocument;
const updateDocument = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, type, status, description } = req.body;
        const document = await Document_1.default.findById(id);
        if (!document) {
            return res.status(404).json({
                success: false,
                message: "Document not found",
            });
        }
        const updateData = {};
        if (name)
            updateData.name = name;
        if (type)
            updateData.type = type;
        if (status)
            updateData.status = status;
        if (description)
            updateData.metadata = { ...document.metadata, description };
        const updatedDocument = await Document_1.default.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });
        return res.json({
            success: true,
            data: updatedDocument,
            message: "Document updated successfully",
        });
    }
    catch (error) {
        console.error("Error updating document:", error);
        return res.status(500).json({
            success: false,
            message: "Error updating document",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.updateDocument = updateDocument;
const uploadNewVersion = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }
        const originalDocument = await Document_1.default.findById(id);
        if (!originalDocument) {
            return res.status(404).json({
                success: false,
                message: "Original document not found",
            });
        }
        const fileBuffer = fs_1.default.readFileSync(req.file.path);
        const checksum = crypto_1.default.createHash("md5").update(fileBuffer).digest("hex");
        const fileSizeInMB = (req.file.size / (1024 * 1024)).toFixed(2);
        const newVersionData = {
            name: originalDocument.name,
            type: originalDocument.type,
            university: originalDocument.university,
            status: "Uploaded",
            uploadDate: new Date(),
            size: `${fileSizeInMB} MB`,
            format: path_1.default.extname(req.file.originalname).toUpperCase().slice(1),
            filePath: `/uploads/documents/${req.file.filename}`,
            uploadedBy: userId,
            parentDocumentId: (originalDocument.parentDocumentId || originalDocument._id).toString(),
            metadata: {
                originalFileName: req.file.originalname,
                mimeType: req.file.mimetype,
                checksum,
                description: originalDocument.metadata?.description,
            },
        };
        const newVersion = new Document_1.default(newVersionData);
        await newVersion.save();
        return res.json({
            success: true,
            data: newVersion,
            message: "New version uploaded successfully",
        });
    }
    catch (error) {
        console.error("Error uploading new version:", error);
        if (req.file) {
            fs_1.default.unlinkSync(req.file.path);
        }
        return res.status(500).json({
            success: false,
            message: "Error uploading new version",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.uploadNewVersion = uploadNewVersion;
const deleteDocument = async (req, res) => {
    try {
        const { id } = req.params;
        const { deleteAllVersions = false } = req.body;
        const document = await Document_1.default.findById(id);
        if (!document) {
            return res.status(404).json({
                success: false,
                message: "Document not found",
            });
        }
        if (deleteAllVersions) {
            const parentId = document.parentDocumentId || document._id;
            const allVersions = await Document_1.default.find({
                $or: [{ _id: parentId }, { parentDocumentId: parentId }],
            });
            for (const doc of allVersions) {
                if (doc.filePath && fs_1.default.existsSync(doc.filePath)) {
                    fs_1.default.unlinkSync(doc.filePath);
                }
            }
            await Document_1.default.deleteMany({
                $or: [{ _id: parentId }, { parentDocumentId: parentId }],
            });
        }
        else {
            if (document.filePath && fs_1.default.existsSync(document.filePath)) {
                fs_1.default.unlinkSync(document.filePath);
            }
            await Document_1.default.findByIdAndDelete(id);
            if (document.isLatestVersion) {
                const parentId = document.parentDocumentId || document._id;
                const remainingVersions = await Document_1.default.find({
                    $or: [{ _id: parentId }, { parentDocumentId: parentId }],
                    _id: { $ne: id },
                }).sort({ version: -1 });
                if (remainingVersions.length > 0) {
                    await Document_1.default.findByIdAndUpdate(remainingVersions[0]._id, {
                        isLatestVersion: true,
                    });
                }
            }
        }
        return res.json({
            success: true,
            message: deleteAllVersions
                ? "All versions deleted successfully"
                : "Document deleted successfully",
        });
    }
    catch (error) {
        console.error("Error deleting document:", error);
        return res.status(500).json({
            success: false,
            message: "Error deleting document",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.deleteDocument = deleteDocument;
exports.uploadMiddleware = upload.single("file");
//# sourceMappingURL=documentController.js.map