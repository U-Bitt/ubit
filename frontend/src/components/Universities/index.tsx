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

  // Saved universities hook
  const { savedUniversities, toggleSave, isSaved } = useSavedUniversities();

  // Load universities from API
  useEffect(() => {
    const loadUniversities = async () => {
      setLoading(true);
      
      try {
        const response = await universityApi.getAll();
        // Ensure response is an array
        setUniversities(Array.isArray(response) ? response : []);
      } catch (err) {
        console.error("Error loading universities:", err);
        // Set empty array on error
        setUniversities([]);
      } finally {
        setLoading(false);
      }
    };

    loadUniversities();
  }, []);

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
    // Safety check to ensure universities is an array
    if (!Array.isArray(universities)) {
      return [];
    }
    
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
                key={university.id || index}
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