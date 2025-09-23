import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, AlertCircle, Plus } from "lucide-react";

type ProgressItem = {
  name: string;
  progress: number;
  status: "completed" | "in-progress" | "pending";
  deadline: string;
  priority?: "high" | "medium" | "low";
};

type ProgressTrackerProps = {
  title: string;
  items: ProgressItem[];
  showActions?: boolean;
};

export const ProgressTracker = ({
  title,
  items,
  showActions = false,
}: ProgressTrackerProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-primary" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "pending":
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
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
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{title}</CardTitle>
          {showActions && (
            <Button size="sm" variant="outline" className="bg-transparent">
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getStatusIcon(item.status)}
                <span className="font-medium text-sm">{item.name}</span>
                {item.priority && (
                  <Badge
                    variant={getPriorityColor(item.priority)}
                    className="text-xs"
                  >
                    {item.priority}
                  </Badge>
                )}
              </div>
              <span className="text-xs text-muted-foreground">
                {item.deadline}
              </span>
            </div>
            <div className="space-y-2">
              <Progress value={Math.round(item.progress)} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{Math.round(item.progress)}% complete</span>
                <span>{item.status}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
