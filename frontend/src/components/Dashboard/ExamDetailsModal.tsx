import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Calendar,
  CheckCircle,
  FileText,
  Clock,
  Target,
  ExternalLink,
  X,
  MapPin,
  BarChart3,
  TrendingUp,
} from "lucide-react";

import { Exam, Section, PracticeTest, StudyTopic, Resource } from "./types";

interface ExamDetailsModalProps {
  exam: Exam | null;
  isOpen: boolean;
  onClose: () => void;
  onExternalLink: (url: string) => void;
  getExamOfficialWebsite: (exam: string) => string;
}

export const ExamDetailsModal = ({
  exam,
  isOpen,
  onClose,
  onExternalLink,
  getExamOfficialWebsite,
}: ExamDetailsModalProps) => {
  if (!isOpen || !exam) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{exam.exam}</h2>
                <p className="text-lg text-muted-foreground">{exam.fullName}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge
                    variant={
                      exam.status === "registered"
                        ? "default"
                        : exam.status === "preparing"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {exam.status}
                  </Badge>
                  <Badge variant="outline">{exam.daysLeft} days left</Badge>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-8">
          {/* Exam Overview */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Exam Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Date: {exam.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{exam.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Duration: {exam.duration}</span>
                </div>
                {exam.registrationId && (
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">ID: {exam.registrationId}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Score & Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">
                      Overall Progress
                    </span>
                    <span className="text-sm font-bold">{Math.round(exam.progress)}%</span>
                  </div>
                  <Progress value={Math.round(exam.progress)} className="h-3" />
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {exam.score || "N/A"}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Current Score
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {exam.target}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Target Score
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Section Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Section Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {exam.sections.map((section: Section, index: number) => (
                  <div key={index} className="p-4 rounded-lg border">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-sm">{section.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {Math.round(section.progress)}%
                      </Badge>
                    </div>
                    <Progress value={Math.round(section.progress)} className="h-2 mb-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Score: {section.score || "N/A"}</span>
                      <span>Target: {section.target}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Practice Test History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Practice Test History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {exam.practiceTests.map((test: PracticeTest, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-600">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-sm">{test.date}</div>
                        <div className="text-xs text-muted-foreground">
                          Improvement: {test.improvement}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">{test.score}</div>
                      <div className="text-xs text-muted-foreground">Score</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Study Plan */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Study Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {exam.studyPlan.map((topic: StudyTopic, index: number) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg border"
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        topic.status === "completed"
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {topic.status === "completed" ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <span className="text-xs font-bold">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <span
                        className={`font-medium text-sm ${
                          topic.status === "completed"
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {topic.topic}
                      </span>
                    </div>
                    <Badge
                      variant={
                        topic.priority === "high"
                          ? "destructive"
                          : topic.priority === "medium"
                            ? "default"
                            : "secondary"
                      }
                      className="text-xs"
                    >
                      {topic.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Study Resources */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Study Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {exam.resources.map((resource: Resource, index: number) => (
                  <div key={index} className="p-4 rounded-lg border">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-sm">{resource.name}</h4>
                      <Badge
                        variant={
                          resource.status === "active"
                            ? "default"
                            : resource.status === "completed"
                              ? "secondary"
                              : resource.status === "in-progress"
                                ? "outline"
                                : "outline"
                        }
                        className="text-xs"
                      >
                        {resource.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      Type: {resource.type}
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full"
                      onClick={() => onExternalLink(resource.url)}
                    >
                      <ExternalLink className="h-3 w-3 mr-2" />
                      Access Resource
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-center pt-4 border-t">
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 min-w-[200px]"
              onClick={() => onExternalLink(getExamOfficialWebsite(exam.exam))}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Official Website
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
