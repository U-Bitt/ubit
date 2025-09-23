import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { aiApi, UniversitySuggestion } from "@/utils/api";
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
} from "lucide-react";

export default function AISuggestionsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<UniversitySuggestion[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Get user data from sessionStorage or use defaults
  const [userData, setUserData] = useState({
    gpa: "3.8/4.0",
    sat: "1450",
    toefl: "108",
    major: "Computer Science",
  });

  useEffect(() => {
    // Try to get user data from sessionStorage
    const storedData = sessionStorage.getItem("aiSuggestionsData");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setUserData(parsedData);
      } catch (error) {
        console.error("Error parsing stored user data:", error);
      }
    }
  }, []);

  useEffect(() => {
    // Automatically load suggestions when page loads
    handleGetSuggestions();
  }, [userData]);

  const handleGetSuggestions = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await aiApi.suggestUniversities(userData);
      setResult(response.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="flex items-center gap-2 bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <h1 className="text-3xl font-bold text-white">
              AI Suggested Universities
            </h1>
          </div>
          <p className="text-slate-300">
            AI recommended universities based on your academic information
          </p>
        </div>

        {/* User Profile Summary */}
        <Card className="mb-8 bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <GraduationCap className="h-5 w-5" />
              Your Academic Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-slate-700 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">
                  {userData.gpa}
                </div>
                <div className="text-sm text-slate-300">GPA</div>
              </div>
              <div className="text-center p-4 bg-slate-700 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">
                  {userData.sat}
                </div>
                <div className="text-sm text-slate-300">SAT</div>
              </div>
              <div className="text-center p-4 bg-slate-700 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">
                  {userData.toefl}
                </div>
                <div className="text-sm text-slate-300">TOEFL</div>
              </div>
              <div className="text-center p-4 bg-slate-700 rounded-lg">
                <div className="text-lg font-bold text-blue-400">
                  {userData.major}
                </div>
                <div className="text-sm text-slate-300">Major</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Loading State */}
        {loading && (
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-8 text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-400" />
              <p className="text-slate-300">Preparing AI suggestions...</p>
            </CardContent>
          </Card>
        )}

        {/* Error State */}
        {error && (
          <Card className="border-red-500 bg-red-900/20">
            <CardContent className="p-6 text-center">
              <p className="text-red-400 mb-4">Error occurred: {error}</p>
              <Button
                onClick={handleGetSuggestions}
                variant="outline"
                className="bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
              >
                Try Again
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {result && result.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                Suggested Universities ({result.length})
              </h2>
              <Button
                onClick={handleGetSuggestions}
                variant="outline"
                className="bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
              >
                Refresh
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {result.map(university => (
                <Card
                  key={university.id}
                  className="relative h-96 overflow-hidden rounded-2xl hover:shadow-xl transition-all duration-300 group bg-slate-800 border-slate-700"
                >
                  {/* Background Image */}
                  <Image
                    src={university.image}
                    alt={university.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={e => {
                      e.currentTarget.src = "/placeholder-logo.svg";
                    }}
                  />

                  {/* Dark Blue Overlay */}
                  <div className="absolute inset-0 bg-slate-900/60"></div>

                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                    {/* Top Section - University Info */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold mb-2 line-clamp-2">
                            {university.name}
                          </h3>
                          <div className="flex items-center gap-2 text-white/90 mb-2">
                            <MapPin className="h-4 w-4" />
                            <span>{university.location}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-white/80">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4" />
                              <span>#{university.ranking}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <span>{university.students}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              <span>{university.tuition}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-white mb-1">
                            {university.matchScore}%
                          </div>
                          <div className="text-sm text-white/80">
                            Match Score
                          </div>
                        </div>
                      </div>

                      {/* Why it was matched for you */}
                      <div>
                        <h4 className="font-semibold mb-2 text-white">
                          Why it was matched for you:
                        </h4>
                        <div className="text-sm text-white/90">
                          <Check className="h-4 w-4 text-white inline mr-2" />
                          {university.reason}
                        </div>
                        {university.highlights &&
                          university.highlights.length > 0 && (
                            <div className="mt-2">
                              <div className="text-xs text-white/80">
                                Highlights:{" "}
                                {university.highlights.slice(0, 2).join(", ")}
                              </div>
                            </div>
                          )}
                      </div>

                      {/* University Info */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-sm mb-2 text-blue-300">
                            Programs:
                          </h5>
                          <div className="text-xs text-white/80">
                            {university.programs
                              ? university.programs.slice(0, 2).join(", ")
                              : "Various programs available"}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm mb-2 text-blue-300">
                            Deadline:
                          </h5>
                          <div className="text-xs text-white/80 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {university.deadline || "Check website"}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Section - Actions and Deadline */}
                    <div className="space-y-4">
                      <div className="text-sm text-white/90">
                        <span>Application Deadline: </span>
                        <span className="font-medium text-white">
                          {university.deadline}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-blue-600/20 text-blue-300 border-blue-500/30 hover:bg-blue-600/30 hover:text-blue-200"
                        >
                          Apply Now
                        </Button>
                        <Button
                          size="sm"
                          className="bg-blue-600 text-white hover:bg-blue-700"
                        >
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4" />
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
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-8 text-center">
              <GraduationCap className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-300 text-lg mb-4">
                No universities found to suggest.
              </p>
              <Button
                onClick={handleGetSuggestions}
                variant="outline"
                className="bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
              >
                Try Again
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
