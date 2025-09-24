import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ExternalLink, Target, CheckCircle } from "lucide-react";

import { Exam } from "./types";

interface ExamProgressTrackerProps {
  exams: Exam[];
  onViewDetails: (exam: Exam) => void;
  examProgress?: {
    examProgress: number;
    examRegistrations: number;
    testScoresAdded: number;
    examRegistrationsProgress: number;
    testScoresProgress: number;
    maxRegistrations: number;
    maxTestScores: number;
  };
}

export const ExamProgressTracker = ({
  exams,
  onViewDetails,
  examProgress,
}: ExamProgressTrackerProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Exam Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {exams.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-slate-400" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 mb-1">
              No Exam Progress
            </h3>
            <p className="text-xs text-slate-600 mb-4">
              Start preparing for standardized tests to strengthen your
              applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-white"
              >
                <BookOpen className="h-3 w-3 mr-1" />
                Start Preparing
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Find Exams
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Overall Exam Progress */}
            {examProgress && (
              <div className="space-y-4 p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm">
                    Overall Exam Progress
                  </h4>
                  <span className="text-sm font-bold text-primary">
                    {examProgress.examProgress}%
                  </span>
                </div>
                <Progress value={examProgress.examProgress} className="h-2" />

                {/* Split Progress */}
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Target className="h-3 w-3 text-blue-600" />
                      <span className="font-medium">Exam Registrations</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">
                        {examProgress.examRegistrations}/
                        {examProgress.maxRegistrations}
                      </span>
                      <span className="font-medium text-blue-600">
                        {examProgress.examRegistrationsProgress}%
                      </span>
                    </div>
                    <Progress
                      value={examProgress.examRegistrationsProgress}
                      className="h-1"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <span className="font-medium">Test Scores Added</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">
                        {examProgress.testScoresAdded}/
                        {examProgress.maxTestScores}
                      </span>
                      <span className="font-medium text-green-600">
                        {examProgress.testScoresProgress}%
                      </span>
                    </div>
                    <Progress
                      value={examProgress.testScoresProgress}
                      className="h-1"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Individual Exam Progress */}
            {exams.map((exam, index) => (
              <div key={index} className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-sm">{exam.exam}</h4>
                    <p className="text-xs text-muted-foreground">
                      {exam.date} ({exam.daysLeft} days left)
                    </p>
                  </div>
                  <Badge
                    variant={
                      exam.status === "registered"
                        ? "default"
                        : exam.status === "preparing"
                          ? "secondary"
                          : "outline"
                    }
                    className="text-xs"
                  >
                    {exam.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{Math.round(exam.progress)}%</span>
                  </div>
                  <Progress value={Math.round(exam.progress)} className="h-2" />
                </div>
                <div className="flex justify-between items-center text-xs">
                  {exam.score ? (
                    <span className="text-primary font-medium">
                      Score: {exam.score}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">
                      Target: {exam.target}
                    </span>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onViewDetails(exam)}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Details
                  </Button>
                </div>
              </div>
            ))}
          </>
        )}
      </CardContent>
    </Card>
  );
};
