import Image from "next/image";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Star, ArrowRight, Heart, Filter } from "lucide-react";

export default function UniversitiesPage() {
  const universities = [
    {
      name: "Massachusetts Institute of Technology",
      location: "Cambridge, MA, USA",
      ranking: 1,
      rating: 4.9,
      tuition: "$57,986/year",
      acceptance: "6.7%",
      students: "11,934",
      image: "/mit-campus-aerial.png",
      programs: ["Computer Science", "Engineering", "Physics", "Mathematics"],
      highlights: [
        "Top Engineering School",
        "Research Excellence",
        "Innovation Hub",
      ],
      deadline: "Jan 1, 2025",
    },
    {
      name: "Stanford University",
      location: "Stanford, CA, USA",
      ranking: 2,
      rating: 4.8,
      tuition: "$61,731/year",
      acceptance: "4.3%",
      students: "17,381",
      image: "/stanford-campus.jpg",
      programs: ["Computer Science", "Business", "Medicine", "Engineering"],
      highlights: [
        "Silicon Valley Location",
        "Entrepreneurship",
        "Research University",
      ],
      deadline: "Jan 2, 2025",
    },
    {
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
        "Oldest US University",
        "Prestigious Alumni",
        "World-Class Faculty",
      ],
      deadline: "Jan 1, 2025",
    },
    {
      name: "University of Oxford",
      location: "Oxford, UK",
      ranking: 4,
      rating: 4.7,
      tuition: "£26,770/year",
      acceptance: "17.5%",
      students: "24,515",
      image: "/oxford-university-campus.jpg",
      programs: ["Philosophy", "Literature", "Medicine", "Law"],
      highlights: [
        "Ancient Institution",
        "Tutorial System",
        "Historic Architecture",
      ],
      deadline: "Oct 15, 2024",
    },
  ];

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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search universities, programs, or locations..."
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              >
                Top Ranked
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              >
                STEM Programs
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              >
                Scholarships
              </Badge>
            </div>
          </div>
        </div>

        {/* Universities Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {universities.map((university, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="relative">
                <Image
                  src={university.image || "/placeholder.svg"}
                  alt={university.name}
                  width={400}
                  height={192}
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

              <CardContent className="p-6">
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

                <div className="grid grid-cols-3 gap-4 my-4 text-center">
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
                  <div>
                    <p className="text-sm text-muted-foreground">Students</p>
                    <p className="font-semibold text-sm">
                      {university.students}
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

                  <div>
                    <p className="text-sm font-medium mb-2">Highlights:</p>
                    <div className="flex flex-wrap gap-1">
                      {university.highlights.map(
                        (highlight, highlightIndex) => (
                          <Badge
                            key={highlightIndex}
                            variant="outline"
                            className="text-xs"
                          >
                            {highlight}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                  <div className="text-sm">
                    <span className="text-muted-foreground">
                      Application Deadline
                    </span>
                    <span className="font-medium text-destructive">
                      {university.deadline}
                    </span>
                  </div>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
