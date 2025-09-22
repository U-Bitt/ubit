import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";

interface Deadline {
  id: number;
  title: string;
  deadline: string;
  daysLeft: number;
  priority: string;
  type: string;
}

interface UpcomingDeadlinesProps {
  deadlines: Deadline[];
}

export const UpcomingDeadlines = ({ deadlines }: UpcomingDeadlinesProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Upcoming Deadlines
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {deadlines.map(deadline => (
          <div
            key={deadline.id}
            className={`p-4 rounded-lg border-l-4 ${
              deadline.priority === "critical"
                ? "border-red-500 bg-red-50"
                : deadline.priority === "high"
                  ? "border-orange-500 bg-orange-50"
                  : "border-blue-500 bg-blue-50"
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-sm">{deadline.title}</h4>
                <p className="text-xs text-muted-foreground">
                  Due: {deadline.deadline}
                </p>
              </div>
              <div className="text-right">
                <Badge
                  variant={
                    deadline.priority === "critical"
                      ? "destructive"
                      : deadline.priority === "high"
                        ? "default"
                        : "secondary"
                  }
                  className="text-xs"
                >
                  {deadline.daysLeft} days left
                </Badge>
                <p className="text-xs text-muted-foreground mt-1 capitalize">
                  {deadline.type}
                </p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
