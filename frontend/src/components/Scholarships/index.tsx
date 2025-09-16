import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Star, ArrowRight, Mail, Linkedin, ExternalLink, DollarSign, Users, Calendar, Award } from "lucide-react";
import { useState, useMemo } from "react";

export const Scholarships = () => {
  const scholarships = [
    {
      id: 1,
      title: "MIT Alumni Engineering Excellence Scholarship",
      donor: {
        name: "Dr. Sarah Chen",
        title: "MIT '95, Senior VP at Google",
        avatar: "SC",
        company: "Google",
        linkedin: "https://linkedin.com/in/sarahchen",
        email: "sarah.chen@alumni.mit.edu"
      },
      amount: "$25,000",
      duration: "4 years",
      deadline: "March 15, 2024",
      description: "Awarded to outstanding students pursuing engineering degrees with demonstrated leadership potential and community involvement.",
      requirements: [
        "3.8+ GPA",
        "Engineering major",
        "Leadership experience",
        "Community service"
      ],
      field: "Engineering",
      level: "Undergraduate",
      country: "United States",
      university: "MIT",
      applications: 245,
      spots: 3
    },
    {
      id: 2,
      title: "Harvard Business School Alumni Fellowship",
      donor: {
        name: "Michael Rodriguez",
        title: "Harvard MBA '98, CEO at TechCorp",
        avatar: "MR",
        company: "TechCorp",
        linkedin: "https://linkedin.com/in/michaelrodriguez",
        email: "m.rodriguez@alumni.harvard.edu"
      },
      amount: "$50,000",
      duration: "2 years",
      deadline: "April 30, 2024",
      description: "Supporting exceptional students from underrepresented backgrounds pursuing MBA degrees with entrepreneurial aspirations.",
      requirements: [
        "GMAT 700+",
        "Entrepreneurial experience",
        "Underrepresented background",
        "Leadership potential"
      ],
      field: "Business",
      level: "Graduate",
      country: "United States",
      university: "Harvard",
      applications: 189,
      spots: 2
    },
    {
      id: 3,
      title: "Oxford Alumni Medical Research Grant",
      donor: {
        name: "Dr. Emily Watson",
        title: "Oxford '92, Chief Medical Officer",
        avatar: "EW",
        company: "Global Health Institute",
        linkedin: "https://linkedin.com/in/emilywatson",
        email: "e.watson@alumni.oxford.edu"
      },
      amount: "$30,000",
      duration: "3 years",
      deadline: "May 20, 2024",
      description: "Funding for medical students conducting groundbreaking research in infectious diseases and public health.",
      requirements: [
        "Medical school enrollment",
        "Research proposal",
        "Academic excellence",
        "Public health focus"
      ],
      field: "Medicine",
      level: "Graduate",
      country: "United Kingdom",
      university: "Oxford",
      applications: 156,
      spots: 4
    },
    {
      id: 4,
      title: "Stanford Computer Science Innovation Award",
      donor: {
        name: "Alex Kim",
        title: "Stanford '00, CTO at InnovateAI",
        avatar: "AK",
        company: "InnovateAI",
        linkedin: "https://linkedin.com/in/alexkim",
        email: "a.kim@alumni.stanford.edu"
      },
      amount: "$20,000",
      duration: "1 year",
      deadline: "June 10, 2024",
      description: "Supporting students developing innovative AI and machine learning solutions with real-world applications.",
      requirements: [
        "CS major",
        "AI/ML project",
        "Innovation potential",
        "Technical excellence"
      ],
      field: "Computer Science",
      level: "Undergraduate",
      country: "United States",
      university: "Stanford",
      applications: 312,
      spots: 5
    },
    {
      id: 5,
      title: "Cambridge International Student Support Fund",
      donor: {
        name: "James Thompson",
        title: "Cambridge '89, Investment Banker",
        avatar: "JT",
        company: "Thompson & Associates",
        linkedin: "https://linkedin.com/in/jamesthompson",
        email: "j.thompson@alumni.cambridge.edu"
      },
      amount: "$15,000",
      duration: "2 years",
      deadline: "July 1, 2024",
      description: "Financial assistance for international students facing economic hardship while pursuing their studies at Cambridge.",
      requirements: [
        "International student",
        "Financial need",
        "Academic merit",
        "Community contribution"
      ],
      field: "Any",
      level: "Any",
      country: "United Kingdom",
      university: "Cambridge",
      applications: 278,
      spots: 8
    },
    {
      id: 6,
      title: "Yale Arts & Humanities Excellence Scholarship",
      donor: {
        name: "Maria Santos",
        title: "Yale '94, Museum Director",
        avatar: "MS",
        company: "Metropolitan Museum",
        linkedin: "https://linkedin.com/in/mariasantos",
        email: "m.santos@alumni.yale.edu"
      },
      amount: "$18,000",
      duration: "4 years",
      deadline: "August 15, 2024",
      description: "Supporting talented students in arts and humanities with a focus on cultural preservation and creative expression.",
      requirements: [
        "Arts/Humanities major",
        "Portfolio submission",
        "Cultural impact",
        "Academic excellence"
      ],
      field: "Arts & Humanities",
      level: "Undergraduate",
      country: "United States",
      university: "Yale",
      applications: 134,
      spots: 3
    }
  ];

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
              className="hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{scholarship.title}</CardTitle>
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
                <p className="text-sm text-muted-foreground">
                  {scholarship.description}
                </p>

                {/* Scholarship Details */}
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
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Award className="h-3 w-3" />
                      Duration
                    </span>
                    <span className="font-medium text-xs">
                      {scholarship.duration}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      Applications
                    </span>
                    <span className="font-medium text-xs">
                      {scholarship.applications} applied, {scholarship.spots} spots
                    </span>
                  </div>
                </div>

                {/* Requirements */}
                <div className="space-y-2">
                  <p className="text-sm font-medium">Requirements:</p>
                  <div className="flex flex-wrap gap-1">
                    {scholarship.requirements.map((req, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* University Info */}
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">{scholarship.university}</span>
                  <span className="text-muted-foreground">{scholarship.country}</span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Apply Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => window.open(`mailto:${scholarship.donor.email}?subject=Inquiry about ${scholarship.title}`)}
                    >
                      <Mail className="h-3 w-3 mr-1" />
                      Email Donor
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => window.open(scholarship.donor.linkedin, '_blank')}
                    >
                      <Linkedin className="h-3 w-3 mr-1" />
                      LinkedIn
                    </Button>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full text-xs"
                    onClick={() => window.open(scholarship.donor.linkedin, '_blank')}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View Donor Profile
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