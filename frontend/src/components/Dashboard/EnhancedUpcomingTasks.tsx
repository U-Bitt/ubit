import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Task } from "./types";
import { 
  CheckSquare, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Calendar,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  Flag,
  Target
} from "lucide-react";

interface EnhancedUpcomingTasksProps {
  tasks: Task[];
}

export const EnhancedUpcomingTasks = ({ tasks }: EnhancedUpcomingTasksProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return <AlertTriangle className="h-3 w-3" />;
      case "medium":
        return <Clock className="h-3 w-3" />;
      case "low":
        return <CheckCircle className="h-3 w-3" />;
      default:
        return <Flag className="h-3 w-3" />;
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getUrgencyColor = (daysLeft: number, priority: string) => {
    if (daysLeft <= 0) return "text-red-600 font-bold";
    if (daysLeft <= 1 && priority.toLowerCase() === "high") return "text-red-600 font-bold";
    if (daysLeft <= 3 && priority.toLowerCase() === "high") return "text-orange-600 font-semibold";
    if (daysLeft <= 7) return "text-yellow-600 font-medium";
    return "text-slate-600";
  };

  const getUrgencyText = (daysLeft: number) => {
    if (daysLeft < 0) return "Overdue";
    if (daysLeft === 0) return "Due today";
    if (daysLeft === 1) return "Due tomorrow";
    if (daysLeft <= 7) return `${daysLeft} days left`;
    return `${Math.ceil(daysLeft / 7)} weeks left`;
  };

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-red-500">
              <CheckSquare className="h-5 w-5 text-white" />
            </div>
            Upcoming Tasks
          </CardTitle>
          <Button size="sm" variant="outline" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Task
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {tasks.length === 0 ? (
          <div className="text-center py-8">
            <CheckSquare className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600 mb-2">No upcoming tasks</p>
            <p className="text-sm text-slate-500">You&apos;re all caught up!</p>
          </div>
        ) : (
          tasks.map((task, index) => {
            const daysLeft = getDaysUntilDue(task.dueDate);
            const isOverdue = daysLeft < 0;
            const isUrgent = daysLeft <= 3 && task.priority.toLowerCase() === "high";
            
            return (
              <div 
                key={index} 
                className={`group p-4 rounded-lg border transition-all duration-300 ${
                  task.completed 
                    ? "border-green-200 bg-green-50/50" 
                    : isOverdue 
                      ? "border-red-200 bg-red-50/50 hover:border-red-300" 
                      : isUrgent 
                        ? "border-orange-200 bg-orange-50/50 hover:border-orange-300"
                        : "border-slate-200 bg-white/50 hover:border-orange-300 hover:bg-white/80"
                } hover:shadow-md`}
              >
                <div className="flex items-start gap-3">
                  <Checkbox 
                    checked={task.completed}
                    className="mt-1"
                    disabled={task.completed}
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className={`font-semibold transition-colors duration-300 ${
                        task.completed 
                          ? "text-green-700 line-through" 
                          : "text-slate-900 group-hover:text-orange-600"
                      }`}>
                        {task.task}
                      </h4>
                      <div className="flex items-center gap-2">
                        <Badge className={`${getPriorityColor(task.priority)} flex items-center gap-1 text-xs`}>
                          {getPriorityIcon(task.priority)}
                          {task.priority}
                        </Badge>
                        <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-1">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-3 w-3 text-slate-400" />
                          <span className="text-slate-600">Due: {task.dueDate}</span>
                        </div>
                        <div className={`text-sm font-medium ${getUrgencyColor(daysLeft, task.priority)}`}>
                          {getUrgencyText(daysLeft)}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {!task.completed && (
                          <>
                            <Button size="sm" variant="outline" className="gap-1 text-xs">
                              <Edit className="h-3 w-3" />
                              Edit
                            </Button>
                            <Button size="sm" variant="ghost" className="gap-1 text-xs text-red-600 hover:text-red-700">
                              <Trash2 className="h-3 w-3" />
                              Delete
                            </Button>
                          </>
                        )}
                        {task.completed && (
                          <div className="flex items-center gap-1 text-green-600 text-sm">
                            <CheckCircle className="h-4 w-4" />
                            <span className="font-medium">Completed</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Progress indicator for urgent tasks */}
                    {isUrgent && !task.completed && (
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-slate-600 mb-1">
                          <span>Time remaining</span>
                          <span>{daysLeft} days</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1.5">
                          <div 
                            className="bg-gradient-to-r from-orange-500 to-red-500 h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${Math.max(0, 100 - (daysLeft / 7) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}

        {/* Task summary */}
        {tasks.length > 0 && (
          <div className="pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between text-sm text-slate-600 mb-3">
              <span>Task Summary</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>{tasks.filter(t => t.completed).length} completed</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-orange-500" />
                  <span>{tasks.filter(t => !t.completed).length} pending</span>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full gap-2 hover:bg-slate-50">
              <Target className="h-4 w-4" />
              View All Tasks
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
