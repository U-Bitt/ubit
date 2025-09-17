import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, CheckCircle, ArrowRight, Star, Users, Calendar, DollarSign } from "lucide-react";
import { useRouter } from "next/router";
import { universities } from "@/mockData/universities";
import { scholarships } from "@/mockData/scholarships";

export const Recommendations = () => {
  const router = useRouter();

  // Transform university mock data to match recommendations format
  const universityRecommendations = universities.map((uni, index) => ({
    id: uni.id,
    name: uni.name,
    location: uni.location,
    ranking: uni.ranking,
    students: "15,000+",
    tuition: uni.tuition,
    image: uni.image,
    matchScore: 85 + (index * 3), // Generate match scores
    reason: `Strong match for your academic profile and interests in ${uni.programs[0]}`,
    highlights: uni.programs.slice(0, 3),
    programs: uni.programs,
    deadline: uni.deadline
  }));

  // Transform scholarship mock data to match recommendations format
  const scholarshipRecommendations = scholarships.map((scholarship, index) => ({
    name: scholarship.title,
    university: scholarship.university,
    amount: scholarship.amount + "/year",
    requirements: scholarship.requirements,
    deadline: scholarship.deadline,
    match: 80 + (index * 2), // Generate match scores
    description: scholarship.description
  }));

  const programRecommendations = [
    {
      name: "Computer Science",
      field: "Technology",
      popularity: "Very Popular",
      jobGrowth: "+22%",
      avgSalary: "$110,000",
      description: "Study algorithms, programming, and computational theory",
      skills: [
        "Programming",
        "Algorithms",
        "Data Structures",
        "Software Engineering",
      ],
      careers: [
        "Software Engineer",
        "Data Scientist",
        "Product Manager",
        "Research Scientist",
      ],
    },
    {
      name: "Artificial Intelligence",
      field: "Technology",
      popularity: "Growing",
      jobGrowth: "+35%",
      avgSalary: "$125,000",
      description: "Focus on machine learning, neural networks, and AI systems",
      skills: ["Machine Learning", "Deep Learning", "Statistics", "Python"],
      careers: [
        "AI Engineer",
        "ML Engineer",
        "Research Scientist",
        "AI Product Manager",
      ],
    },
    {
      name: "Data Science",
      field: "Analytics",
      popularity: "Trending",
      jobGrowth: "+28%",
      avgSalary: "$95,000",
      description: "Combine statistics, programming, and domain expertise",
      skills: ["Statistics", "Python/R", "SQL", "Data Visualization"],
      careers: [
        "Data Scientist",
        "Data Analyst",
        "Business Intelligence",
        "Quantitative Analyst",
      ],
    },
  ];



  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Personalized Recommendations
          </h1>
          <p className="text-muted-foreground">
            AI-powered suggestions based on your profile and preferences. We show a diverse mix of universities that match your scores, including both top-tier and more accessible options.
          </p>
        </div>

        <Tabs defaultValue="universities" className="space-y-6">
          <TabsList>
            <TabsTrigger value="universities">Universities</TabsTrigger>
            <TabsTrigger value="programs">Programs</TabsTrigger>
            <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>

          <TabsContent value="universities" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {universityRecommendations.map((university, index) => (
                <Card
                  key={index}
                  className="relative h-96 overflow-hidden rounded-2xl hover:shadow-xl transition-all duration-300 group"
                >
                  {/* Background Image */}
                  <Image
                    src={university.image}
                    alt={university.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* 40% Opacity Shadow Overlay */}
                  <div className="absolute inset-0 bg-black opacity-40"></div>

                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                    {/* Top Section - University Info */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold mb-2 line-clamp-2">
                            {university.name}
                          </h3>
                          <div className="flex items-center gap-2 text-white/90 mb-2">
                            <MapPin className="h-4 w-4" />
                            <span>
                              {university.location}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-white/80">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4" />
                              <span>#{university.ranking}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <span>{university.students}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              <span>{university.tuition}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-white mb-1">
                            {university.matchScore}%
                          </div>
                          <div className="text-sm text-white/80">
                            Match Score
                          </div>
                        </div>
                      </div>

                      {/* Why it was matched for you */}
                      <div>
                        <h4 className="font-semibold mb-2 text-white">
                          Why it was matched for you:
                        </h4>
                        <div className="text-sm text-white/90">
                          <CheckCircle className="h-4 w-4 text-white inline mr-2" />
                          {university.reason}
                        </div>
                        {university.highlights && university.highlights.length > 0 && (
                          <div className="mt-2">
                            <div className="text-xs text-white/80">
                              Highlights: {university.highlights.slice(0, 2).join(", ")}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* University Info */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-sm mb-2 text-green-300">
                            Programs:
                          </h5>
                          <div className="text-xs text-white/80">
                            {university.programs ? university.programs.slice(0, 2).join(", ") : "Various programs available"}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm mb-2 text-blue-300">
                            Deadline:
                          </h5>
                          <div className="text-xs text-white/80 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {university.deadline || "Check website"}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Section - Actions and Deadline */}
                    <div className="space-y-4">
                      <div className="text-sm text-white/90">
                        <span>Application Deadline: </span>
                        <span className="font-medium text-white">
                          {university.deadline}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-white/20 text-white border-white/30 hover:bg-white/30 hover:text-white"
                        >
                          Apply Now
                        </Button>
                        <Button
                          size="sm"
                          className="bg-white text-black hover:bg-white/90"
                          onClick={() => router.push(`/universityDetail/${university.id}`)}
                        >
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="programs" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programRecommendations.map((program, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">
                          {program.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {program.field}
                        </p>
                      </div>
                      <Badge variant="secondary">{program.popularity}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {program.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Job Growth</p>
                        <p className="font-semibold text-green-600">
                          {program.jobGrowth}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Avg Salary</p>
                        <p className="font-semibold">{program.avgSalary}</p>
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium text-sm mb-2">Skills:</h5>
                      <div className="flex flex-wrap gap-1">
                        {program.skills.map((skill, skillIndex) => (
                          <Badge
                            key={skillIndex}
                            variant="outline"
                            className="text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium text-sm mb-2">
                        Career Paths:
                      </h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {program.careers
                          .slice(0, 3)
                          .map((career, careerIndex) => (
                            <li key={careerIndex}>• {career}</li>
                          ))}
                      </ul>
                    </div>

                    <Button className="w-full bg-primary hover:bg-primary/90">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="scholarships" className="space-y-6">
            <div className="grid gap-6">
              {scholarshipRecommendations.map((scholarship, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-1">
                          {scholarship.name}
                        </h3>
                        <p className="text-muted-foreground mb-2">
                          {scholarship.university}
                        </p>
                        <p className="text-sm">{scholarship.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary mb-1">
                          {scholarship.amount}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          per year
                        </div>
                        <Badge variant="secondary" className="mt-2">
                          {scholarship.match}% match
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium text-sm mb-2">
                          Requirements:
                        </h5>
                        <ul className="space-y-1">
                          {scholarship.requirements.map(
                            (requirement, reqIndex) => (
                              <li
                                key={reqIndex}
                                className="flex items-center gap-2 text-sm"
                              >
                                <CheckCircle className="h-4 w-4 text-primary" />
                                {requirement}
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t">
                        <div className="text-sm">
                          <span className="text-muted-foreground">
                            Deadline:{" "}
                          </span>
                          <span className="font-medium">
                            {scholarship.deadline}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Save
                          </Button>
                          <Button
                            size="sm"
                            className="bg-primary hover:bg-primary/90"
                          >
                            Apply Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Application Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-3 h-3 bg-primary rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold">
                        December 2024 - Test Preparation
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Focus on SAT retake and TOEFL preparation
                      </p>
                      <div className="mt-2">
                        <Progress value={75} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">
                          75% complete
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold">
                        January 2025 - Application Submission
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Submit all university applications with documents
                      </p>
                      <div className="mt-2">
                        <Progress value={30} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">
                          30% complete
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-3 h-3 bg-muted-foreground rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold">
                        March 2025 - Decision Phase
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Receive admission decisions and compare offers
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-3 h-3 bg-muted-foreground rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold">
                        April 2025 - Final Decision
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Choose university and begin visa process
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
