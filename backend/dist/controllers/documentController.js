"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentController = void 0;
let documents = [
    {
        id: "1",
        name: "High School Transcript",
        type: "Transcript",
        university: "MIT",
        status: "Uploaded",
        uploadDate: "2024-11-15",
        size: "2.3 MB",
        format: "PDF",
        filePath: "/uploads/transcript.pdf",
        userId: "user1"
    },
    {
        id: "2",
        name: "Personal Statement",
        type: "Essay",
        university: "Stanford",
        status: "Draft",
        uploadDate: "2024-11-20",
        size: "0.5 MB",
        format: "DOCX",
        filePath: "/uploads/personal_statement.docx",
        userId: "user1"
    },
    {
        id: "3",
        name: "Portfolio - CS Projects",
        type: "Portfolio",
        university: "All",
        status: "Uploaded",
        uploadDate: "2024-11-18",
        size: "15.2 MB",
        format: "ZIP",
        filePath: "/uploads/portfolio.zip",
        userId: "user1"
    }
];
exports.documentController = {
    getAllDocuments: async (req, res) => {
        try {
            const userId = req.headers['user-id'] || 'user1';
            const userDocuments = documents.filter(doc => doc.userId === userId);
            res.status(200).json({
                success: true,
                data: userDocuments
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to fetch documents",
                error: error instanceof Error ? error.message : "Unknown error"
            });
        }
    },
    createDocument: async (req, res) => {
        try {
            const { name, type, university, status, format, filePath } = req.body;
            if (!name || !type) {
                return res.status(400).json({
                    success: false,
                    message: "Document name and type are required"
                });
            }
            const newDocument = {
                id: Date.now().toString(),
                name,
                type,
                university: university || "All",
                status: status || "Uploaded",
                uploadDate: new Date().toISOString().split('T')[0],
                size: "0 MB",
                format: format || "PDF",
                filePath: filePath || "",
                userId: req.headers['user-id'] || 'user1'
            };
            documents.push(newDocument);
            res.status(201).json({
                success: true,
                data: newDocument,
                message: "Document created successfully"
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to create document",
                error: error instanceof Error ? error.message : "Unknown error"
            });
        }
    },
    updateDocument: async (req, res) => {
        try {
            const { id } = req.params;
            const updates = req.body;
            const docIndex = documents.findIndex(doc => doc.id === id);
            if (docIndex === -1) {
                return res.status(404).json({
                    success: false,
                    message: "Document not found"
                });
            }
            documents[docIndex] = { ...documents[docIndex], ...updates };
            res.status(200).json({
                success: true,
                data: documents[docIndex],
                message: "Document updated successfully"
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to update document",
                error: error instanceof Error ? error.message : "Unknown error"
            });
        }
    },
    deleteDocument: async (req, res) => {
        try {
            const { id } = req.params;
            const docIndex = documents.findIndex(doc => doc.id === id);
            if (docIndex === -1) {
                return res.status(404).json({
                    success: false,
                    message: "Document not found"
                });
            }
            documents.splice(docIndex, 1);
            res.status(200).json({
                success: true,
                message: "Document deleted successfully"
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to delete document",
                error: error instanceof Error ? error.message : "Unknown error"
            });
        }
    }
};
//# sourceMappingURL=documentController.js.map