import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Star, ArrowRight, X } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/router";
import { countryApi, Country } from "@/utils/api";

export const Countries = () => {
  const router = useRouter();
  
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  // Load countries from API
  useEffect(() => {
    const loadCountries = async () => {
      setLoading(true);
      
      try {
        const response = await countryApi.getAll();
        // Ensure response is an array
        setCountries(Array.isArray(response) ? response : []);
      } catch (err) {
        console.error("Error loading countries:", err);
        // Set empty array on error
        setCountries([]);
      } finally {
        setLoading(false);
      }
    };

    loadCountries();
  }, []);

  // Filter and search logic
  const filteredCountries = useMemo(() => {
    // Safety check to ensure countries is an array
    if (!Array.isArray(countries)) {
      return [];
    }
    
    return countries.filter((country) => {
      // Search filter
      const matchesSearch = searchQuery === "" || 
        country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.visaType.toLowerCase().includes(searchQuery.toLowerCase());

      // Active filters
      const matchesFilters = activeFilters.length === 0 || activeFilters.every(filter => {
        switch (filter) {
          case "english-speaking":
            return country.isEnglishSpeaking;
          case "low-cost":
            return country.isLowCost;
          case "work-rights":
            return country.hasWorkRights;
          default:
            return true;
        }
      });

      return matchesSearch && matchesFilters;
    });
  }, [searchQuery, activeFilters, countries]);

  // Filter toggle function
  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setActiveFilters([]);
    setSearchQuery("");
  };

  // Handle explore universities button click
  const handleExploreUniversities = (countryName: string) => {
    router.push(`/discover/universities?country=${encodeURIComponent(countryName)}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Study Destinations
          </h1>
          <p className="text-muted-foreground">
            Explore countries and find your perfect study destination
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search countries, descriptions, or visa types..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" onClick={clearFilters}>
                <X className="h-4 w-4 mr-2" />
                Clear
              </Button>
              <Badge
                variant={activeFilters.includes("english-speaking") ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                onClick={() => toggleFilter("english-speaking")}
              >
                English Speaking
              </Badge>
              <Badge
                variant={activeFilters.includes("low-cost") ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                onClick={() => toggleFilter("low-cost")}
              >
                Low Cost
              </Badge>
              <Badge
                variant={activeFilters.includes("work-rights") ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                onClick={() => toggleFilter("work-rights")}
              >
                Work Rights
              </Badge>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold mb-2">Loading countries...</h3>
            <p>Please wait while we fetch the latest data</p>
          </div>
        )}

        {/* Results Counter */}
        {!loading && (
          <div className="mb-4">
            <p className="text-muted-foreground">
              Showing {filteredCountries.length} of {countries.length} countries
              {(searchQuery || activeFilters.length > 0) && (
                <span className="ml-2">
                  {searchQuery && `for "${searchQuery}"`}
                  {activeFilters.length > 0 && ` with ${activeFilters.join(", ")} filters`}
                </span>
              )}
            </p>
          </div>
        )}

        {/* Countries Grid */}
        {!loading && filteredCountries.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No countries found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or filters to find more countries.
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Clear all filters
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCountries.map((country, index) => (
              <Card
                key={country.id || index}
                className="hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{country.flag}</div>
                      <div>
                        <CardTitle className="text-xl">{country.name}</CardTitle>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-muted-foreground">
                            {country.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {country.description}
                  </p>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Visa Type
                      </span>
                      <span className="font-medium text-xs">
                        {country.visaType}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Work Rights
                      </span>
                      <span className="font-medium text-xs">
                        {country.workRights}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Avg Tuition
                      </span>
                      <span className="font-semibold text-sm">
                        {country.avgTuition}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Living Cost
                      </span>
                      <span className="font-semibold text-sm">
                        {country.livingCost}
                      </span>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={() => handleExploreUniversities(country.name)}
                  >
                    Explore Universities
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};