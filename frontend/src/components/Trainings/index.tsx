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
  Globe,
  Award,
  Video,
  Book,
  Zap,
} from "lucide-react";
import { trainings, categories, Training } from "@/mockData/trainings";
import { useState } from "react";

export const Trainings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [showLiveOnly, setShowLiveOnly] = useState(false);

  const filteredTrainings = trainings.filter(training => {
    const matchesSearch = training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         training.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         training.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = !selectedLevel || training.level === selectedLevel;
    const matchesLive = !showLiveOnly || training.isLive;
    
    return matchesSearch && matchesLevel && matchesLive;
  });

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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <div className="flex gap-2">
                {["All Levels", "Beginner", "Intermediate", "Advanced"].map(level => (
                  <Badge
                    key={level}
                    variant={selectedLevel === level || (level === "All Levels" && !selectedLevel) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    onClick={() => setSelectedLevel(level === "All Levels" ? null : level)}
                  >
                    {level}
                  </Badge>
                ))}
              </div>
              <Badge
                variant={showLiveOnly ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                onClick={() => setShowLiveOnly(!showLiveOnly)}
              >
                <Video className="h-3 w-3 mr-1" />
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
              {filteredTrainings.map(training => (
                <Card
                  key={training.id}
                  className="hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative">
                    <div className="w-full h-48 bg-muted rounded-t-lg flex items-center justify-center">
                      <BookOpen className="h-16 w-16 text-muted-foreground" />
                    </div>
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <Badge className="bg-primary text-primary-foreground">
                        {training.level}
                      </Badge>
                      {training.isLive && (
                        <Badge variant="destructive" className="flex items-center gap-1">
                          <Video className="h-3 w-3" />
                          Live
                        </Badge>
                      )}
                      {training.certificate && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Award className="h-3 w-3" />
                          Certificate
                        </Badge>
                      )}
                    </div>
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
                        <div className="flex items-center gap-1">
                          <Globe className="h-4 w-4" />
                          <span>{training.language}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">
                            {training.rating}
                          </span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {training.category}
                        </Badge>
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
                {filteredTrainings
                  .filter(training => training.category === category.name)
                  .map(training => (
                    <Card
                      key={training.id}
                      className="hover:shadow-lg transition-all duration-300"
                    >
                      <div className="relative">
                        <div className="w-full h-48 bg-muted rounded-t-lg flex items-center justify-center">
                          <BookOpen className="h-16 w-16 text-muted-foreground" />
                        </div>
                        <div className="absolute top-4 right-4 flex flex-col gap-2">
                          <Badge className="bg-primary text-primary-foreground">
                            {training.level}
                          </Badge>
                          {training.isLive && (
                            <Badge variant="destructive" className="flex items-center gap-1">
                              <Video className="h-3 w-3" />
                              Live
                            </Badge>
                          )}
                          {training.certificate && (
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <Award className="h-3 w-3" />
                              Certificate
                            </Badge>
                          )}
                        </div>
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
                            <div className="flex items-center gap-1">
                              <Globe className="h-4 w-4" />
                              <span>{training.language}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">
                                {training.rating}
                              </span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {training.category}
                            </Badge>
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