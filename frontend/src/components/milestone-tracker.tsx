import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Circle } from "lucide-react";

type Milestone = {
  id: string;
  title: string;
  description: string;
  status: "completed" | "current" | "upcoming";
  date: string;
  category: string;
};

type MilestoneTrackerProps = {
  milestones: Milestone[];
};

export const MilestoneTracker = ({ milestones }: MilestoneTrackerProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-primary" />;
      case "current":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "upcoming":
        return <Circle className="h-5 w-5 text-muted-foreground" />;
      default:
        return <Circle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-primary text-primary-foreground";
      case "current":
        return "bg-yellow-500 text-white";
      case "upcoming":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Application Milestones
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {milestones.map((milestone, index) => (
          <div key={milestone.id} className="relative">
            {/* Timeline line */}
            {index < milestones.length - 1 && (
              <div className="absolute left-2.5 top-8 w-0.5 h-16 bg-border" />
            )}

            <div className="flex items-start gap-3">
              <div
                className={`rounded-full p-1 ${getStatusColor(milestone.status)}`}
              >
                {getStatusIcon(milestone.status)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-sm">{milestone.title}</h4>
                  <Badge variant="outline" className="text-xs">
                    {milestone.category}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  {milestone.description}
                </p>
                <p className="text-xs font-medium">{milestone.date}</p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
