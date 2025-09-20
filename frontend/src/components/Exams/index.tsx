import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Calendar,
  Target,
  TrendingUp,
  CheckCircle,
  Download,
  Play,
  ExternalLink,
} from "lucide-react";

export const Exams = () => {
  const exams = [
    {
      name: "SAT",
      fullName: "Scholastic Assessment Test",
      sections: ["Reading", "Writing", "Math"],
      nextDate: "Dec 7, 2024",
      preparation: "3-6 months",
      difficulty: "High",
      website: "https://satsuite.collegeboard.org/sat",
      registrationUrl: "https://satsuite.collegeboard.org/sat/registration",
      seatSelectionUrl: "https://satsuite.collegeboard.org/sat/registration/test-center-search",
    },
    {
      name: "TOEFL",
      fullName: "Test of English as a Foreign Language",
      sections: ["Reading", "Listening", "Speaking", "Writing"],
      nextDate: "Dec 14, 2024",
      preparation: "2-4 months",
      difficulty: "Medium",
      website: "https://www.ets.org/toefl",
      registrationUrl: "https://www.ets.org/toefl/test-takers/ibt/register",
      seatSelectionUrl: "https://www.ets.org/toefl/test-takers/ibt/register/centers-dates",
    },
    {
      name: "IELTS",
      fullName: "International English Language Testing System",
      sections: ["Reading", "Listening", "Speaking", "Writing"],
      nextDate: "Dec 21, 2024",
      preparation: "2-4 months",
      difficulty: "Medium",
      website: "https://www.ielts.org",
      registrationUrl: "https://www.ielts.org/book-a-test",
      seatSelectionUrl: "https://www.ielts.org/book-a-test/find-a-test-location",
    },
    {
      name: "GRE",
      fullName: "Graduate Record Examinations",
      sections: ["Verbal", "Quantitative", "Analytical Writing"],
      nextDate: "Jan 4, 2025",
      preparation: "4-6 months",
      difficulty: "High",
      website: "https://www.ets.org/gre",
      registrationUrl: "https://www.ets.org/gre/test-takers/general-test/register",
      seatSelectionUrl: "https://www.ets.org/gre/test-takers/general-test/register/centers-dates",
    },
  ];

  const myExams = [
    {
      name: "SAT",
      date: "Dec 7, 2024",
      status: "Scheduled",
      targetScore: "1500",
      currentPrep: 75,
      lastScore: null,
      website: "https://satsuite.collegeboard.org/sat",
      seatSelectionUrl: "https://satsuite.collegeboard.org/sat/registration/test-center-search",
    },
    {
      name: "TOEFL",
      date: "Dec 14, 2024",
      status: "Completed",
      targetScore: "110",
      currentPrep: 100,
      lastScore: "108",
      website: "https://www.ets.org/toefl",
      seatSelectionUrl: "https://www.ets.org/toefl/test-takers/ibt/register/centers-dates",
    },
  ];

  const studyPlans = [
    {
      week: "Week 1-2",
      focus: "Foundation Review",
      exam: "SAT",
      completed: true,
      tasks: [
        "Complete diagnostic test",
        "Review basic math concepts",
        "Practice reading comprehension",
      ],
    },
    {
      week: "Week 3-4",
      focus: "Practice Tests",
      exam: "SAT",
      completed: true,
      tasks: [
        "Take 2 full practice tests",
        "Analyze weak areas",
        "Focus on time management",
      ],
    },
    {
      week: "Week 5-6",
      focus: "Advanced Strategies",
      exam: "SAT",
      completed: false,
      tasks: [
        "Learn advanced math techniques",
        "Practice essay writing",
        "Review grammar rules",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Standardized Exams
          </h1>
          <p className="text-muted-foreground">
            Track your exam preparation and scores for university admissions
          </p>
        </div>

        <Tabs defaultValue="available" className="space-y-6">
          <TabsList>
            <TabsTrigger value="available">Available Exams</TabsTrigger>
            <TabsTrigger value="my-exams">My Exams</TabsTrigger>
            <TabsTrigger value="study-plans">Study Plans</TabsTrigger>
            <TabsTrigger value="practice">Practice Tests</TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {exams.map((exam, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{exam.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {exam.fullName}
                        </p>
                      </div>
                      <Badge
                        variant={
                          exam.difficulty === "High"
                            ? "destructive"
                            : exam.difficulty === "Medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {exam.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Sections:</p>
                      <div className="flex flex-wrap gap-1">
                        {exam.sections.map((section, sectionIndex) => (
                          <Badge
                            key={sectionIndex}
                            variant="outline"
                            className="text-xs"
                          >
                            {section}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Next Test Date
                        </span>
                        <span className="font-medium">{exam.nextDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Prep Time Needed
                        </span>
                        <span className="font-medium">{exam.preparation}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button 
                        className="w-full bg-primary hover:bg-primary/90"
                        onClick={() => window.open(exam.registrationUrl, '_blank')}
                      >
                        <Target className="h-4 w-4 mr-2" />
                        Register for {exam.name}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => window.open(exam.website, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Official Website
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-exams" className="space-y-6">
            <div className="space-y-6">
              {myExams.map((exam, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-semibold">{exam.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Test Date: {exam.date}
                        </p>
                      </div>
                      <Badge
                        variant={
                          exam.status === "Completed" ? "default" : "secondary"
                        }
                      >
                        {exam.status}
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Target Score
                        </p>
                        <p className="text-xl font-bold text-primary">
                          {exam.targetScore}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Preparation Progress
                        </p>
                        <div className="space-y-2">
                          <Progress value={exam.currentPrep} className="h-2" />
                          <p className="text-sm font-medium">
                            {exam.currentPrep}% Complete
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Last Score
                        </p>
                        <p className="text-xl font-bold text-secondary">
                          {exam.lastScore || "Not taken"}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-transparent flex-1"
                          onClick={() => window.open(exam.website, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Official Website
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-transparent flex-1"
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Reschedule
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-transparent flex-1"
                        >
                          <BookOpen className="h-4 w-4 mr-2" />
                          Study Plan
                        </Button>
                        {exam.lastScore && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-transparent flex-1"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Score Report
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="study-plans" className="space-y-6">
            <div className="space-y-4">
              {studyPlans.map((plan, index) => (
                <Card
                  key={index}
                  className={plan.completed ? "bg-muted/50" : ""}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            plan.completed
                              ? "bg-green-500 text-white"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {plan.completed ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <span className="text-sm font-bold">
                              {index + 1}
                            </span>
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold">
                            {plan.week}: {plan.focus}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {plan.exam} Preparation
                          </p>
                        </div>
                      </div>
                    </div>

                    <ul className="text-sm text-muted-foreground space-y-1">
                      {plan.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          {task}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="practice" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    SAT Practice Test
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Full-length practice tests for all major exams
                  </p>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    <Play className="h-4 w-4 mr-2" />
                    Start Practice Test
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    TOEFL Practice
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Practice all four sections of the TOEFL exam
                  </p>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    <Play className="h-4 w-4 mr-2" />
                    Start Practice
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Progress Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Track your improvement over time
                  </p>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};