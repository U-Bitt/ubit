import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Star, ArrowRight, Mail, Linkedin, ExternalLink, DollarSign, Users, Calendar, Award } from "lucide-react";
import { useState, useMemo } from "react";
import { useRouter } from "next/router";
import { scholarships } from "@/mockData/scholarships";

export const Scholarships = () => {
  const router = useRouter();

  const fields = ["All", "Engineering", "Business", "Medicine", "Computer Science", "Arts & Humanities"];
  const levels = ["All", "Undergraduate", "Graduate"];
  const countries = ["All", "United States", "United Kingdom", "Canada"];

  // State management
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedField, setSelectedField] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState("All");

  // Filter and search logic
  const filteredScholarships = useMemo(() => {
    return scholarships.filter((scholarship) => {
      // Search filter
      const matchesSearch = searchQuery === "" || 
        scholarship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scholarship.donor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scholarship.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scholarship.field.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scholarship.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Field filter
      const matchesField = selectedField === "All" || scholarship.field === selectedField;

      // Level filter
      const matchesLevel = selectedLevel === "All" || scholarship.level === selectedLevel;

      // Country filter
      const matchesCountry = selectedCountry === "All" || scholarship.country === selectedCountry;

      return matchesSearch && matchesField && matchesLevel && matchesCountry;
    });
  }, [searchQuery, selectedField, selectedLevel, selectedCountry]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Alumni-Funded Scholarships
          </h1>
          <p className="text-muted-foreground">
            Discover scholarships funded by university alumni and connect directly with donors
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search scholarships, donors, or universities..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {fields.map((field) => (
                <Badge
                  key={field}
                  variant={selectedField === field ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => setSelectedField(field)}
                >
                  {field}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="flex gap-4 flex-wrap">
            <div className="flex gap-2">
              <span className="text-sm text-muted-foreground self-center">Level:</span>
              {levels.map((level) => (
                <Badge
                  key={level}
                  variant={selectedLevel === level ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => setSelectedLevel(level)}
                >
                  {level}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <span className="text-sm text-muted-foreground self-center">Country:</span>
              {countries.map((country) => (
                <Badge
                  key={country}
                  variant={selectedCountry === country ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => setSelectedCountry(country)}
                >
                  {country}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredScholarships.length} of {scholarships.length} scholarships
          </p>
        </div>

        {/* Scholarships Grid */}
        {filteredScholarships.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No scholarships found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or filters to find more scholarships.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery("");
                setSelectedField("All");
                setSelectedLevel("All");
                setSelectedCountry("All");
              }}
            >
              Clear all filters
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredScholarships.map((scholarship) => (
            <Card
              key={scholarship.id}
              className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => router.push(`/scholarshipDetail/${scholarship.id}`)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2 line-clamp-2">{scholarship.title}</CardTitle>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {scholarship.donor.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{scholarship.donor.name}</p>
                        <p className="text-xs text-muted-foreground">{scholarship.donor.title}</p>
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="ml-2">
                    {scholarship.field}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {scholarship.description}
                </p>

                {/* Key Details Only */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      Amount
                    </span>
                    <span className="font-semibold text-sm text-green-600">
                      {scholarship.amount}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Deadline
                    </span>
                    <span className="font-medium text-xs">
                      {scholarship.deadline}
                    </span>
                  </div>
                </div>

                {/* University Info */}
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">{scholarship.university}</span>
                  <span className="text-muted-foreground">{scholarship.country}</span>
                </div>

                {/* View Details Button */}
                <Button 
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/scholarshipDetail/${scholarship.id}`);
                  }}
                >
                  View Details
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