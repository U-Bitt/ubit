import Image from "next/image";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/router";
import { useState, useMemo, useEffect } from "react";
import {
  Search,
  MapPin,
  Star,
  ArrowRight,
  Heart,
  X,
  Bookmark,
} from "lucide-react";
import { useSavedUniversities } from "@/hooks/useSavedUniversities";
import { universityApi, University } from "@/utils/api";

export const Universities = () => {
  const router = useRouter();

  // State for search and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  // Saved universities hook
  const { savedUniversities, toggleSave, isSaved } = useSavedUniversities();

  // Retry function
  const retryFetch = () => {
    setRetryCount(prev => prev + 1);
    setError(null);
    setLoading(false); // Don't show loading since we have mock data
  };

  // Load universities (mock-first approach)
  useEffect(() => {
    const loadUniversities = async () => {
      setLoading(true);
      setError(null);
      
      // First, load mock data immediately for better UX
      const mockData = [
        {
          id: "mit",
          name: "Massachusetts Institute of Technology",
          location: "Cambridge, MA, USA",
          ranking: 1,
          rating: 4.9,
          tuition: "$57,986/year",
          acceptance: "6.7%",
          students: "11,934",
          image: "/mit-campus-aerial.png",
          programs: [
            "Computer Science",
            "Engineering",
            "Physics",
            "Mathematics",
          ],
          highlights: [
            "World-renowned research",
            "Innovation hub",
            "Strong industry connections",
          ],
          deadline: "Jan 1, 2025",
        },
        {
          id: "stanford",
          name: "Stanford University",
          location: "Stanford, CA, USA",
          ranking: 2,
          rating: 4.8,
          tuition: "$61,731/year",
          acceptance: "4.3%",
          students: "17,381",
          image: "/stanford-campus.jpg",
          programs: [
            "Computer Science",
            "Business",
            "Medicine",
            "Engineering",
          ],
          highlights: [
            "Silicon Valley location",
            "Entrepreneurship focus",
            "Beautiful campus",
          ],
          deadline: "Jan 2, 2025",
        },
        {
          id: "harvard",
          name: "Harvard University",
          location: "Cambridge, MA, USA",
          ranking: 3,
          rating: 4.9,
          tuition: "$57,261/year",
          acceptance: "3.4%",
          students: "23,731",
          image: "/harvard-campus.jpg",
          programs: ["Liberal Arts", "Medicine", "Law", "Business"],
          highlights: [
            "World's most prestigious university",
            "Strong alumni network",
            "Excellent research facilities",
          ],
          deadline: "Jan 1, 2025",
        },
        {
          id: "oxford",
          name: "University of Oxford",
          location: "Oxford, UK",
          ranking: 4,
          rating: 4.7,
          tuition: "£26,770/year",
          acceptance: "17.5%",
          students: "24,000",
          image: "/oxford-university-campus.jpg",
          programs: ["Philosophy", "Literature", "Medicine", "Law"],
          highlights: [
            "World's oldest English-speaking university",
            "Prestigious tutorial system",
            "Beautiful historic campus",
          ],
          deadline: "Oct 15, 2024",
        },
        {
          id: "cambridge",
          name: "University of Cambridge",
          location: "Cambridge, UK",
          ranking: 5,
          rating: 4.6,
          tuition: "£26,770/year",
          acceptance: "21.0%",
          students: "23,000",
          image: "/cambridge-university-campus.jpg",
          programs: ["Natural Sciences", "Engineering", "Medicine", "Mathematics"],
          highlights: [
            "Historic university town",
            "Excellent research facilities",
            "Strong academic tradition",
          ],
          deadline: "Oct 15, 2024",
        },
        {
          id: "yale",
          name: "Yale University",
          location: "New Haven, CT, USA",
          ranking: 6,
          rating: 4.5,
          tuition: "$62,250/year",
          acceptance: "6.2%",
          students: "13,433",
          image: "/yale-campus.jpg",
          programs: ["Liberal Arts", "Medicine", "Law", "Drama"],
          highlights: [
            "Ivy League institution",
            "Strong liberal arts focus",
            "Beautiful Gothic architecture",
          ],
          deadline: "Jan 2, 2025",
        },
      ];
      
      // Set mock data immediately
      setUniversities(mockData);
      setLoading(false);
      
      // Then try to fetch from API in the background (with a shorter delay)
      setTimeout(async () => {
        try {
          // First, test if the backend is responding
          const healthCheck = await fetch('http://localhost:5001/health');
          if (!healthCheck.ok) {
            throw new Error('Backend health check failed');
          }
          
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout
          
          const response = await universityApi.getAll();
          clearTimeout(timeoutId);
          
          // If API succeeds, update with real data
          setUniversities(response);
          setError(null);
          console.log("Successfully loaded data from API");
        } catch (err) {
          // API failed, but we already have mock data loaded
          console.log("API unavailable, using mock data:", err);
          // Only show error if this is a retry attempt and we still can't connect
          if (retryCount > 0) {
            setError("Unable to connect to server. Using offline data. Some features may be limited.");
          } else {
            // First attempt failed, but we have mock data, so just log silently
            console.log("Continuing with mock data due to API unavailability");
          }
        }
      }, 1000); // Wait 1 second before trying API
    };

    loadUniversities();
  }, [retryCount]);

  // Handle country parameter from URL
  useEffect(() => {
    if (router.isReady && router.query.country) {
      const countryName = router.query.country as string;
      setSearchQuery(countryName);
    }
  }, [router.isReady, router.query.country]);

  // Helper function to check if university matches country
  const matchesCountry = (university: University, countryQuery: string) => {
    if (!countryQuery) return true;

    const countryQueryLower = countryQuery.toLowerCase();
    const locationLower = university.location.toLowerCase();

    // Map country names to common variations
    const countryMappings: { [key: string]: string[] } = {
      "united states": ["usa", "us", "america", "united states"],
      "united kingdom": ["uk", "britain", "england", "scotland", "wales"],
      canada: ["canada", "canadian"],
      germany: ["germany", "german"],
      australia: ["australia", "australian"],
      netherlands: ["netherlands", "dutch", "holland"],
    };

    // Check direct country name match
    if (locationLower.includes(countryQueryLower)) return true;

    // Check mapped variations
    for (const [country, variations] of Object.entries(countryMappings)) {
      if (
        countryQueryLower.includes(country) ||
        country.includes(countryQueryLower)
      ) {
        return variations.some(variation => locationLower.includes(variation));
      }
    }

    return false;
  };

  // Filter and search logic
  const filteredUniversities = useMemo(() => {
    return universities.filter(university => {
      // Search filter (including country matching)
      const matchesSearch =
        searchQuery === "" ||
        university.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        university.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        university.programs.some(program =>
          program.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        matchesCountry(university, searchQuery);

      // Active filters
      const matchesFilters =
        activeFilters.length === 0 ||
        activeFilters.every(filter => {
          switch (filter) {
            case "top-ranked":
              return university.ranking <= 3;
            case "stem-programs":
              return university.programs.some(program =>
                [
                  "Computer Science",
                  "Engineering",
                  "Physics",
                  "Mathematics",
                  "Biology",
                  "Chemistry",
                ].includes(program)
              );
            case "scholarships":
              return (
                university.tuition.includes("$") &&
                parseFloat(university.tuition.replace(/[$,]/g, "")) > 50000
              );
            case "saved":
              return isSaved(university.id);
            default:
              return true;
          }
        });

      return matchesSearch && matchesFilters;
    });
  }, [searchQuery, activeFilters, isSaved, universities]);

  // Filter toggle function
  const toggleFilter = (filter: string) => {
    setActiveFilters(prev =>
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setActiveFilters([]);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Universities
          </h1>
          <p className="text-muted-foreground">
            Discover top universities worldwide and find your perfect match
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-[37px] w-4" />
              <Input
                placeholder="Search universities, programs, or locations..."
                className="pl-10"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" onClick={clearFilters}>
                <X className="h-4 w-4 mr-2" />
                Clear
              </Button>
              <Badge
                variant={
                  activeFilters.includes("top-ranked") ? "default" : "outline"
                }
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                onClick={() => toggleFilter("top-ranked")}
              >
                Top Ranked
              </Badge>
              <Badge
                variant={
                  activeFilters.includes("stem-programs")
                    ? "default"
                    : "outline"
                }
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                onClick={() => toggleFilter("stem-programs")}
              >
                STEM Programs
              </Badge>
              <Badge
                variant={
                  activeFilters.includes("scholarships") ? "default" : "outline"
                }
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                onClick={() => toggleFilter("scholarships")}
              >
                Scholarships
              </Badge>
              <Badge
                variant={
                  activeFilters.includes("saved") ? "default" : "outline"
                }
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                onClick={() => toggleFilter("saved")}
              >
                <Bookmark className="h-3 w-3 mr-1" />
                Saved ({savedUniversities.length})
              </Badge>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-4">
          <p className="text-muted-foreground">
            Showing {filteredUniversities.length} of {universities.length}{" "}
            universities
            {(searchQuery || activeFilters.length > 0) && (
              <span className="ml-2">
                {searchQuery && `for "${searchQuery}"`}
                {activeFilters.length > 0 &&
                  ` with ${activeFilters.join(", ")} filters`}
              </span>
            )}
            {router.query.country && (
              <span className="ml-2 text-primary font-medium">
                in {router.query.country}
              </span>
            )}
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold mb-2">
                Loading universities...
              </h3>
              <p>Please wait while we fetch the latest data</p>
            </div>
          </div>
        ) : error ? (
          <div className="mb-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="text-yellow-600 mr-2">⚠️</div>
                  <p className="text-yellow-800 text-sm">{error}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={retryFetch}
                  className="text-yellow-800 border-yellow-300 hover:bg-yellow-100"
                >
                  Retry
                </Button>
              </div>
            </div>
          </div>
        ) : filteredUniversities.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">
                No universities found
              </h3>
              <p>Try adjusting your search terms or filters</p>
            </div>
            <Button variant="outline" onClick={clearFilters}>
              Clear all filters
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {filteredUniversities.map((university, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 overflow-hidden py-0 gap-0"
              >
                <div className="relative">
                  <Image
                    src={university.image || "/placeholder.svg"}
                    alt={university.name}
                    width={400}
                    height={230}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-primary-foreground">
                      #{university.ranking} Globally
                    </Badge>
                  </div>
                  <Button
                    size="sm"
                    variant={isSaved(university.id) ? "default" : "secondary"}
                    className={`absolute top-4 right-4 rounded-full w-10 h-10 p-0 ${
                      isSaved(university.id)
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : "hover:bg-red-50"
                    }`}
                    onClick={() => toggleSave(university.id)}
                  >
                    <Heart
                      className={`h-4 w-4 ${isSaved(university.id) ? "fill-current" : ""}`}
                    />
                  </Button>
                </div>

                <CardContent className="p-6 flex flex-col justify-between h-full">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl mb-1">
                        {university.name}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{university.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">
                        {university.rating}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 my-4 text-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Tuition</p>
                      <p className="font-semibold text-sm">
                        {university.tuition}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Acceptance
                      </p>
                      <p className="font-semibold text-sm">
                        {university.acceptance}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4 pt-4 border-t">
                    <div className="text-sm">
                      <p className="text-muted-foreground">
                        Application Deadline
                      </p>
                      <p className="font-medium text-destructive">
                        {university.deadline}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primary/90"
                      onClick={() =>
                        router.push(`/universityDetail/${university.id}`)
                      }
                    >
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};