import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, BookOpen, Clock, Target, ExternalLink } from "lucide-react";

interface ExamCardProps {
  exam: {
    id: string;
    name: string;
    fullName: string;
    sections: string[];
    nextDate: string;
    preparation: string;
    difficulty: string;
    category?: string;
    website?: string;
    registrationUrl?: string;
  };
  onRegister?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

export default function ExamCard({
  exam,
  onRegister,
  onViewDetails,
}: ExamCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{exam.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{exam.fullName}</p>
            {exam.category && (
              <Badge variant="outline" className="mt-1 text-xs">
                {exam.category}
              </Badge>
            )}
          </div>
          <Badge variant={getDifficultyColor(exam.difficulty)}>
            {exam.difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium mb-2">Sections:</p>
          <div className="flex flex-wrap gap-1">
            {exam.sections.map((section, sectionIndex) => (
              <Badge key={sectionIndex} variant="outline" className="text-xs">
                {section}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Next Test Date
            </span>
            <span className="font-medium">{exam.nextDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Prep Time Needed
            </span>
            <span className="font-medium">{exam.preparation}</span>
          </div>
        </div>

        <div className="space-y-2">
          <Button
            size="sm"
            className="w-full bg-primary hover:bg-primary/90"
            onClick={() => {
              if (exam.registrationUrl) {
                window.open(exam.registrationUrl, '_blank');
              } else {
                onRegister?.(exam.id);
              }
            }}
          >
            <Target className="h-4 w-4 mr-2" />
            Register for {exam.name}
          </Button>
          <div className="flex gap-2">
            {exam.website && (
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => window.open(exam.website, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Official Website
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => onViewDetails?.(exam.id)}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Study Plan
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
