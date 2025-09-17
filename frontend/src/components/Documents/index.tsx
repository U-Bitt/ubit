import { useState, useEffect } from "react";
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
  Filter,
  Calendar,
  FileText,
  File,
  X,
  Check,
  AlertCircle,
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

  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "High School Transcript",
      type: "Transcript",
      university: "MIT",
      status: "Uploaded",
      uploadDate: "2024-11-15",
      size: "2.3 MB",
      format: "PDF",
      filePath: "/uploads/high-school-transcript.pdf",
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
      filePath: "/uploads/personal-statement.docx",
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
      filePath: "/uploads/portfolio-cs-projects.zip",
    },
  ]);

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedDocumentType, setSelectedDocumentType] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const saveTestScores = async () => {
    try {
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
          await testScoreApi.create(newScore);
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
          await testScoreApi.update(score.id, updatedScore);
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
      // Create document entries for each uploaded file
      for (const file of uploadedFiles) {
        const documentData = {
          name: file.name,
          type: selectedDocumentType,
          university: "All",
          status: "Uploaded",
          format: file.name.split(".").pop()?.toUpperCase() || "PDF",
          filePath: `/uploads/${file.name}`,
          size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
          uploadDate: new Date().toISOString().split("T")[0],
        };
        await documentApi.create(documentData);
      }

      // Update local documents state
      const newDocuments = uploadedFiles.map((file, index) => ({
        id: `new-${Date.now()}-${index}`,
        name: file.name,
        type: selectedDocumentType,
        university: "All",
        status: "Uploaded",
        uploadDate: new Date().toISOString().split("T")[0],
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        format: file.name.split(".").pop()?.toUpperCase() || "PDF",
      }));

      setDocuments(prev => [...prev, ...newDocuments]);

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
    // Open document in new tab or modal
    if (doc.filePath) {
      window.open(doc.filePath, "_blank");
    } else {
      alert("Document file not available for viewing");
    }
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
    // Frontend-only edit - update document status to "Draft"
    setDocuments(prev =>
      prev.map(d => (d.id === doc.id ? { ...d, status: "Draft" } : d))
    );
    alert(`Document "${doc.name}" marked as Draft for editing`);
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
                {testScores.map((score, index) => (
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
                <DialogContent className="max-w-[98vw] max-h-[95vh] flex flex-col overflow-hidden">
                  <DialogHeader className="pb-4 flex-shrink-0">
                    <DialogTitle className="text-2xl font-semibold text-gray-900">
                      Upload Document
                    </DialogTitle>
                    <DialogDescription className="text-gray-600">
                      Select document type and upload your files
                    </DialogDescription>
                  </DialogHeader>

                  <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 py-6 overflow-hidden">
                    {/* Left Side - Document Type Selection */}
                    <div className="space-y-4 overflow-hidden">
                      <div className="bg-white border border-gray-200 p-8 rounded-lg h-full overflow-y-auto">
                        <h3 className="text-lg font-medium mb-6 text-gray-900">
                          Document Type
                        </h3>
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
                              <SelectTrigger className="mt-2">
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

                          <div className="space-y-3">
                            <Label className="text-sm font-medium text-gray-700">
                              Document Requirements
                            </Label>
                            <div className="text-sm text-gray-600 space-y-2 bg-gray-50 p-4 rounded border border-gray-200">
                              <p className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-gray-500" />
                                Supported formats: PDF, DOC, DOCX, JPG, PNG
                              </p>
                              <p className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-gray-500" />
                                Maximum file size: 10MB per file
                              </p>
                              <p className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-gray-500" />
                                Multiple files can be uploaded
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Side - File Upload */}
                    <div className="space-y-4 overflow-hidden">
                      <div className="bg-white border border-gray-200 p-8 rounded-lg h-full overflow-y-auto">
                        <h3 className="text-lg font-medium mb-6 text-gray-900">
                          Upload Files
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <Label
                              htmlFor="fileUpload"
                              className="text-sm font-medium text-gray-700"
                            >
                              Select Files
                            </Label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center mt-2 hover:border-gray-400 transition-colors">
                              <Upload className="h-16 w-16 mx-auto mb-6 text-gray-400" />
                              <p className="text-lg text-gray-600 mb-3">
                                Drag and drop files here, or click to select
                              </p>
                              <p className="text-sm text-gray-500">
                                PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                              </p>
                              <Input
                                id="fileUpload"
                                type="file"
                                multiple
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

                          {/* Uploaded Files List */}
                          {uploadedFiles.length > 0 && (
                            <div className="space-y-3">
                              <Label className="text-sm font-medium text-gray-700">
                                Selected Files ({uploadedFiles.length})
                              </Label>
                              <div className="space-y-2 max-h-64 overflow-y-auto bg-gray-50 rounded border border-gray-200 p-6">
                                {uploadedFiles.map((file, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center justify-between p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                                  >
                                    <div className="flex items-center gap-3">
                                      <File className="h-5 w-5 text-gray-500" />
                                      <div>
                                        <span className="text-sm font-medium truncate block text-gray-900">
                                          {file.name}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                          {(file.size / 1024 / 1024).toFixed(2)}{" "}
                                          MB
                                        </span>
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
                    </div>
                  </div>

                  {/* Actions at bottom */}
                  <div className="flex justify-between items-center pt-6 border-t border-gray-200 bg-gray-50 -mx-8 -mb-8 px-8 py-6 rounded-b-lg flex-shrink-0">
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
                            <span>{doc.university}</span>
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
      </div>
    </div>
  );
};
