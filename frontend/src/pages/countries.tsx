import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Star, ArrowRight } from "lucide-react";

export default function CountriesPage() {
  const countries = [
    {
      name: "United States",
      flag: "🇺🇸",
      popularCities: ["New York", "Boston", "San Francisco"],
      rating: 4.8,
      description:
        "Home to world-renowned universities like Harvard, MIT, and Stanford.",
      visaType: "F-1 Student Visa",
      workRights: "CPT/OPT available",
      avgTuition: "$50,000/year",
      livingCost: "$15,000/year",
    },
    {
      name: "United Kingdom",
      flag: "🇬🇧",
      popularCities: ["London", "Cambridge", "Oxford"],
      rating: 4.7,
      description:
        "Rich academic tradition with universities like Oxford and Cambridge.",
      visaType: "Student Visa",
      workRights: "20 hours/week",
      avgTuition: "£25,000/year",
      livingCost: "£12,000/year",
    },
    {
      name: "Canada",
      flag: "🇨🇦",
      popularCities: ["Toronto", "Vancouver", "Montreal"],
      rating: 4.6,
      description:
        "Welcoming immigration policies and high-quality education system.",
      visaType: "Study Permit",
      workRights: "20 hours/week",
      avgTuition: "C$30,000/year",
      livingCost: "C$15,000/year",
    },
  ];

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
                placeholder="Search countries or cities..."
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              >
                English Speaking
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              >
                Low Cost
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              >
                Work Rights
              </Badge>
            </div>
          </div>
        </div>

        {/* Countries Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {countries.map((country, index) => (
            <Card
              key={index}
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

                <div className="space-y-2">
                  <p className="text-sm font-medium">Popular Cities:</p>
                  <div className="flex flex-wrap gap-1">
                    {country.popularCities.map((city, cityIndex) => (
                      <Badge
                        key={cityIndex}
                        variant="secondary"
                        className="text-xs"
                      >
                        {city}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90">
                  Explore Universities
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
