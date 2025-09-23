import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Trash2,
  Check,
  X,
  AlertCircle,
} from "lucide-react";
import { testScoreApi } from "@/utils/api";
import { useUser } from "@/contexts/UserContext";

interface TestScore extends Record<string, unknown> {
  id: string;
  examType: string;
  score: string;
  maxScore: string;
  certified: boolean;
  testDate: string;
  validityDate: string;
}

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

export const TestScores = () => {
  const { user } = useUser();
  const [testScores, setTestScores] = useState<TestScore[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch test scores on component mount and when user changes
  useEffect(() => {
    if (user?.id) {
      fetchTestScores();
    }
  }, [user?.id]);

  const fetchTestScores = async () => {
    if (!user?.id) {
      setError("User not found. Please log in.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      console.log("Fetching test scores for user:", user.id);

      const response = await testScoreApi.getAll(user.id);

      console.log("Test scores API response:", response);

      if (Array.isArray(response)) {
        // Transform the data from the old format to the new format
        const transformedScores = response.map((score: any) => ({
          id: score.id || score._id,
          examType: score.testName || score.examType || "Unknown",
          score: score.score || "",
          maxScore: score.maxScore || "",
          certified: score.certified || false,
          testDate: score.date ? new Date(score.date).toISOString().split('T')[0] : (score.testDate || ""),
          validityDate: score.validityDate || new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        }));
        setTestScores(transformedScores as unknown as TestScore[]);
        console.log("Test scores loaded:", transformedScores);
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

  const removeTestScore = async (id: string) => {
    if (!user?.id) {
      setError("User not found. Please log in.");
      return;
    }

    if (!confirm("Are you sure you want to delete this test score?")) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // If it's a temporary score (not saved to database), just remove from local state
      if (id.startsWith("temp-")) {
        setTestScores(prev => prev.filter(score => score.id !== id));
        setSuccess("Test score removed successfully!");
        setTimeout(() => setSuccess(null), 3000);
        return;
      }

      // Delete from database
      const response = await testScoreApi.delete(user.id, id);

      if (response) {
        setTestScores(prev => prev.filter(score => score.id !== id));
        setSuccess("Test score deleted successfully!");
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (error) {
      console.error("Error deleting test score:", error);
      setError("Failed to delete test score. Please try again.");
      setTimeout(() => setError(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  const saveTestScores = async () => {
    if (!user?.id) {
      setError("User not found. Please log in.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      let hasChanges = false;

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

          const response = await testScoreApi.create(user.id, newScore);
          
          if (response && typeof response === 'object' && 'id' in response) {
            // Update the local state with the new ID from the database
          setTestScores(prev =>
              prev.map(s =>
                s.id === score.id ? { ...s, id: response.id as string } : s
              )
            );
            hasChanges = true;
          }
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

          const response = await testScoreApi.update(user.id, score.id, updatedScore);
          
          if (response) {
            hasChanges = true;
          }
        }
      }

      if (hasChanges) {
        setSuccess("Test scores saved successfully!");
        // Refresh the data from the database
        await fetchTestScores();
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (error) {
      console.error("Error saving test scores:", error);
      setError("Failed to save test scores. Please try again.");
      // Clear error message after 5 seconds
      setTimeout(() => setError(null), 5000);
    } finally {
      setLoading(false);
    }
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
            <Check className="h-5 w-5 text-green-600" />
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

        <Card>
          <CardHeader>
            <CardTitle>Test Scores</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-2 text-muted-foreground">
                  Loading test scores...
                </p>
              </div>
            ) : error && testScores.length === 0 ? (
              <div className="text-center py-8">
                <AlertCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-red-600">
                  Error Loading Test Scores
                </h3>
                <p className="text-muted-foreground mb-4">{error}</p>
                <Button
                  onClick={fetchTestScores}
                  variant="outline"
                >
                  Try Again
                </Button>
              </div>
            ) : testScores.length === 0 ? (
              <div className="text-center py-8">
                <Check className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  No Test Scores Yet
                </h3>
                <p className="text-muted-foreground mb-4">
                  Start by adding your first test score to track your academic progress.
                </p>
                <Button
                  onClick={addTestScore}
                  className="text-white hover:opacity-90"
                  style={{ backgroundColor: "#00136A" }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Score
                </Button>
              </div>
            ) : (
              <>
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
                disabled={loading}
                className="text-white hover:opacity-90"
                style={{ backgroundColor: "#00136A" }}
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <Check className="h-4 w-4 mr-2" />
                )}
                Save Test Scores
              </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
