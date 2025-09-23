import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
// Dialog components removed as they're not being used
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Calendar,
  Award,
  CheckCircle,
  AlertCircle,
  BookOpen,
} from "lucide-react";
import { testScoresApi } from "@/utils/api";

interface TestScore {
  id?: string;
  examType: string;
  score: string;
  maxScore: string;
  certified: boolean;
  testDate: string;
  validityDate: string;
  userId?: string;
}

interface TestScoreFormData {
  examType: string;
  score: string;
  maxScore: string;
  certified: boolean;
  testDate: string;
  validityDate: string;
}

const EXAM_TYPES = [
  { value: "SAT", label: "SAT", maxScore: "1600" },
  { value: "ACT", label: "ACT", maxScore: "36" },
  { value: "TOEFL", label: "TOEFL", maxScore: "120" },
  { value: "IELTS", label: "IELTS", maxScore: "9.0" },
  { value: "GRE", label: "GRE", maxScore: "340" },
  { value: "GMAT", label: "GMAT", maxScore: "800" },
  { value: "LSAT", label: "LSAT", maxScore: "180" },
  { value: "MCAT", label: "MCAT", maxScore: "528" },
  { value: "AP", label: "AP Exams", maxScore: "5" },
  { value: "IB", label: "IB Exams", maxScore: "45" },
  { value: "A-Levels", label: "A-Levels", maxScore: "A*" },
  { value: "Duolingo", label: "Duolingo English Test", maxScore: "160" },
  { value: "PTE", label: "PTE Academic", maxScore: "90" },
  { value: "Cambridge", label: "Cambridge English", maxScore: "C2" },
  { value: "Other", label: "Other", maxScore: "Custom" },
];

export const TestScores = () => {
  const [testScores, setTestScores] = useState<TestScore[]>([]);
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingScore, setEditingScore] = useState<TestScore | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState<TestScoreFormData>({
    examType: "",
    score: "",
    maxScore: "",
    certified: false,
    testDate: "",
    validityDate: "",
  });

  // Fetch test scores on component mount
  useEffect(() => {
    fetchTestScores();
  }, []);

  // Also fetch when component becomes visible (in case of tab switching)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && testScores.length === 0 && !loading) {
        fetchTestScores();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [testScores.length, loading]);

  const fetchTestScores = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching test scores...");

      const response = await testScoresApi.getAll();

      console.log("Test scores API response:", response);

      if (response && response.success) {
        setTestScores((response.data || []) as unknown as TestScore[]);
        console.log("Test scores loaded:", response.data);
      } else {
        console.error("Failed to fetch test scores:", response);
        setError("Failed to fetch test scores");
      }
    } catch (error) {
      console.error("Error fetching test scores:", error);
      setError(
        "Failed to fetch test scores. Please check if the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    field: keyof TestScoreFormData,
    value: string | boolean
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // Auto-set max score when exam type changes
    if (field === "examType") {
      const examType = EXAM_TYPES.find(exam => exam.value === value);
      if (examType && examType.value !== "Other") {
        setFormData(prev => ({
          ...prev,
          examType: value as string,
          maxScore: examType.maxScore,
        }));
      }
    }
  };

  const resetForm = () => {
    setFormData({
      examType: "",
      score: "",
      maxScore: "",
      certified: false,
      testDate: "",
      validityDate: "",
    });
    setError(null);
    setSuccess(null);
  };

  const handleAddScore = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const handleEditScore = (score: TestScore) => {
    setFormData({
      examType: score.examType,
      score: score.score,
      maxScore: score.maxScore,
      certified: score.certified,
      testDate: score.testDate,
      validityDate: score.validityDate,
    });
    setEditingScore(score);
    setIsEditModalOpen(true);
  };

  const handleSaveScore = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      // Validation
      if (!formData.examType || !formData.score || !formData.maxScore) {
        setError("Please fill in all required fields");
        return;
      }

      const scoreData = {
        ...formData,
        testDate: formData.testDate || new Date().toISOString().split("T")[0],
        validityDate:
          formData.validityDate ||
          new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
      };

      if (editingScore) {
        // Update existing score
        const response = await testScoresApi.update(
          editingScore.id!,
          scoreData
        );

        if (response.success) {
          setTestScores(prev =>
            prev.map(score =>
              score.id === editingScore.id ? { ...score, ...scoreData } : score
            )
          );
          setSuccess("Test score updated successfully!");
          setIsEditModalOpen(false);
          setEditingScore(null);
          // Clear success message after 3 seconds
          setTimeout(() => setSuccess(null), 3000);
        } else {
          setError("Failed to update test score");
        }
      } else {
        // Create new score
        const response = await testScoresApi.create(scoreData);

        if (response.success) {
          setTestScores(prev => [
            ...prev,
            response.data as unknown as TestScore,
          ]);
          setSuccess("Test score saved successfully!");
          setIsAddModalOpen(false);
          // Clear success message after 3 seconds
          setTimeout(() => setSuccess(null), 3000);
        } else {
          setError("Failed to save test score");
        }
      }

      resetForm();
    } catch (error) {
      console.error("Error saving test score:", error);
      setError("Failed to save test score. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteScore = async (scoreId: string) => {
    if (!confirm("Are you sure you want to delete this test score?")) {
      return;
    }

    try {
      setLoading(true);
      const response = await testScoresApi.delete(scoreId);

      if (response.success) {
        setTestScores(prev => prev.filter(score => score.id !== scoreId));
        setSuccess("Test score deleted successfully!");
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError("Failed to delete test score");
      }
    } catch (error) {
      console.error("Error deleting test score:", error);
      setError("Failed to delete test score. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getScorePercentage = (score: string, maxScore: string) => {
    const scoreNum = parseFloat(score);
    const maxScoreNum = parseFloat(maxScore);
    if (isNaN(scoreNum) || isNaN(maxScoreNum) || maxScoreNum === 0) return 0;
    return Math.round((scoreNum / maxScoreNum) * 100);
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 80) return "text-blue-600";
    if (percentage >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getValidityStatus = (validityDate: string) => {
    const today = new Date();
    const validity = new Date(validityDate);
    const daysUntilExpiry = Math.ceil(
      (validity.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysUntilExpiry < 0)
      return { status: "expired", color: "text-red-600", icon: AlertCircle };
    if (daysUntilExpiry <= 30)
      return {
        status: "expiring",
        color: "text-yellow-600",
        icon: AlertCircle,
      };
    return { status: "valid", color: "text-green-600", icon: CheckCircle };
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Test Scores
          </h1>
          <p className="text-muted-foreground">
            Manage your standardized test scores and track their validity
          </p>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-green-800">{success}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSuccess(null)}
              className="ml-auto"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <span className="text-red-800">{error}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setError(null)}
              className="ml-auto"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        <Tabs defaultValue="scores" className="space-y-6">
          <TabsList>
            <TabsTrigger value="scores">My Scores</TabsTrigger>
            <TabsTrigger value="add">Add Score</TabsTrigger>
          </TabsList>

          <TabsContent value="scores" className="space-y-6">
            {/* Add Score Button */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Your Test Scores</h2>
                {testScores.length > 0 && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {testScores.length} score
                    {testScores.length !== 1 ? "s" : ""} saved
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={fetchTestScores}
                  disabled={loading}
                  className="flex items-center gap-2"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                  ) : (
                    <BookOpen className="h-4 w-4" />
                  )}
                  Refresh
                </Button>
                <Button
                  onClick={handleAddScore}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Test Score
                </Button>
              </div>
            </div>

            {/* Test Scores List */}
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-2 text-muted-foreground">
                  Loading test scores...
                </p>
              </div>
            ) : error && testScores.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <AlertCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
                  <h3 className="text-lg font-semibold mb-2 text-red-600">
                    Error Loading Test Scores
                  </h3>
                  <p className="text-muted-foreground mb-4">{error}</p>
                  <Button
                    onClick={fetchTestScores}
                    variant="outline"
                    className="mr-2"
                  >
                    Try Again
                  </Button>
                  <Button
                    onClick={handleAddScore}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Test Score
                  </Button>
                </CardContent>
              </Card>
            ) : testScores.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    No Test Scores Yet
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Start by adding your first test score to track your academic
                    progress.
                  </p>
                  <Button
                    onClick={handleAddScore}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Score
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {testScores.map(score => {
                  const percentage = getScorePercentage(
                    score.score,
                    score.maxScore
                  );
                  const validityStatus = getValidityStatus(score.validityDate);
                  const ValidityIcon = validityStatus.icon;

                  return (
                    <Card
                      key={score.id}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                              <Award className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold">
                                {score.examType}
                              </h3>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>
                                  Score: {score.score}/{score.maxScore}
                                </span>
                                <span>•</span>
                                <span>{percentage}%</span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {new Date(
                                    score.testDate
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div
                                className={`text-2xl font-bold ${getScoreColor(percentage)}`}
                              >
                                {score.score}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                out of {score.maxScore}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {score.certified && (
                                <Badge variant="default" className="text-xs">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Certified
                                </Badge>
                              )}
                              <Badge
                                variant="outline"
                                className={`text-xs ${validityStatus.color}`}
                              >
                                <ValidityIcon className="h-3 w-3 mr-1" />
                                {validityStatus.status}
                              </Badge>
                            </div>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditScore(score)}
                                className="h-8 w-8 p-0"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteScore(score.id!)}
                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="add" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Test Score</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="examType">Exam Type *</Label>
                    <Select
                      value={formData.examType}
                      onValueChange={value =>
                        handleInputChange("examType", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select exam type" />
                      </SelectTrigger>
                      <SelectContent>
                        {EXAM_TYPES.map(exam => (
                          <SelectItem key={exam.value} value={exam.value}>
                            {exam.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxScore">Maximum Score *</Label>
                    <Input
                      id="maxScore"
                      value={formData.maxScore}
                      onChange={e =>
                        handleInputChange("maxScore", e.target.value)
                      }
                      placeholder="e.g., 1600, 36, 9.0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="score">Your Score *</Label>
                    <Input
                      id="score"
                      value={formData.score}
                      onChange={e => handleInputChange("score", e.target.value)}
                      placeholder="e.g., 1450, 32, 7.5"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="testDate">Test Date</Label>
                    <Input
                      id="testDate"
                      type="date"
                      value={formData.testDate}
                      onChange={e =>
                        handleInputChange("testDate", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="validityDate">Validity Date</Label>
                    <Input
                      id="validityDate"
                      type="date"
                      value={formData.validityDate}
                      onChange={e =>
                        handleInputChange("validityDate", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.certified}
                        onChange={e =>
                          handleInputChange("certified", e.target.checked)
                        }
                        className="rounded"
                      />
                      Officially Certified Score
                    </Label>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={resetForm}
                    disabled={loading}
                  >
                    Reset
                  </Button>
                  <Button
                    onClick={handleSaveScore}
                    disabled={loading}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    Save Test Score
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
