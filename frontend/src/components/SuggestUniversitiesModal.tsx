import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X, Search, MapPin, Star, Users, DollarSign, Globe } from "lucide-react";

interface SuggestUniversitiesModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: {
    personalInfo: any;
    academicInfo: any;
    testScores: any[];
    interests: string[];
  };
}

interface University {
  id: number;
  name: string;
  country: string;
  ranking: number;
  acceptanceRate: string;
  tuition: string;
  programs: string[];
  requirements: string[];
  matchScore: number;
}

export const SuggestUniversitiesModal = ({ isOpen, onClose, userProfile }: SuggestUniversitiesModalProps) => {
  const [searchCriteria, setSearchCriteria] = useState({
    country: "",
    program: "",
    budget: "",
    ranking: ""
  });

  const [suggestions, setSuggestions] = useState<University[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock universities data
  const universities: University[] = [
    {
      id: 1,
      name: "Massachusetts Institute of Technology",
      country: "USA",
      ranking: 1,
      acceptanceRate: "6.7%",
      tuition: "$57,986",
      programs: ["Computer Science", "Engineering", "Mathematics"],
      requirements: ["SAT: 1500+", "TOEFL: 100+", "Strong Math Background"],
      matchScore: 95
    },
    {
      id: 2,
      name: "Stanford University",
      country: "USA",
      ranking: 2,
      acceptanceRate: "4.3%",
      tuition: "$61,731",
      programs: ["Computer Science", "Engineering", "Business"],
      requirements: ["SAT: 1480+", "TOEFL: 100+", "Leadership Experience"],
      matchScore: 92
    },
    {
      id: 3,
      name: "University of Cambridge",
      country: "UK",
      ranking: 3,
      acceptanceRate: "21%",
      tuition: "£33,825",
      programs: ["Computer Science", "Mathematics", "Natural Sciences"],
      requirements: ["A-Levels: A*A*A", "IELTS: 7.5+", "Interview Required"],
      matchScore: 88
    },
    {
      id: 4,
      name: "University of Toronto",
      country: "Canada",
      ranking: 18,
      acceptanceRate: "43%",
      tuition: "CAD $58,160",
      programs: ["Computer Science", "Engineering", "Mathematics"],
      requirements: ["High School: 85%+", "IELTS: 6.5+", "Strong Academic Record"],
      matchScore: 85
    },
    {
      id: 5,
      name: "Technical University of Munich",
      country: "Germany",
      ranking: 50,
      acceptanceRate: "34%",
      tuition: "€0 (Free)",
      programs: ["Computer Science", "Engineering", "Mathematics"],
      requirements: ["High School Diploma", "German B2", "Math/Physics Strong"],
      matchScore: 82
    }
  ];

  const handleSearch = () => {
    setIsLoading(true);
    
    // Simulate AI analysis based on user profile
    setTimeout(() => {
      let filtered = universities;
      
      // Filter by country
      if (searchCriteria.country) {
        filtered = filtered.filter(uni => 
          uni.country.toLowerCase().includes(searchCriteria.country.toLowerCase())
        );
      }
      
      // Filter by program
      if (searchCriteria.program) {
        filtered = filtered.filter(uni => 
          uni.programs.some(program => 
            program.toLowerCase().includes(searchCriteria.program.toLowerCase())
          )
        );
      }
      
      // Calculate match scores based on user profile
      const scored = filtered.map(uni => {
        let score = 70; // Base score
        
        // Check test scores match
        const userTestScores = userProfile.testScores;
        const hasGoodSAT = userTestScores.some(score => 
          score.test === "SAT" && parseInt(score.score) >= 1400
        );
        const hasGoodTOEFL = userTestScores.some(score => 
          score.test === "TOEFL" && parseInt(score.score) >= 100
        );
        
        if (hasGoodSAT) score += 10;
        if (hasGoodTOEFL) score += 10;
        
        // Check interests match
        const interestMatch = userProfile.interests.some(interest =>
          uni.programs.some(program => 
            program.toLowerCase().includes(interest.toLowerCase())
          )
        );
        if (interestMatch) score += 15;
        
        // Check GPA
        const gpa = parseFloat(userProfile.academicInfo.gpa);
        if (gpa >= 3.7) score += 10;
        else if (gpa >= 3.5) score += 5;
        
        return { ...uni, matchScore: Math.min(score, 100) };
      });
      
      // Sort by match score
      scored.sort((a, b) => b.matchScore - a.matchScore);
      
      setSuggestions(scored.slice(0, 5));
      setIsLoading(false);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                AI University Suggestions
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Search Criteria */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="country">Preferred Country</Label>
                <Input
                  id="country"
                  placeholder="e.g., USA, UK, Canada"
                  value={searchCriteria.country}
                  onChange={(e) => setSearchCriteria(prev => ({ ...prev, country: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="program">Program of Interest</Label>
                <Input
                  id="program"
                  placeholder="e.g., Computer Science"
                  value={searchCriteria.program}
                  onChange={(e) => setSearchCriteria(prev => ({ ...prev, program: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="budget">Budget Range</Label>
                <Input
                  id="budget"
                  placeholder="e.g., $50,000"
                  value={searchCriteria.budget}
                  onChange={(e) => setSearchCriteria(prev => ({ ...prev, budget: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="ranking">University Ranking</Label>
                <Input
                  id="ranking"
                  placeholder="e.g., Top 50"
                  value={searchCriteria.ranking}
                  onChange={(e) => setSearchCriteria(prev => ({ ...prev, ranking: e.target.value }))}
                />
              </div>
            </div>

            <Button onClick={handleSearch} className="w-full" disabled={isLoading}>
              {isLoading ? "Analyzing..." : "Get AI Suggestions"}
            </Button>

            {/* Results */}
            {suggestions.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Recommended Universities</h3>
                {suggestions.map((uni) => (
                  <Card key={uni.id} className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-lg">{uni.name}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            {uni.country}
                            <Star className="h-4 w-4" />
                            #{uni.ranking} World Ranking
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-sm">
                          {uni.matchScore}% Match
                        </Badge>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4 mt-4">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Acceptance: {uni.acceptanceRate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Tuition: {uni.tuition}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Programs: {uni.programs.length}</span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h5 className="font-medium mb-2">Available Programs:</h5>
                        <div className="flex flex-wrap gap-1">
                          {uni.programs.map((program, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {program}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4">
                        <h5 className="font-medium mb-2">Requirements:</h5>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {uni.requirements.map((req, index) => (
                            <li key={index}>• {req}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
