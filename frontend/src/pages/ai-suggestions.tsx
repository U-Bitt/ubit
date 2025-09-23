import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { aiApi, UniversitySuggestion, testScoreApi } from "@/utils/api";
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Loader2,
  GraduationCap,
  MapPin,
  Star,
  Users,
  ArrowLeft,
  Check,
  Calendar,
  DollarSign,
  ArrowRight,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

export default function AISuggestionsPage() {
  const router = useRouter();
  const { user, isLoading: userLoading } = useUser();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<UniversitySuggestion[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [testScores, setTestScores] = useState<any[]>([]);
  const [scoresLoading, setScoresLoading] = useState(false);
  const [scoresError, setScoresError] = useState<string | null>(null);
  const [lastFetchTime, setLastFetchTime] = useState<number>(0);

  // Navigation handlers
  const handleViewDetails = (universityId: string) => {
    router.push(`/universityDetail/${universityId}`);
  };

  const handleApplyNow = (universityId: string) => {
    // For now, navigate to university detail page
    // In the future, this could navigate to an application form
    router.push(`/universityDetail/${universityId}`);
  };

  // Get user data from user context and test scores
  const [userData, setUserData] = useState({
    gpa: "",
    sat: "",
    ielts: "",
    major: "",
  });

  // Fetch test scores with rate limiting
  const fetchTestScores = async () => {
    if (!user?.id) return;

    // Rate limiting: only fetch if last fetch was more than 5 seconds ago
    const now = Date.now();
    if (now - lastFetchTime < 5000) {
      console.log("Rate limited: Skipping test scores fetch");
      return;
    }

    try {
      setScoresLoading(true);
      setScoresError(null);
      setLastFetchTime(now);

      const scores = await testScoreApi.getAll(user.id);
      if (Array.isArray(scores)) {
        setTestScores(scores);
      }
    } catch (error) {
      console.error("Error fetching test scores:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch test scores";
      setScoresError(errorMessage);

      // If it's a rate limit error, show a more user-friendly message
      if (errorMessage.includes("Rate limit exceeded")) {
        setScoresError(
          "Too many requests. Please wait a moment and refresh the page."
        );
      }
    } finally {
      setScoresLoading(false);
    }
  };

  // Update user data from user context and test scores
  useEffect(() => {
    if (user) {
      const newUserData = {
        gpa: user.academicInfo?.gpa ? `${user.academicInfo.gpa}/4.0` : "",
        sat: "", // Will be updated from test scores
        ielts: "", // Will be updated from test scores
        major: user.academicInfo?.intendedMajors?.[0] || "",
      };
      setUserData(newUserData);
    }
  }, [user]);

  // Fetch test scores when user is available
  useEffect(() => {
    if (user?.id) {
      fetchTestScores();
    }
  }, [user?.id]);

  // Update SAT and IELTS scores from test scores
  useEffect(() => {
    if (testScores.length > 0) {
      const satScore = testScores.find(
        score => score.examType === "SAT" && score.score
      );
      const ieltsScore = testScores.find(
        score => score.examType === "IELTS" && score.score
      );

      setUserData(prev => ({
        ...prev,
        sat: satScore?.score || "",
        ielts: ieltsScore?.score || "",
      }));
    } else {
      // If no test scores, set to empty
      setUserData(prev => ({
        ...prev,
        sat: "",
        ielts: "",
      }));
    }
  }, [testScores]);

  useEffect(() => {
    // Automatically load suggestions when page loads
    handleGetSuggestions();
  }, [userData]);

  const handleGetSuggestions = async () => {
    setLoading(true);
    setError(null);

    try {
      // Check if we have the minimum required data
      if (!userData.gpa || !userData.major) {
        setError(
          "Please complete your profile with GPA and intended major to get AI suggestions"
        );
        setLoading(false);
        return;
      }

      // Prepare data for API - use default values for missing test scores
      const apiData = {
        gpa: userData.gpa,
        sat: userData.sat || "1200", // Default SAT score if not provided
        toefl: userData.ielts || "6.5", // Send IELTS score as toefl field for API compatibility
        major: userData.major,
      };

      const response = await aiApi.suggestUniversities(apiData);
      setResult(response.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">
              AI Suggested Universities
            </h1>
          </div>
          <p className="text-gray-600">
            AI recommended universities based on your academic information
          </p>
        </div>

        {/* User Profile Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Your Academic Information
              {scoresLoading && (
                <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="flex gap-4 pb-2 min-w-max">
                {/* GPA Card */}
                <div className="text-center p-6 bg-white rounded-lg border border-gray-200 flex-shrink-0 w-[220px] h-[130px] flex flex-col justify-center">
                  <div className="text-3xl font-bold text-blue-900">
                    {userData.gpa || "Not set"}
                  </div>
                  <div className="text-base text-gray-600">GPA</div>
                </div>

                {/* SAT Card */}
                <div className="text-center p-6 bg-white rounded-lg border border-gray-200 flex-shrink-0 w-[220px] h-[130px] flex flex-col justify-center">
                  <div className="text-3xl font-bold text-blue-900">
                    {scoresLoading ? (
                      <Loader2 className="h-8 w-8 animate-spin mx-auto" />
                    ) : userData.sat ? (
                      userData.sat
                    ) : (
                      <span className="text-gray-400 text-xl">
                        Not submitted
                      </span>
                    )}
                  </div>
                  <div className="text-base text-gray-600">
                    SAT{" "}
                    {!userData.sat && (
                      <span className="text-xs text-orange-500">
                        (using default)
                      </span>
                    )}
                  </div>
                </div>

                {/* IELTS Card */}
                <div className="text-center p-6 bg-white rounded-lg border border-gray-200 flex-shrink-0 w-[220px] h-[130px] flex flex-col justify-center">
                  <div className="text-3xl font-bold text-blue-900">
                    {scoresLoading ? (
                      <Loader2 className="h-8 w-8 animate-spin mx-auto" />
                    ) : userData.ielts ? (
                      userData.ielts
                    ) : (
                      <span className="text-gray-400 text-xl">
                        Not submitted
                      </span>
                    )}
                  </div>
                  <div className="text-base text-gray-600">
                    IELTS{" "}
                    {!userData.ielts && (
                      <span className="text-xs text-orange-500">
                        (using default)
                      </span>
                    )}
                  </div>
                </div>

                {/* Major Card */}
                <div className="text-center p-6 bg-white rounded-lg border border-gray-200 flex-shrink-0 w-[220px] h-[130px] flex flex-col justify-center">
                  <div className="text-xl font-bold text-blue-900">
                    {userData.major || "Not set"}
                  </div>
                  <div className="text-base text-gray-600">Major</div>
                </div>

                {/* All Other Test Scores */}
                {testScores
                  .filter(
                    (score, index, self) =>
                      // Remove duplicates by exam type and exclude SAT/IELTS (already shown above)
                      index ===
                        self.findIndex(s => s.examType === score.examType) &&
                      score.examType !== "SAT" &&
                      score.examType !== "IELTS"
                  )
                  .map((score, index) => (
                    <div
                      key={index}
                      className="text-center p-6 bg-white rounded-lg border border-gray-200 flex-shrink-0 w-[220px] h-[130px] flex flex-col justify-center"
                    >
                      <div className="text-3xl font-bold text-blue-900">
                        {score.score}
                      </div>
                      <div className="text-base text-gray-600">
                        {score.examType}
                      </div>
                      {score.band && (
                        <div className="text-xs text-gray-500">
                          Band {score.band}
                        </div>
                      )}
                      {score.examDate && (
                        <div className="text-xs text-gray-400">
                          {new Date(score.examDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>

            {/* Test Scores Error */}
            {scoresError && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2 text-red-700">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">{scoresError}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchTestScores}
                  disabled={scoresLoading}
                  className="mt-2 text-xs"
                >
                  {scoresLoading ? (
                    <Loader2 className="h-3 w-3 animate-spin mr-1" />
                  ) : (
                    <RefreshCw className="h-3 w-3 mr-1" />
                  )}
                  Try Again
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Loading State */}
        {loading && (
          <Card>
            <CardContent className="p-8 text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Preparing AI suggestions...</p>
            </CardContent>
          </Card>
        )}

        {/* Error State */}
        {error && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6 text-center">
              <p className="text-red-600 mb-4">Error occurred: {error}</p>
              <Button onClick={handleGetSuggestions} variant="outline">
                Try Again
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {result && result.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Suggested Universities ({result.length})
              </h2>
              <Button onClick={handleGetSuggestions} variant="outline">
                Refresh
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {result.map(university => (
                <Card
                  key={university.id}
                  className="relative min-h-[500px] overflow-hidden rounded-2xl hover:shadow-xl transition-all duration-300 group"
                  style={{ position: "relative" }}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900">
                    <Image
                      src={university.image}
                      alt={university.name}
                      fill
                      className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={false}
                      style={{
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                      onError={e => {
                        e.currentTarget.src = "/placeholder-logo.svg";
                      }}
                    />
                  </div>

                  {/* 70% Opacity Shadow Overlay */}
                  <div className="absolute inset-0 bg-black opacity-70"></div>

                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-between text-white">
                    {/* Top Section - University Info */}
                    <div className="space-y-3 flex-1">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl md:text-2xl font-bold mb-2 line-clamp-2">
                            {university.name}
                          </h3>
                          <div className="flex items-center gap-2 text-white/90 mb-2">
                            <MapPin className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate text-sm">
                              {university.location}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-white/80">
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 flex-shrink-0" />
                              <span>#{university.ranking}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3 flex-shrink-0" />
                              <span className="truncate">
                                {university.students}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-3 w-3 flex-shrink-0" />
                              <span className="truncate">
                                {university.tuition}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                            {university.matchScore}%
                          </div>
                          <div className="text-sm text-white/80">
                            Match Score
                          </div>
                        </div>
                      </div>

                      {/* Compact Score Analysis */}
                      <div className="space-y-2">
                        <h4 className="font-bold text-base text-white">
                          Score Analysis:
                        </h4>

                        {/* Compact Score Grid */}
                        <div className="grid grid-cols-2 gap-2">
                          {/* GPA */}
                          <div className="bg-white/10 rounded-lg p-2">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs font-medium text-white">
                                GPA
                              </span>
                              <span className="text-xs text-white/80">
                                {university.scoreDetails.gpa.points}/20
                              </span>
                            </div>
                            <div className="text-xs text-white/90 mb-1">
                              {university.scoreDetails.gpa.yourScore} vs{" "}
                              {university.scoreDetails.gpa.required}
                            </div>
                          </div>

                          {/* SAT */}
                          <div className="bg-white/10 rounded-lg p-2">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs font-medium text-white">
                                SAT
                              </span>
                              <span className="text-xs text-white/80">
                                {university.scoreDetails.sat.points}/24
                              </span>
                            </div>
                            <div className="text-xs text-white/90 mb-1">
                              {university.scoreDetails.sat.yourScore} vs{" "}
                              {university.scoreDetails.sat.required}
                            </div>
                          </div>

                          {/* IELTS */}
                          <div className="bg-white/10 rounded-lg p-2">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs font-medium text-white">
                                IELTS
                              </span>
                              <span className="text-xs text-white/80">
                                {university.scoreDetails.ielts.points}/24
                              </span>
                            </div>
                            <div className="text-xs text-white/90 mb-1">
                              {university.scoreDetails.ielts.yourScore} vs{" "}
                              {university.scoreDetails.ielts.required}
                            </div>
                          </div>
                        </div>

                        {/* Highlights */}
                        {university.highlights &&
                          university.highlights.length > 0 && (
                            <div className="bg-white/10 rounded-lg p-2">
                              <div className="text-xs font-medium text-white mb-1">
                                Highlights:
                              </div>
                              <div className="text-xs text-white/90">
                                {university.highlights.slice(0, 2).join(", ")}
                              </div>
                            </div>
                          )}
                      </div>
                    </div>

                    {/* Bottom Section - Actions and Deadline */}
                    <div className="space-y-3">
                      <div className="text-sm text-white/90">
                        <span>Application Deadline: </span>
                        <span className="font-medium text-white">
                          {university.deadline}
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-white/20 text-white border-white/30 hover:bg-white/30 hover:text-white flex-1 min-w-0"
                          onClick={() => handleApplyNow(university.id)}
                        >
                          Apply Now
                        </Button>
                        <Button
                          size="sm"
                          className="bg-white text-black hover:bg-white/90 flex-1 min-w-0"
                          onClick={() => handleViewDetails(university.id)}
                        >
                          <span className="truncate">View Details</span>
                          <ArrowRight className="ml-2 h-4 w-4 flex-shrink-0" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {result && result.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-4">
                No universities found to suggest.
              </p>
              <Button onClick={handleGetSuggestions} variant="outline">
                Try Again
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
