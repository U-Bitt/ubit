// Mock document data service for frontend-only functionality
export interface Document {
  id: number;
  name: string;
  type: string;
  university: string;
  status: "Uploaded" | "Draft" | "Pending";
  uploadDate: string | null;
  size: string | null;
  format: string;
  filename?: string;
  path?: string;
}

// Mock documents data
let mockDocuments: Document[] = [
  {
    id: 1,
    name: "High School Transcript",
    type: "Transcript",
    university: "MIT",
    status: "Uploaded",
    uploadDate: "2024-11-15",
    size: "2.3 MB",
    format: "PDF",
    filename: "transcript.pdf",
    path: "/uploads/documents/transcript.pdf",
  },
  {
    id: 2,
    name: "SAT Score Report",
    type: "Test Score",
    university: "All",
    status: "Uploaded",
    uploadDate: "2024-11-10",
    size: "1.1 MB",
    format: "PDF",
    filename: "sat-scores.pdf",
    path: "/uploads/documents/sat-scores.pdf",
  },
  {
    id: 3,
    name: "Personal Statement",
    type: "Essay",
    university: "Stanford",
    status: "Draft",
    uploadDate: "2024-11-20",
    size: "0.5 MB",
    format: "DOCX",
    filename: "personal-statement.docx",
    path: "/uploads/documents/personal-statement.docx",
  },
  {
    id: 4,
    name: "Recommendation Letter - Prof. Smith",
    type: "Recommendation",
    university: "MIT",
    status: "Pending",
    uploadDate: null,
    size: null,
    format: "PDF",
    filename: null,
    path: null,
  },
  {
    id: 5,
    name: "Portfolio - CS Projects",
    type: "Portfolio",
    university: "All",
    status: "Uploaded",
    uploadDate: "2024-11-18",
    size: "15.2 MB",
    format: "ZIP",
    filename: "portfolio.zip",
    path: "/uploads/documents/portfolio.zip",
  },
];

// Mock API functions
export const mockDocumentApi = {
  getAll: (): Promise<{
    success: boolean;
    data: Document[];
    count: number;
  }> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [...mockDocuments],
          count: mockDocuments.length,
        });
      }, 500); // Simulate network delay
    });
  },

  getById: (id: number): Promise<{ success: boolean; data: Document }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const document = mockDocuments.find(doc => doc.id === id);
        if (document) {
          resolve({
            success: true,
            data: document,
          });
        } else {
          reject(new Error("Document not found"));
        }
      }, 300);
    });
  },

  upload: (
    formData: FormData
  ): Promise<{ success: boolean; message: string; data: Document }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const file = formData.get("file") as File;
        const name = formData.get("name") as string;
        const type = formData.get("type") as string;
        const university = formData.get("university") as string;

        if (!file || !name || !type || !university) {
          reject(new Error("Missing required fields"));
          return;
        }

        const newDocument: Document = {
          id: Math.max(...mockDocuments.map(d => d.id)) + 1,
          name,
          type,
          university,
          status: "Uploaded",
          uploadDate: new Date().toISOString().split("T")[0],
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          format: file.name.split(".").pop()?.toUpperCase() || "UNKNOWN",
          filename: `${Date.now()}-${file.name}`,
          path: `/uploads/documents/${Date.now()}-${file.name}`,
        };

        mockDocuments.push(newDocument);

        resolve({
          success: true,
          message: "Document uploaded successfully",
          data: newDocument,
        });
      }, 1000); // Simulate upload time
    });
  },

  update: (
    id: number,
    data: Partial<Document>
  ): Promise<{ success: boolean; message: string; data: Document }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const documentIndex = mockDocuments.findIndex(doc => doc.id === id);
        if (documentIndex === -1) {
          reject(new Error("Document not found"));
          return;
        }

        const updatedDocument = {
          ...mockDocuments[documentIndex],
          ...data,
          updatedAt: new Date().toISOString(),
        };

        mockDocuments[documentIndex] = updatedDocument;

        resolve({
          success: true,
          message: "Document updated successfully",
          data: updatedDocument,
        });
      }, 500);
    });
  },

  delete: (id: number): Promise<{ success: boolean; message: string }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const documentIndex = mockDocuments.findIndex(doc => doc.id === id);
        if (documentIndex === -1) {
          reject(new Error("Document not found"));
          return;
        }

        mockDocuments.splice(documentIndex, 1);

        resolve({
          success: true,
          message: "Document deleted successfully",
        });
      }, 500);
    });
  },

  download: (id: number): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const document = mockDocuments.find(doc => doc.id === id);
        if (!document) {
          reject(new Error("Document not found"));
          return;
        }

        // Create a mock blob for demonstration
        const mockContent = `This is a mock download for: ${document.name}`;
        const blob = new Blob([mockContent], { type: "text/plain" });
        resolve(blob);
      }, 500);
    });
  },
};
