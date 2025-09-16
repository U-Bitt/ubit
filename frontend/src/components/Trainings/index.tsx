import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Clock,
  Users,
  Star,
  Play,
  BookOpen,
  Calendar,
  Filter,
} from "lucide-react";

export const Trainings = () => {
  const trainings = [
    {
      id: 1,
      title: "SAT Math Mastery",
      instructor: "Dr. Sarah Johnson",
      duration: "8 weeks",
      level: "Intermediate",
      rating: 4.8,
      students: 1250,
      price: "$199",
      description:
        "Master all SAT Math concepts with comprehensive practice and expert guidance.",
      topics: ["Algebra", "Geometry", "Trigonometry", "Data Analysis"],
      nextStart: "Dec 15, 2024",
      image: "/sat-math-course.jpg",
    },
    {
      id: 2,
      title: "TOEFL Speaking Excellence",
      instructor: "Prof. Michael Chen",
      duration: "6 weeks",
      level: "All Levels",
      rating: 4.9,
      students: 890,
      price: "$149",
      description:
        "Improve your TOEFL speaking skills with structured practice and feedback.",
      topics: [
        "Speaking Fluency",
        "Pronunciation",
        "Task Response",
        "Time Management",
      ],
      nextStart: "Dec 20, 2024",
      image: "/toefl-speaking-course.jpg",
    },
    {
      id: 3,
      title: "University Essay Writing",
      instructor: "Dr. Emily Rodriguez",
      duration: "10 weeks",
      level: "Advanced",
      rating: 4.7,
      students: 2100,
      price: "$299",
      description:
        "Craft compelling personal statements and essays that stand out to admissions officers.",
      topics: [
        "Personal Statement",
        "Supplemental Essays",
        "Storytelling",
        "Editing",
      ],
      nextStart: "Jan 5, 2025",
      image: "/essay-writing-course.jpg",
    },
    {
      id: 4,
      title: "Interview Preparation",
      instructor: "Ms. Lisa Wang",
      duration: "4 weeks",
      level: "All Levels",
      rating: 4.6,
      students: 750,
      price: "$99",
      description:
        "Prepare for university interviews with mock sessions and expert tips.",
      topics: [
        "Interview Techniques",
        "Common Questions",
        "Body Language",
        "Confidence Building",
      ],
      nextStart: "Dec 25, 2024",
      image: "/interview-prep-course.jpg",
    },
  ];

  const categories = [
    { name: "All Trainings", count: trainings.length },
    {
      name: "Test Prep",
      count: trainings.filter(
        t => t.title.includes("SAT") || t.title.includes("TOEFL")
      ).length,
    },
    {
      name: "Writing",
      count: trainings.filter(
        t => t.title.includes("Essay") || t.title.includes("Writing")
      ).length,
    },
    {
      name: "Interview",
      count: trainings.filter(t => t.title.includes("Interview")).length,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Training Programs
          </h1>
          <p className="text-muted-foreground">
            Enhance your skills with our comprehensive training programs
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search training programs..."
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              >
                All Levels
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              >
                Live Sessions
              </Badge>
            </div>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            {categories.map(category => (
              <TabsTrigger
                key={category.name}
                value={category.name.toLowerCase().replace(/\s+/g, "-")}
              >
                {category.name} ({category.count})
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trainings.map(training => (
                <Card
                  key={training.id}
                  className="hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative">
                    <div className="w-full h-48 bg-muted rounded-t-lg flex items-center justify-center">
                      <BookOpen className="h-16 w-16 text-muted-foreground" />
                    </div>
                    <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                      {training.level}
                    </Badge>
                  </div>

                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold mb-2">
                        {training.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        by {training.instructor}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {training.description}
                      </p>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{training.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{training.students} students</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">
                          {training.rating}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">
                        Topics Covered:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {training.topics.map((topic, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <span className="text-2xl font-bold text-primary">
                          {training.price}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>Next: {training.nextStart}</span>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full bg-primary hover:bg-primary/90">
                      <Play className="h-4 w-4 mr-2" />
                      Enroll Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {categories.slice(1).map(category => (
            <TabsContent
              key={category.name}
              value={category.name.toLowerCase().replace(/\s+/g, "-")}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trainings
                  .filter(training => {
                    if (category.name === "Test Prep") {
                      return (
                        training.title.includes("SAT") ||
                        training.title.includes("TOEFL")
                      );
                    } else if (category.name === "Writing") {
                      return (
                        training.title.includes("Essay") ||
                        training.title.includes("Writing")
                      );
                    } else if (category.name === "Interview") {
                      return training.title.includes("Interview");
                    }
                    return true;
                  })
                  .map(training => (
                    <Card
                      key={training.id}
                      className="hover:shadow-lg transition-all duration-300"
                    >
                      <div className="relative">
                        <div className="w-full h-48 bg-muted rounded-t-lg flex items-center justify-center">
                          <BookOpen className="h-16 w-16 text-muted-foreground" />
                        </div>
                        <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                          {training.level}
                        </Badge>
                      </div>

                      <CardContent className="p-6">
                        <div className="mb-4">
                          <h3 className="text-xl font-bold mb-2">
                            {training.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            by {training.instructor}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {training.description}
                          </p>
                        </div>

                        <div className="space-y-3 mb-4">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{training.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <span>{training.students} students</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">
                              {training.rating}
                            </span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <h4 className="text-sm font-medium mb-2">
                            Topics Covered:
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {training.topics.map((topic, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between items-center mb-4">
                          <div>
                            <span className="text-2xl font-bold text-primary">
                              {training.price}
                            </span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>Next: {training.nextStart}</span>
                            </div>
                          </div>
                        </div>

                        <Button className="w-full bg-primary hover:bg-primary/90">
                          <Play className="h-4 w-4 mr-2" />
                          Enroll Now
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-muted/30 rounded-lg p-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Can&apos;t Find What You&apos;re Looking For?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            We&apos;re constantly adding new training programs. Let us know what
            skills you&apos;d like to develop and we&apos;ll create a program
            for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Request Custom Training
            </Button>
            <Button size="lg" variant="outline">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};