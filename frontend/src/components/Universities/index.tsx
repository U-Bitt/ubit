import Image from "next/image";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/router";
import { useState, useMemo } from "react";
import { Search, MapPin, Star, ArrowRight, Heart, Filter, X } from "lucide-react";

export const Universities = () => {
  const router = useRouter();
  
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  const universities = [
    {
      id: "mit",
      name: "Massachusetts Institute of Technology",
      location: "Cambridge, MA, USA",
      ranking: 1,
      rating: 4.9,
      tuition: "$57,986/year",
      acceptance: "6.7%",
      image: "/mit-campus-aerial.png",
      programs: ["Computer Science", "Engineering", "Physics", "Mathematics"],
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
      image: "/stanford-campus.jpg",
      programs: ["Computer Science", "Business", "Medicine", "Engineering"],
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
      image: "/harvard-campus.jpg",
      programs: ["Liberal Arts", "Medicine", "Law", "Business"],
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
      image: "/oxford-university-campus.jpg",
      programs: ["Philosophy", "Literature", "Medicine", "Law"],
      deadline: "Oct 15, 2024",
    },
  ];

  // Filter and search logic
  const filteredUniversities = useMemo(() => {
    return universities.filter((university) => {
      // Search filter
      const matchesSearch = searchQuery === "" || 
        university.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        university.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        university.programs.some(program => 
          program.toLowerCase().includes(searchQuery.toLowerCase())
        );

      // Active filters
      const matchesFilters = activeFilters.length === 0 || activeFilters.every(filter => {
        switch (filter) {
          case "top-ranked":
            return university.ranking <= 3;
          case "stem-programs":
            return university.programs.some(program => 
              ["Computer Science", "Engineering", "Physics", "Mathematics", "Biology", "Chemistry"].includes(program)
            );
          case "scholarships":
            return university.tuition.includes("$") && parseFloat(university.tuition.replace(/[$,]/g, "")) > 50000;
          default:
            return true;
        }
      });

      return matchesSearch && matchesFilters;
    });
  }, [searchQuery, activeFilters]);

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
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" onClick={clearFilters}>
                <X className="h-4 w-4 mr-2" />
                Clear
              </Button>
              <Badge
                variant={activeFilters.includes("top-ranked") ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                onClick={() => toggleFilter("top-ranked")}
              >
                Top Ranked
              </Badge>
              <Badge
                variant={activeFilters.includes("stem-programs") ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                onClick={() => toggleFilter("stem-programs")}
              >
                STEM Programs
              </Badge>
              <Badge
                variant={activeFilters.includes("scholarships") ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                onClick={() => toggleFilter("scholarships")}
              >
                Scholarships
              </Badge>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-4">
          <p className="text-muted-foreground">
            Showing {filteredUniversities.length} of {universities.length} universities
            {(searchQuery || activeFilters.length > 0) && (
              <span className="ml-2">
                {searchQuery && `for "${searchQuery}"`}
                {activeFilters.length > 0 && ` with ${activeFilters.join(", ")} filters`}
              </span>
            )}
          </p>
        </div>

        {/* Universities Grid */}
        {filteredUniversities.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No universities found</h3>
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
                  variant="secondary"
                  className="absolute top-4 right-4 rounded-full w-10 h-10 p-0"
                >
                  <Heart className="h-4 w-4" />
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
                    <p className="text-sm text-muted-foreground">Acceptance</p>
                    <p className="font-semibold text-sm">
                      {university.acceptance}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium mb-2">
                      Popular Programs:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {university.programs
                        .slice(0, 3)
                        .map((program, programIndex) => (
                          <Badge
                            key={programIndex}
                            variant="secondary"
                            className="text-xs"
                          >
                            {program}
                          </Badge>
                        ))}
                      {university.programs.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{university.programs.length - 3} more
                        </Badge>
                      )}
                    </div>
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
                    onClick={() => router.push(`/universityDetail/${university.id}`)}
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