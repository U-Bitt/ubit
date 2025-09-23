import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Calendar,
  FileText,
  File,
  X,
  Check,
} from "lucide-react";
import { testScoreApi, documentApi } from "@/utils/api";

interface TestScore extends Record<string, unknown> {
  id: string;
  examType: string;
  score: string;
  maxScore: string;
  certified: boolean;
  testDate: string;
  validityDate: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  university: string;
  status: string;
  uploadDate: string;
  size: string;
  format: string;
  filePath?: string;
  version?: number;
  isLatestVersion?: boolean;
  parentDocumentId?: string;
  metadata?: {
    originalFileName?: string;
    mimeType?: string;
    checksum?: string;
    description?: string;
  };
}

export const Documents = () => {
  const [testScores, setTestScores] = useState<TestScore[]>([
    {
      id: "1",
      examType: "SAT",
      score: "1450",
      maxScore: "1600",
      certified: true,
      testDate: "2024-10-15",
      validityDate: "2026-10-15",
    },
    {
      id: "2",
      examType: "IELTS",
      score: "7.5",
      maxScore: "9.0",
      certified: true,
      testDate: "2024-09-20",
      validityDate: "2026-09-20",
    },
  ]);

  const [documents, setDocuments] = useState<Document[]>([]);

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isVersionModalOpen, setIsVersionModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );
  const [documentVersions, setDocumentVersions] = useState<Document[]>([]);
  const [selectedDocumentType, setSelectedDocumentType] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Get hardcoded sample documents
  const getSampleDocuments = () => [
    {
      id: "1",
      name: "High School Transcript",
      type: "Transcript",
      university: "MIT",
      status: "Uploaded",
      uploadDate: "2024-11-15",
      size: "2.3 MB",
      format: "PDF",
      filePath:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
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
      filePath:
        "https://file-examples.com/storage/fe68c0b8a0b5b5b5b5b5b5b/sample.docx",
    },
    {
      id: "3",
      name: "Portfolio",
      type: "Portfolio",
      university: "All",
      status: "Uploaded",
      uploadDate: "2024-11-18",
      size: "15.2 MB",
      format: "ZIP",
      filePath:
        "https://file-examples.com/storage/fe68c0b8a0b5b5b5b5b5b5b/sample.zip",
    },
    {
      id: "4",
      name: "CV/Resume",
      type: "CV/Resume",
      university: "Harvard",
      status: "Uploaded",
      uploadDate: "2024-11-12",
      size: "1.8 MB",
      format: "PDF",
      filePath:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      id: "5",
      name: "Recommendation Letter - Professor Smith",
      type: "Recommendation Letter",
      university: "Yale",
      status: "Pending",
      uploadDate: "2024-11-25",
      size: "0.9 MB",
      format: "PDF",
      filePath:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      id: "6",
      name: "Research Paper - Machine Learning",
      type: "Research Paper",
      university: "Princeton",
      status: "Uploaded",
      uploadDate: "2024-11-08",
      size: "3.2 MB",
      format: "PDF",
      filePath:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      id: "7",
      name: "Certificate - Data Science Course",
      type: "Certificate",
      university: "All",
      status: "Uploaded",
      uploadDate: "2024-11-30",
      size: "0.7 MB",
      format: "PDF",
      filePath:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
  ];

  // Fetch documents from API on component mount
  const fetchDocuments = useCallback(async () => {
    try {
      const userId = "user-123"; // In real app, get from auth context
      console.log("Attempting to fetch documents from API...");

      const response = await documentApi.getAll(userId);

      console.log("API Response:", response);

      // Handle both array response and {success: true, data: [...]} response
      let documentsArray: unknown[] = [];
      if (Array.isArray(response)) {
        documentsArray = response;
      } else if (
        response &&
        typeof response === "object" &&
        "success" in response &&
        "data" in response
      ) {
        const apiResponse = response as { success: boolean; data: unknown[] };
        if (apiResponse.success && Array.isArray(apiResponse.data)) {
          documentsArray = apiResponse.data;
        }
      }

      if (documentsArray.length > 0) {
        // Convert API response to Document format
        const apiDocuments = documentsArray.map((doc: unknown) => {
          const docData = doc as Record<string, unknown>;
          return {
            id: docData._id as string,
            name: docData.name as string,
            type: docData.type as string,
            university: docData.university as string,
            status: docData.status as string,
            uploadDate: new Date(docData.uploadDate as string)
              .toISOString()
              .split("T")[0],
            size: docData.size as string,
            format: docData.format as string,
            filePath: (docData.filePath as string).startsWith("/uploads/")
              ? `http://localhost:5001${docData.filePath}`
              : (docData.filePath as string),
            version: docData.version as number,
            isLatestVersion: docData.isLatestVersion as boolean,
            parentDocumentId: docData.parentDocumentId as string,
            metadata: docData.metadata as Record<string, unknown>,
          };
        });

        console.log("Processed API Documents:", apiDocuments);

        // Combine: uploaded documents first, then sample documents
        setDocuments([...apiDocuments, ...getSampleDocuments()]);
      } else {
        // If API fails or returns no data, show sample documents
        console.log("No API documents found, showing sample documents");
        setDocuments(getSampleDocuments());
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
      console.log("Falling back to sample documents due to API error");
      // If API fails, show sample documents
      setDocuments(getSampleDocuments());
    }
  }, []);

  // Load documents on component mount
  useEffect(() => {
    // Add a small delay to ensure backend is ready
    const timer = setTimeout(() => {
      fetchDocuments();
    }, 1000);

    return () => clearTimeout(timer);
  }, [fetchDocuments]);

  const documentTypes = [
    "CV/Resume",
    "Portfolio",
    "Transcript",
    "Personal Statement",
    "Recommendation Letter",
    "Research Paper",
    "Certificate",
    "Other",
  ];

  const examTypes = [
    // English Language Tests
    "IELTS",
    "TOEFL iBT",
    "TOEFL PBT",
    "PTE Academic",
    "Duolingo English Test",
    "Cambridge English (C1 Advanced)",
    "Cambridge English (C2 Proficiency)",

    // US Standardized Tests
    "SAT",
    "ACT",
    "SAT Subject Tests",
    "AP Exams",

    // Graduate Tests
    "GRE General",
    "GRE Subject Tests",
    "GMAT",
    "MCAT",
    "LSAT",
    "DAT",
    "OAT",
    "PCAT",

    // UK Tests
    "UCAT",
    "BMAT",
    "LNAT",
    "TSA",
    "STEP",

    // Canadian Tests
    "CAEL",
    "CanTEST",

    // Australian Tests
    "OET",
    "ISLPR",

    // European Tests
    "TestDaF",
    "DSH",
    "DELF",
    "DALF",
    "DELE",
    "SIELE",
    "CELI",
    "CILS",
    "PLIDA",

    // Asian Tests
    "JLPT",
    "HSK",
    "TOPIK",
    "JPT",

    // Other
    "Other",
  ];

  const handleTestScoreChange = (
    id: string,
    field: keyof TestScore,
    value: string | boolean
  ) => {
    setTestScores(prev =>
      prev.map(score => {
        if (score.id === id) {
          const updatedScore = { ...score, [field]: value };
          // Auto-update max score when exam type changes
          if (field === "examType" && typeof value === "string") {
            updatedScore.maxScore = getDefaultMaxScore(value);
          }
          return updatedScore;
        }
        return score;
      })
    );
  };

  const getDefaultMaxScore = (examType: string): string => {
    const maxScores: Record<string, string> = {
      SAT: "1600",
      ACT: "36",
      IELTS: "9.0",
      "TOEFL iBT": "120",
      "TOEFL PBT": "677",
      "PTE Academic": "90",
      "Duolingo English Test": "160",
      "GRE General": "340",
      GMAT: "800",
      MCAT: "528",
      LSAT: "180",
      UCAT: "3600",
      BMAT: "9.0",
      LNAT: "42",
      TSA: "100",
      STEP: "120",
      CAEL: "90",
      CanTEST: "5.0",
      OET: "500",
      ISLPR: "4",
      TestDaF: "5",
      DSH: "3",
      DELF: "100",
      DALF: "100",
      DELE: "100",
      SIELE: "1000",
      CELI: "100",
      CILS: "100",
      PLIDA: "100",
      JLPT: "5",
      HSK: "6",
      TOPIK: "6",
      JPT: "1000",
    };
    return maxScores[examType] || "";
  };

  const addTestScore = () => {
    const newScore: TestScore = {
      id: `temp-${Date.now()}`,
      examType: "IELTS",
      score: "",
      maxScore: getDefaultMaxScore("IELTS"),
      certified: false,
      testDate: "",
      validityDate: "",
    };
    setTestScores(prev => [...prev, newScore]);
  };

  const removeTestScore = (id: string) => {
    setTestScores(prev => prev.filter(score => score.id !== id));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    // Validate each file
    const validFiles: File[] = [];
    const allowedTypes = /pdf|doc|docx|jpg|jpeg|png|gif|zip/i;
    const maxSize = 10 * 1024 * 1024; // 10MB

    files.forEach(file => {
      const fileExtension = file.name.split(".").pop();

      if (!allowedTypes.test(fileExtension || "")) {
        alert(
          `Invalid file type: ${file.name}. Please select PDF, DOC, DOCX, JPG, PNG, GIF, or ZIP files.`
        );
        return;
      }

      if (file.size > maxSize) {
        alert(
          `File too large: ${file.name}. Please select files smaller than 10MB.`
        );
        return;
      }

      validFiles.push(file);
    });

    if (validFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...validFiles]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const saveTestScores = async () => {
    try {
      const userId = "user-123"; // In real app, get from auth context
      // Save each test score individually
      for (const score of testScores) {
        if (score.id.startsWith("temp-")) {
          // New score - create
          const newScore = {
            examType: score.examType,
            score: score.score,
            maxScore: score.maxScore,
            certified: score.certified,
            testDate: score.testDate || new Date().toISOString().split("T")[0],
            validityDate:
              score.validityDate ||
              new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000)
                .toISOString()
                .split("T")[0],
          };
          await testScoreApi.create(userId, newScore);
        } else {
          // Existing score - update
          const updatedScore = {
            examType: score.examType,
            score: score.score,
            maxScore: score.maxScore,
            certified: score.certified,
            testDate: score.testDate,
            validityDate: score.validityDate,
          };
          await testScoreApi.update(userId, score.id, updatedScore);
        }
      }

      // Update local state to remove temp IDs
      setTestScores(prev =>
        prev.map(score =>
          score.id.startsWith("temp-")
            ? {
                ...score,
                id:
                  Date.now().toString() +
                  Math.random().toString(36).substr(2, 9),
              }
            : score
        )
      );

      console.log("Test scores saved successfully");
      alert("Test scores saved successfully!");
    } catch (error) {
      console.error("Error saving test scores:", error);
      alert("Error saving test scores. Please try again.");
    }
  };

  const saveDocuments = async () => {
    try {
      const userId = "user-123"; // In real app, get from auth context
      const newDocuments: Document[] = [];

      // Upload each file to the server
      for (const file of uploadedFiles) {
        const documentData = {
          name: file.name,
          type: selectedDocumentType,
          university: "All",
          description: `Uploaded on ${new Date().toLocaleDateString()}`,
        };

        const response = (await documentApi.upload(
          userId,
          file,
          documentData
        )) as { success: boolean; data: Record<string, unknown> };

        if (response.success) {
          const docData = response.data;
          newDocuments.push({
            id: docData._id as string,
            name: docData.name as string,
            type: docData.type as string,
            university: docData.university as string,
            status: docData.status as string,
            uploadDate: new Date(docData.uploadDate as string)
              .toISOString()
              .split("T")[0],
            size: docData.size as string,
            format: docData.format as string,
            filePath: (docData.filePath as string).startsWith("/uploads/")
              ? `http://localhost:5001${docData.filePath}`
              : (docData.filePath as string),
            version: docData.version as number,
            isLatestVersion: docData.isLatestVersion as boolean,
          });
        }
      }

      // Refresh documents from API to ensure we have the latest data
      await fetchDocuments();

      setIsUploadModalOpen(false);
      setUploadedFiles([]);
      setSelectedDocumentType("");
      console.log("Documents saved successfully");
      alert("Documents uploaded successfully!");
    } catch (error) {
      console.error("Error saving documents:", error);
      alert("Error uploading documents. Please try again.");
    }
  };

  // Document action handlers
  const handleViewDocument = (doc: Document) => {
    setSelectedDocument(doc);
    setIsViewModalOpen(true);
  };

  const handleDownloadDocument = (doc: Document) => {
    // Download document
    if (doc.filePath) {
      const link = document.createElement("a");
      link.href = doc.filePath;
      link.download = doc.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("Document file not available for download");
    }
  };

  const handleEditDocument = (doc: Document) => {
    setSelectedDocument(doc);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async () => {
    if (selectedDocument) {
      try {
        await documentApi.update(selectedDocument.id, {
          name: selectedDocument.name,
          type: selectedDocument.type,
          status: selectedDocument.status,
          description: selectedDocument.metadata?.description,
        });

        setDocuments(prev =>
          prev.map(d =>
            d.id === selectedDocument.id ? { ...d, ...selectedDocument } : d
          )
        );
        setIsEditModalOpen(false);
        setSelectedDocument(null);
        alert(`Document "${selectedDocument.name}" updated successfully`);
      } catch (error) {
        console.error("Error updating document:", error);
        alert("Error updating document. Please try again.");
      }
    }
  };

  const handleViewVersions = async (doc: Document) => {
    try {
      // Check if this is a hardcoded document (simple string ID)
      if (doc.id.match(/^[0-9]+$/)) {
        // For hardcoded documents, create a mock version list
        const mockVersions = [doc];
        setDocumentVersions(mockVersions);
        setSelectedDocument(doc);
        setIsVersionModalOpen(true);
        return;
      }

      // For database documents, fetch from API
      const response = await documentApi.getVersions(doc.id);
      if (response.success) {
        setDocumentVersions(response.data as unknown as Document[]);
        setSelectedDocument(doc);
        setIsVersionModalOpen(true);
      }
    } catch (error) {
      console.error("Error fetching document versions:", error);
      alert("Error fetching document versions. Please try again.");
    }
  };

  const handleUploadNewVersion = async (file: File) => {
    if (!selectedDocument) return;

    try {
      // Check if this is a hardcoded document (simple string ID)
      if (selectedDocument.id && selectedDocument.id.match(/^[0-9]+$/)) {
        alert(
          "Cannot upload new versions for sample documents. Please upload a new document instead."
        );
        return;
      }

      const userId = "user-123"; // In real app, get from auth context
      const response = (await documentApi.uploadNewVersion(
        selectedDocument.id,
        userId,
        file
      )) as { success: boolean; data: Record<string, unknown> };

      if (response.success) {
        const newVersion = {
          id: response.data._id as string,
          name: response.data.name as string,
          type: response.data.type as string,
          university: response.data.university as string,
          status: response.data.status as string,
          uploadDate: new Date(response.data.uploadDate as string)
            .toISOString()
            .split("T")[0],
          size: response.data.size as string,
          format: response.data.format as string,
          filePath: (response.data.filePath as string).startsWith("/uploads/")
            ? `http://localhost:5001${response.data.filePath}`
            : (response.data.filePath as string),
          version: response.data.version as number,
          isLatestVersion: response.data.isLatestVersion as boolean,
        };

        // Update the documents list
        setDocuments(prev =>
          prev.map(d => (d.id === selectedDocument.id ? newVersion : d))
        );

        // Refresh versions list
        const versionsResponse = await documentApi.getVersions(
          selectedDocument.id
        );
        if (versionsResponse.success) {
          setDocumentVersions(versionsResponse.data as unknown as Document[]);
        }

        alert("New version uploaded successfully!");
      }
    } catch (error: unknown) {
      console.error("Error uploading new version:", error);

      // Provide more specific error messages
      if (
        error instanceof Error &&
        error.message?.includes("Invalid file type")
      ) {
        alert(
          "Invalid file type. Please select a PDF, DOC, DOCX, JPG, PNG, GIF, or ZIP file."
        );
      } else if (
        error instanceof Error &&
        error.message?.includes("File too large")
      ) {
        alert("File is too large. Please select a file smaller than 10MB.");
      } else {
        alert(
          `Error uploading new version: ${error instanceof Error ? error.message : "Please try again."}`
        );
      }
    }
  };

  const handleDeleteDocument = (doc: Document) => {
    if (window.confirm(`Are you sure you want to delete "${doc.name}"?`)) {
      // Frontend-only delete - remove from local state
      setDocuments(prev => prev.filter(d => d.id !== doc.id));
      alert("Document deleted successfully!");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Uploaded":
        return "default";
      case "Draft":
        return "secondary";
      case "Pending":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getFileIcon = (format: string) => {
    switch (format) {
      case "PDF":
        return <FileText className="h-4 w-4" />;
      case "DOCX":
        return <File className="h-4 w-4" />;
      case "ZIP":
        return <File className="h-4 w-4" />;
      default:
        return <File className="h-4 w-4" />;
    }
  };

  const totalPages = Math.ceil(documents.length / itemsPerPage);
  const paginatedDocuments = documents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Document Management
          </h1>
          <p className="text-muted-foreground">
            Manage your test scores and application documents
          </p>
        </div>

        <Tabs defaultValue="test-scores" className="space-y-6">
          <TabsList>
            <TabsTrigger value="test-scores">Test Scores</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          {/* Test Scores Tab */}
          <TabsContent value="test-scores" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Test Scores</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {testScores.map(score => (
                  <div
                    key={score.id}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 p-6 border border-gray-200 rounded-lg bg-white hover:shadow-sm transition-shadow items-center"
                  >
                    <div className="space-y-1">
                      <Label
                        htmlFor={`examType-${score.id}`}
                        className="text-sm font-medium text-gray-700"
                      >
                        Exam Type
                      </Label>
                      <Select
                        value={score.examType}
                        onValueChange={value =>
                          handleTestScoreChange(score.id, "examType", value)
                        }
                      >
                        <SelectTrigger className="h-10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {examTypes.map(type => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1">
                      <Label
                        htmlFor={`score-${score.id}`}
                        className="text-sm font-medium text-gray-700"
                      >
                        Your Score
                      </Label>
                      <Input
                        id={`score-${score.id}`}
                        value={score.score}
                        onChange={e =>
                          handleTestScoreChange(
                            score.id,
                            "score",
                            e.target.value
                          )
                        }
                        placeholder="Enter score"
                        className="h-10 text-base font-medium border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label
                        htmlFor={`maxScore-${score.id}`}
                        className="text-sm font-medium text-gray-700"
                      >
                        Max Score
                      </Label>
                      <Input
                        id={`maxScore-${score.id}`}
                        value={score.maxScore}
                        onChange={e =>
                          handleTestScoreChange(
                            score.id,
                            "maxScore",
                            e.target.value
                          )
                        }
                        placeholder="Enter max score"
                        className="h-10 text-base font-medium border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label className="text-sm font-medium text-gray-700">
                        Test Date
                      </Label>
                      <Input
                        type="date"
                        value={score.testDate}
                        onChange={e =>
                          handleTestScoreChange(
                            score.id,
                            "testDate",
                            e.target.value
                          )
                        }
                        className="h-10 text-sm border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex gap-2 mt-6">
                        <Button
                          variant={score.certified ? "default" : "outline"}
                          size="sm"
                          onClick={() =>
                            handleTestScoreChange(score.id, "certified", true)
                          }
                          className={
                            score.certified
                              ? "text-white hover:opacity-90 h-10"
                              : "border-gray-300 text-gray-700 hover:bg-gray-50 h-10"
                          }
                          style={
                            score.certified
                              ? { backgroundColor: "#00136A" }
                              : {}
                          }
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Certified
                        </Button>
                        <Button
                          variant={!score.certified ? "default" : "outline"}
                          size="sm"
                          onClick={() =>
                            handleTestScoreChange(score.id, "certified", false)
                          }
                          className={
                            !score.certified
                              ? "text-white hover:opacity-90 h-10"
                              : "border-gray-300 text-gray-700 hover:bg-gray-50 h-10"
                          }
                          style={
                            !score.certified
                              ? { backgroundColor: "#00136A" }
                              : {}
                          }
                        >
                          <X className="h-4 w-4 mr-1" />
                          Not Certified
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTestScore(score.id)}
                        className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 h-10 w-10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                <div className="flex gap-3">
                  <Button
                    onClick={addTestScore}
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Test Score
                  </Button>
                  <Button
                    onClick={saveTestScores}
                    className="text-white hover:opacity-90"
                    style={{ backgroundColor: "#00136A" }}
                  >
                    Save Test Scores
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search documents..." className="pl-10" />
              </div>
              <Dialog
                open={isUploadModalOpen}
                onOpenChange={setIsUploadModalOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    className="text-white hover:opacity-90"
                    style={{ backgroundColor: "#00136A" }}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Document
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
                  <DialogHeader className="flex-shrink-0">
                    <DialogTitle className="text-2xl font-semibold text-gray-900">
                      Upload Document
                    </DialogTitle>
                    <DialogDescription className="text-gray-600">
                      Select document type and upload your files
                    </DialogDescription>
                  </DialogHeader>

                  <div className="flex-1 overflow-y-auto space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label
                          htmlFor="documentType"
                          className="text-sm font-medium text-gray-700"
                        >
                          Document Type
                        </Label>
                        <Select
                          value={selectedDocumentType}
                          onValueChange={setSelectedDocumentType}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select document type" />
                          </SelectTrigger>
                          <SelectContent>
                            {documentTypes.map(type => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label
                          htmlFor="fileUpload"
                          className="text-sm font-medium text-gray-700"
                        >
                          Select Files
                        </Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mt-1 hover:border-gray-400 transition-colors">
                          <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                          <p className="text-lg text-gray-600 mb-2">
                            Drag and drop files here, or click to select
                          </p>
                          <p className="text-sm text-gray-500 mb-4">
                            PDF, DOC, DOCX, JPG, PNG, GIF, ZIP (Max 10MB)
                          </p>
                          <Input
                            id="fileUpload"
                            type="file"
                            multiple
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.zip"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                          <Button
                            variant="outline"
                            size="lg"
                            onClick={() =>
                              document.getElementById("fileUpload")?.click()
                            }
                            className="bg-white hover:bg-gray-50 border-gray-300 text-gray-700"
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Choose Files
                          </Button>
                        </div>
                      </div>

                      {/* Document Requirements */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Check className="h-4 w-4 text-blue-600" />
                          <p className="text-sm font-medium text-blue-800">
                            Document Requirements
                          </p>
                        </div>
                        <div className="text-sm text-blue-700 space-y-1">
                          <p>• Supported formats: PDF, DOC, DOCX, JPG, PNG</p>
                          <p>• Maximum file size: 10MB per file</p>
                          <p>• Multiple files can be uploaded</p>
                        </div>
                      </div>

                      {/* Uploaded Files List */}
                      {uploadedFiles.length > 0 && (
                        <div className="space-y-3">
                          <Label className="text-sm font-medium text-gray-700">
                            Selected Files ({uploadedFiles.length})
                          </Label>
                          <div className="space-y-2 max-h-48 overflow-y-auto bg-gray-50 rounded-lg border border-gray-200 p-4">
                            {uploadedFiles.map((file, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                              >
                                <div className="flex items-center gap-3">
                                  <File className="h-4 w-4 text-gray-500" />
                                  <div>
                                    <span className="text-sm font-medium text-gray-900">
                                      {file.name}
                                    </span>
                                    <p className="text-xs text-gray-500">
                                      {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFile(index)}
                                  className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 h-8 w-8 p-0"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex-shrink-0 flex justify-between items-center pt-6 border-t border-gray-200">
                    <div className="text-sm text-gray-600">
                      {uploadedFiles.length} file(s) selected
                    </div>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={() => setIsUploadModalOpen(false)}
                        className="border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={saveDocuments}
                        disabled={
                          !selectedDocumentType || uploadedFiles.length === 0
                        }
                        className="text-white hover:opacity-90"
                        style={{ backgroundColor: "#00136A" }}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Documents
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Documents List */}
            <div className="space-y-4">
              {paginatedDocuments.map(doc => (
                <Card
                  key={doc.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                          {getFileIcon(doc.format)}
                        </div>
                        <div>
                          <h4 className="font-semibold">{doc.name}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{doc.type}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {doc.uploadDate}
                            </span>
                            <span>•</span>
                            <span>{doc.size}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusColor(doc.status)}>
                          {doc.status}
                        </Badge>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewDocument(doc)}
                            title="View document"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownloadDocument(doc)}
                            title="Download document"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewVersions(doc)}
                            title="View versions"
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditDocument(doc)}
                            title="Edit document"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDeleteDocument(doc)}
                            title="Delete document"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage(prev => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* View Document Modal - Simple Preview */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="max-w-6xl max-h-[95vh] flex flex-col">
            <DialogHeader className="flex-shrink-0">
              <DialogTitle className="text-2xl font-semibold text-gray-900">
                View Document
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                {selectedDocument?.name}
              </DialogDescription>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto space-y-6">
              {selectedDocument && (
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                      {getFileIcon(selectedDocument.format)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">
                        {selectedDocument.name}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{selectedDocument.type}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {selectedDocument.uploadDate}
                        </span>
                        <span>•</span>
                        <span>{selectedDocument.size}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        Status
                      </Label>
                      <div className="mt-1">
                        <Badge
                          variant={getStatusColor(selectedDocument.status)}
                        >
                          {selectedDocument.status}
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        File Format
                      </Label>
                      <p className="mt-1 text-sm text-gray-600">
                        {selectedDocument.format}
                      </p>
                    </div>

                    {selectedDocument.filePath && (
                      <div className="bg-white p-4 rounded border border-gray-200">
                        <p className="text-sm text-gray-600 mb-2">
                          Document Preview:
                        </p>
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                          {selectedDocument.format === "PDF" ? (
                            <object
                              data={selectedDocument.filePath}
                              type="application/pdf"
                              className="w-full h-[600px]"
                            >
                              <iframe
                                src={selectedDocument.filePath}
                                className="w-full h-[600px]"
                                title={`Preview of ${selectedDocument.name}`}
                              />
                            </object>
                          ) : selectedDocument.format === "DOCX" ||
                            selectedDocument.format === "DOC" ? (
                            <div className="text-center py-8">
                              <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                              <p className="text-gray-600 mb-2">
                                Word document preview not available
                              </p>
                              <p className="text-sm text-gray-500">
                                Click &quot;Open Document&quot; to view the full
                                file
                              </p>
                            </div>
                          ) : selectedDocument.format === "ZIP" ? (
                            <div className="text-center py-8">
                              <File className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                              <p className="text-gray-600 mb-2">
                                Archive file preview not available
                              </p>
                              <p className="text-sm text-gray-500">
                                Click &quot;Open Document&quot; to view the
                                contents
                              </p>
                            </div>
                          ) : ["JPG", "JPEG", "PNG", "GIF"].includes(
                              selectedDocument.format
                            ) ? (
                            <div className="text-center">
                              <img
                                src={selectedDocument.filePath}
                                alt={`Preview of ${selectedDocument.name}`}
                                className="max-w-full max-h-[600px] mx-auto rounded"
                              />
                            </div>
                          ) : (
                            <div className="text-center py-8">
                              <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                              <p className="text-gray-600 mb-2">
                                Preview not available for{" "}
                                {selectedDocument.format} files
                              </p>
                              <p className="text-sm text-gray-500">
                                Click &quot;Open Document&quot; to view the full
                                file
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex-shrink-0 flex justify-end gap-3 pt-6 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={() => setIsViewModalOpen(false)}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Close
              </Button>
              {selectedDocument?.filePath && (
                <Button
                  onClick={() => {
                    window.open(selectedDocument.filePath, "_blank");
                    setIsViewModalOpen(false);
                  }}
                  className="text-white hover:opacity-90"
                  style={{ backgroundColor: "#00136A" }}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Open Document
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Document Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-gray-900">
                Edit Document
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                {selectedDocument?.name}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {selectedDocument && (
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Document Name
                    </Label>
                    <Input
                      value={selectedDocument.name}
                      onChange={e =>
                        setSelectedDocument({
                          ...selectedDocument,
                          name: e.target.value,
                        })
                      }
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Document Type
                    </Label>
                    <Select
                      value={selectedDocument.type}
                      onValueChange={value =>
                        setSelectedDocument({
                          ...selectedDocument,
                          type: value,
                        })
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {documentTypes.map(type => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Status
                    </Label>
                    <Select
                      value={selectedDocument.status}
                      onValueChange={value =>
                        setSelectedDocument({
                          ...selectedDocument,
                          status: value,
                        })
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Uploaded">Uploaded</SelectItem>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <Edit className="h-4 w-4 text-yellow-600" />
                      <p className="text-sm text-yellow-800">
                        <strong>Note:</strong> This will mark the document as
                        &quot;Draft&quot; for editing. You can update the
                        document details and status above.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditModalOpen(false);
                  setSelectedDocument(null);
                }}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveEdit}
                className="text-white hover:opacity-90"
                style={{ backgroundColor: "#00136A" }}
              >
                <Edit className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Version Management Modal */}
        <Dialog open={isVersionModalOpen} onOpenChange={setIsVersionModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
            <DialogHeader className="flex-shrink-0">
              <DialogTitle className="text-2xl font-semibold text-gray-900">
                Document Versions
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                {selectedDocument?.name} - Version History
              </DialogDescription>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto space-y-4">
              {/* Check if this is a hardcoded document */}
              {selectedDocument?.id && selectedDocument.id.match(/^[0-9]+$/) ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📄</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Sample Document
                  </h3>
                  <p className="text-gray-600 mb-4">
                    This is a sample document for demonstration purposes.
                  </p>
                  <p className="text-sm text-gray-500">
                    To manage versions, please upload a new document through the
                    upload button.
                  </p>
                </div>
              ) : (
                <>
                  {documentVersions.map(version => (
                    <div
                      key={version.id}
                      className={`p-4 border rounded-lg ${
                        version.isLatestVersion
                          ? "border-blue-200 bg-blue-50"
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                            {getFileIcon(version.format)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold truncate">
                                {version.name}
                              </h4>
                              {version.isLatestVersion && (
                                <Badge
                                  variant="default"
                                  className="text-xs flex-shrink-0"
                                >
                                  Latest
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                              <span>Version {version.version}</span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {version.uploadDate}
                              </span>
                              <span>•</span>
                              <span>{version.size}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Badge
                            variant={getStatusColor(version.status)}
                            className="text-xs"
                          >
                            {version.status}
                          </Badge>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedDocument(version);
                                setIsVersionModalOpen(false);
                                setIsViewModalOpen(true);
                              }}
                              title="View this version"
                              className="h-8 w-8 p-0"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDownloadDocument(version)}
                              title="Download this version"
                              className="h-8 w-8 p-0"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Upload New Version Section */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-3 text-gray-400" />
                    <p className="text-lg text-gray-600 mb-2">
                      Upload New Version
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      Upload a new version of this document
                    </p>
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.zip"
                      onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) {
                          // Validate file type on frontend
                          const allowedTypes =
                            /pdf|doc|docx|jpg|jpeg|png|gif|zip/i;
                          const fileExtension = file.name.split(".").pop();

                          if (!allowedTypes.test(fileExtension || "")) {
                            alert(
                              "Please select a valid file type (PDF, DOC, DOCX, JPG, PNG, GIF, ZIP)"
                            );
                            return;
                          }

                          handleUploadNewVersion(file);
                        }
                      }}
                      className="hidden"
                      id="versionUpload"
                    />
                    <Button
                      variant="outline"
                      onClick={() =>
                        document.getElementById("versionUpload")?.click()
                      }
                      className="bg-white hover:bg-gray-50 border-gray-300 text-gray-700"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Choose New Version
                    </Button>
                  </div>
                </>
              )}
            </div>

            <div className="flex-shrink-0 flex justify-end gap-3 pt-6 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={() => setIsVersionModalOpen(false)}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
