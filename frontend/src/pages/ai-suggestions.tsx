import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
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

interface UniversitySuggestion {
  id: string;
  name: string;
  location: string;
  ranking: number;
  rating: number;
  tuition: string;
  acceptance: string;
  students: string;
  image: string;
  programs: string[];
  highlights: string[];
  matchScore: number;
  reason: string;
  deadline: string;
}

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
      const res = await fetch("http://localhost:5000/api/ai/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setResult(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
              Буцах
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">
              AI санал болгосон их сургуулууд
            </h1>
          </div>
          <p className="text-gray-600">
            Таны академик мэдээлэлд тулгуурлан AI санал болгосон их сургуулууд
          </p>
        </div>

        {/* User Profile Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Таны академик мэдээлэл
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {userData.gpa}
                </div>
                <div className="text-sm text-gray-600">GPA</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {userData.sat}
                </div>
                <div className="text-sm text-gray-600">SAT</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {userData.toefl}
                </div>
                <div className="text-sm text-gray-600">TOEFL</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-lg font-bold text-orange-600">
                  {userData.major}
                </div>
                <div className="text-sm text-gray-600">Мэргэжил</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Loading State */}
        {loading && (
          <Card>
            <CardContent className="p-8 text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">AI санал бэлтгэж байна...</p>
            </CardContent>
          </Card>
        )}

        {/* Error State */}
        {error && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6 text-center">
              <p className="text-red-600 mb-4">Алдаа гарлаа: {error}</p>
              <Button onClick={handleGetSuggestions} variant="outline">
                Дахин оролдох
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {result && result.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Санал болгосон их сургуулууд ({result.length})
              </h2>
              <Button onClick={handleGetSuggestions} variant="outline">
                Шинэчлэх
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {result.map(university => (
                <div key={university.id} className="relative group">
                  {/* Background Image with Overlay */}
                  <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={university.image}
                      alt={university.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={e => {
                        e.currentTarget.src = "/placeholder-logo.svg";
                      }}
                    />

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Content Overlay */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
                      {/* Top Section */}
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold mb-2 leading-tight">
                            {university.name}
                          </h3>
                          <div className="flex items-center gap-2 text-white/80 mb-3">
                            <MapPin className="h-4 w-4" />
                            <span className="text-sm">
                              {university.location}
                            </span>
                          </div>
                        </div>

                        {/* Match Score Badge */}
                        <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3 text-center">
                          <div className="text-2xl font-bold">
                            {university.matchScore}%
                          </div>
                          <div className="text-xs text-white/80">
                            Тохиролцоо
                          </div>
                        </div>
                      </div>

                      {/* Middle Section - Stats */}
                      <div className="flex items-center gap-6 mb-4">
                        <div className="flex items-center gap-2">
                          <Star className="h-5 w-5 text-yellow-400" />
                          <span className="font-semibold">
                            #{university.ranking}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5" />
                          <span className="font-semibold">
                            {university.students}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-5 w-5" />
                          <span className="font-semibold">
                            {university.tuition}
                          </span>
                        </div>
                      </div>

                      {/* Match Reason */}
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4">
                        <div className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium mb-1">
                              Яагаад танд тохирсон:
                            </p>
                            <p className="text-sm text-white/90">
                              {university.reason}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Programs and Deadline */}
                      <div className="mb-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="text-sm font-medium mb-1">
                              Онолын чиглэлүүд:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {university.programs
                                .slice(0, 2)
                                .map((program, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full"
                                  >
                                    {program}
                                  </span>
                                ))}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium mb-1">Хугацаа:</p>
                            <div className="flex items-center gap-1 text-white/90">
                              <Calendar className="h-3 w-3" />
                              <span className="text-xs">
                                {university.deadline}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-white/80">
                          Өргөдлийн хугацаа: {university.deadline}
                        </div>
                      </div>

                      {/* Bottom Section - Action Buttons */}
                      <div className="flex gap-3">
                        <Button
                          className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 rounded-xl"
                          size="lg"
                        >
                          Одоо өргөдөл гаргах
                        </Button>
                        <Button
                          variant="outline"
                          className="bg-white hover:bg-gray-100 text-gray-800 border-white font-semibold py-3 px-6 rounded-xl"
                          size="lg"
                        >
                          Дэлгэрэнгүй
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Additional Info Card */}
                  <div className="mt-4 bg-white rounded-xl p-4 shadow-lg">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <div>
                          <div className="text-gray-500">Хураамж</div>
                          <div className="font-semibold">
                            {university.tuition}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <div>
                          <div className="text-gray-500">Хүлээн авалт</div>
                          <div className="font-semibold">
                            {university.acceptance}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                Санал болгох их сургууль олдсонгүй.
              </p>
              <Button onClick={handleGetSuggestions} variant="outline">
                Дахин оролдох
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
