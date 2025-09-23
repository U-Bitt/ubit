import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ExternalLink } from "lucide-react";

import { Exam } from "./types";

interface ExamProgressTrackerProps {
  exams: Exam[];
  onViewDetails: (exam: Exam) => void;
}

export const ExamProgressTracker = ({
  exams,
  onViewDetails,
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
                <span className="text-green-600 font-medium">
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
      </CardContent>
    </Card>
  );
};
