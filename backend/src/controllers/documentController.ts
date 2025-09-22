import { Request, Response } from "express";
import Document, { IDocument } from "../models/Document";
import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/documents";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx|jpg|jpeg|png|gif|zip/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid file type. Only PDF, DOC, DOCX, JPG, PNG, GIF, ZIP files are allowed."
        )
      );
    }
  },
});

// Get all documents for a user
export const getAllDocuments = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const documents = await Document.find({
      uploadedBy: userId,
      isLatestVersion: true,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: documents,
    });
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching documents",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Get document by ID
export const getDocumentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const document = await Document.findById(id);

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
  } catch (error) {
    console.error("Error fetching document:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching document",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Get document versions
export const getDocumentVersions = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const document = await Document.findById(id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    const parentId = document.parentDocumentId || document._id;
    const versions = await Document.find({
      $or: [{ _id: parentId }, { parentDocumentId: parentId }],
    }).sort({ version: -1 });

    return res.json({
      success: true,
      data: versions,
    });
  } catch (error) {
    console.error("Error fetching document versions:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching document versions",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Upload new document
export const uploadDocument = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { name, type, university = "All", description } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // Calculate file checksum
    const fileBuffer = fs.readFileSync(req.file.path);
    const checksum = crypto.createHash("md5").update(fileBuffer).digest("hex");

    // Get file size in MB
    const fileSizeInMB = (req.file.size / (1024 * 1024)).toFixed(2);

    const documentData: Partial<IDocument> = {
      name,
      type,
      university,
      status: "Uploaded",
      uploadDate: new Date(),
      size: `${fileSizeInMB} MB`,
      format: path.extname(req.file.originalname).toUpperCase().slice(1),
      filePath: `/uploads/documents/${req.file.filename}`,
      uploadedBy: userId,
      metadata: {
        originalFileName: req.file.originalname,
        mimeType: req.file.mimetype,
        checksum,
        description,
      },
    };

    const document = new Document(documentData);
    await document.save();

    return res.json({
      success: true,
      data: document,
      message: "Document uploaded successfully",
    });
  } catch (error) {
    console.error("Error uploading document:", error);

    // Clean up uploaded file if document creation failed
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({
      success: false,
      message: "Error uploading document",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Update document
export const updateDocument = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, type, status, description } = req.body;

    const document = await Document.findById(id);
    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    const updateData: Partial<IDocument> = {};
    if (name) updateData.name = name;
    if (type) updateData.type = type;
    if (status) updateData.status = status;
    if (description)
      updateData.metadata = { ...document.metadata, description };

    const updatedDocument = await Document.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    return res.json({
      success: true,
      data: updatedDocument,
      message: "Document updated successfully",
    });
  } catch (error) {
    console.error("Error updating document:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating document",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Upload new version of existing document
export const uploadNewVersion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const originalDocument = await Document.findById(id);
    if (!originalDocument) {
      return res.status(404).json({
        success: false,
        message: "Original document not found",
      });
    }

    // Calculate file checksum
    const fileBuffer = fs.readFileSync(req.file.path);
    const checksum = crypto.createHash("md5").update(fileBuffer).digest("hex");

    // Get file size in MB
    const fileSizeInMB = (req.file.size / (1024 * 1024)).toFixed(2);

    const newVersionData: Partial<IDocument> = {
      name: originalDocument.name,
      type: originalDocument.type,
      university: originalDocument.university,
      status: "Uploaded",
      uploadDate: new Date(),
      size: `${fileSizeInMB} MB`,
      format: path.extname(req.file.originalname).toUpperCase().slice(1),
      filePath: `/uploads/documents/${req.file.filename}`,
      uploadedBy: userId,
      parentDocumentId: (
        originalDocument.parentDocumentId || (originalDocument._id as any)
      ).toString(),
      metadata: {
        originalFileName: req.file.originalname,
        mimeType: req.file.mimetype,
        checksum,
        description: originalDocument.metadata?.description,
      },
    };

    const newVersion = new Document(newVersionData);
    await newVersion.save();

    return res.json({
      success: true,
      data: newVersion,
      message: "New version uploaded successfully",
    });
  } catch (error) {
    console.error("Error uploading new version:", error);

    // Clean up uploaded file if document creation failed
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({
      success: false,
      message: "Error uploading new version",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Delete document
export const deleteDocument = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { deleteAllVersions = false } = req.body;

    const document = await Document.findById(id);
    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    if (deleteAllVersions) {
      // Delete all versions
      const parentId = document.parentDocumentId || document._id;
      const allVersions = await Document.find({
        $or: [{ _id: parentId }, { parentDocumentId: parentId }],
      });

      // Delete files from filesystem
      for (const doc of allVersions) {
        if (doc.filePath && fs.existsSync(doc.filePath)) {
          fs.unlinkSync(doc.filePath);
        }
      }

      await Document.deleteMany({
        $or: [{ _id: parentId }, { parentDocumentId: parentId }],
      });
    } else {
      // Delete only this version
      if (document.filePath && fs.existsSync(document.filePath)) {
        fs.unlinkSync(document.filePath);
      }

      await Document.findByIdAndDelete(id);

      // If this was the latest version, update the latest version
      if (document.isLatestVersion) {
        const parentId = document.parentDocumentId || document._id;
        const remainingVersions = await Document.find({
          $or: [{ _id: parentId }, { parentDocumentId: parentId }],
          _id: { $ne: id },
        }).sort({ version: -1 });

        if (remainingVersions.length > 0) {
          await Document.findByIdAndUpdate(remainingVersions[0]._id, {
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
  } catch (error) {
    console.error("Error deleting document:", error);
    return res.status(500).json({
      success: false,
      message: "Error deleting document",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Middleware for file upload
export const uploadMiddleware = upload.single("file");
