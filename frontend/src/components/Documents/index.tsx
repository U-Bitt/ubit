import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Award,
  Check,
} from "lucide-react";

export const Documents = () => {
  const documents = [
    {
      id: 1,
      name: "High School Transcript",
      type: "Transcript",
      university: "MIT",
      status: "Uploaded",
      uploadDate: "2024-11-15",
      size: "2.3 MB",
      format: "PDF",
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
    },
  ];

  const [testScores, setTestScores] = useState([
    {
      id: 1,
      test: "SAT",
      score: "1450",
      date: "Dec 2023",
      status: "Completed",
      verified: true,
      maxScore: "1600",
    },
    {
      id: 2,
      test: "TOEFL",
      score: "108",
      date: "Nov 2023",
      status: "Completed",
      verified: true,
      maxScore: "120",
    },
    {
      id: 3,
      test: "AP Computer Science",
      score: "5",
      date: "May 2023",
      status: "Completed",
      verified: true,
      maxScore: "5",
    },
    {
      id: 4,
      test: "GRE",
      score: "",
      date: "Jan 2024",
      status: "Pending",
      verified: false,
      maxScore: "340",
    },
  ]);

  const documentTypes = [
    { name: "All Documents", count: documents.length + testScores.length },
    {
      name: "Transcripts",
      count: documents.filter(d => d.type === "Transcript").length,
    },
    {
      name: "Test Scores",
      count: testScores.length,
    },
    { name: "Essays", count: documents.filter(d => d.type === "Essay").length },
    {
      name: "Recommendations",
      count: documents.filter(d => d.type === "Recommendation").length,
    },
    {
      name: "Portfolios",
      count: documents.filter(d => d.type === "Portfolio").length,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Uploaded":
        return "default";
      case "Draft":
        return "secondary";
      case "Pending":
        return "destructive";
      case "Completed":
        return "default";
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

  const handleScoreUpdate = (id: number, newScore: string) => {
    setTestScores(prev =>
      prev.map(score =>
        score.id === id ? { ...score, score: newScore, verified: false } : score
      )
    );
  };

  const handleVerificationToggle = (id: number) => {
    setTestScores(prev =>
      prev.map(score =>
        score.id === id ? { ...score, verified: !score.verified } : score
      )
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Document Management
          </h1>
          <p className="text-muted-foreground">
            Organize and track all your application documents
          </p>
        </div>

        {/* Search and Actions */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search documents..." className="pl-10" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            {documentTypes.map(type => (
              <TabsTrigger
                key={type.name}
                value={type.name.toLowerCase().replace(/\s+/g, "-")}
              >
                {type.name} ({type.count})
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid gap-4">
              {/* Documents */}
              {documents.map(doc => (
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
                            {doc.uploadDate && (
                              <>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {doc.uploadDate}
                                </span>
                              </>
                            )}
                            {doc.size && (
                              <>
                                <span>•</span>
                                <span>{doc.size}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusColor(doc.status)}>
                          {doc.status}
                        </Badge>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Test Scores */}
              {testScores.map(score => (
                <Card
                  key={`test-${score.id}`}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                          <Award className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{score.test}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                            <span>Test Score</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {score.date}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              placeholder="Enter score"
                              value={score.score}
                              onChange={e =>
                                handleScoreUpdate(score.id, e.target.value)
                              }
                              className="w-24 h-8 text-sm"
                              min="0"
                              max={score.maxScore}
                            />
                            <span className="text-sm text-muted-foreground">
                              / {score.maxScore}
                            </span>
                            <div className="flex items-center gap-1 ml-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleVerificationToggle(score.id)
                                }
                                className={`h-6 w-6 p-0 ${
                                  score.verified
                                    ? "bg-green-100 text-green-600 hover:bg-green-200"
                                    : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                                }`}
                              >
                                {score.verified && (
                                  <Check className="h-3 w-3" />
                                )}
                              </Button>
                              <label
                                className="text-xs text-muted-foreground cursor-pointer"
                                onClick={() =>
                                  handleVerificationToggle(score.id)
                                }
                              >
                                Verified
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusColor(score.status)}>
                          {score.status}
                        </Badge>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive"
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
          </TabsContent>

          {/* Test Scores Tab */}
          <TabsContent value="test-scores" className="space-y-6">
            <div className="grid gap-4">
              {testScores.map(score => (
                <Card
                  key={`test-${score.id}`}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                          <Award className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{score.test}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                            <span>Test Score</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {score.date}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              placeholder="Enter score"
                              value={score.score}
                              onChange={e =>
                                handleScoreUpdate(score.id, e.target.value)
                              }
                              className="w-24 h-8 text-sm"
                              min="0"
                              max={score.maxScore}
                            />
                            <span className="text-sm text-muted-foreground">
                              / {score.maxScore}
                            </span>
                            <div className="flex items-center gap-1 ml-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleVerificationToggle(score.id)
                                }
                                className={`h-6 w-6 p-0 ${
                                  score.verified
                                    ? "bg-green-100 text-green-600 hover:bg-green-200"
                                    : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                                }`}
                              >
                                {score.verified && (
                                  <Check className="h-3 w-3" />
                                )}
                              </Button>
                              <label
                                className="text-xs text-muted-foreground cursor-pointer"
                                onClick={() =>
                                  handleVerificationToggle(score.id)
                                }
                              >
                                Verified
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusColor(score.status)}>
                          {score.status}
                        </Badge>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive"
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
          </TabsContent>

          {documentTypes
            .slice(1)
            .filter(type => type.name !== "Test Scores")
            .map(type => (
              <TabsContent
                key={type.name}
                value={type.name.toLowerCase().replace(/\s+/g, "-")}
                className="space-y-6"
              >
                <div className="grid gap-4">
                  {documents
                    .filter(doc => doc.type === type.name.slice(0, -1))
                    .map(doc => (
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
                                  <span>{doc.university}</span>
                                  {doc.uploadDate && (
                                    <>
                                      <span>•</span>
                                      <span className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        {doc.uploadDate}
                                      </span>
                                    </>
                                  )}
                                  {doc.size && (
                                    <>
                                      <span>•</span>
                                      <span>{doc.size}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant={getStatusColor(doc.status)}>
                                {doc.status}
                              </Badge>
                              <div className="flex gap-1">
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Download className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-destructive"
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
              </TabsContent>
            ))}
        </Tabs>

        {/* Upload Area */}
        <Card className="mt-8 border-dashed border-2">
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Upload New Document</h3>
            <p className="text-muted-foreground mb-4">
              Drag and drop files here, or click to browse
            </p>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Choose Files
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
