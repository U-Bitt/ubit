import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

interface Task {
  task: string;
  dueDate: string;
  priority: string;
  completed: boolean;
}

interface UpcomingTasksProps {
  tasks: Task[];
}

export const UpcomingTasks = ({ tasks }: UpcomingTasksProps) => {
  return (
    <div className="mb-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Upcoming Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((task, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border transition-all hover:shadow-sm ${
                  task.completed
                    ? "bg-muted/30 border-muted"
                    : "bg-background border-border hover:border-primary/20"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      task.completed
                        ? "bg-green-500 text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {task.completed ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <span className="text-xs font-bold">{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm mb-1">{task.task}</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      Due: {task.dueDate}
                    </p>
                    <Badge
                      variant={
                        task.priority === "High"
                          ? "destructive"
                          : task.priority === "Medium"
                            ? "default"
                            : "secondary"
                      }
                      className="text-xs"
                    >
                      {task.priority}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
