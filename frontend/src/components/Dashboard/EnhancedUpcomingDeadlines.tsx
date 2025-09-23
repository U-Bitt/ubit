import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Deadline } from "./types";
import { 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  FileText, 
  BookOpen,
  ChevronRight,
  Bell,
  ExternalLink,
  Plus
} from "lucide-react";

interface EnhancedUpcomingDeadlinesProps {
  deadlines: Deadline[];
}

export const EnhancedUpcomingDeadlines = ({ deadlines }: EnhancedUpcomingDeadlinesProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
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
      case "critical":
        return <AlertTriangle className="h-4 w-4" />;
      case "high":
        return <Clock className="h-4 w-4" />;
      case "medium":
        return <Calendar className="h-4 w-4" />;
      case "low":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "application":
        return <FileText className="h-4 w-4" />;
      case "exam":
        return <BookOpen className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const getDaysLeftColor = (daysLeft: number) => {
    if (daysLeft <= 3) return "text-red-600 font-bold";
    if (daysLeft <= 7) return "text-orange-600 font-semibold";
    if (daysLeft <= 14) return "text-yellow-600 font-medium";
    return "text-green-600";
  };

  const getDaysLeftText = (daysLeft: number) => {
    if (daysLeft === 0) return "Today";
    if (daysLeft === 1) return "Tomorrow";
    if (daysLeft < 7) return `${daysLeft} days`;
    if (daysLeft < 30) return `${Math.ceil(daysLeft / 7)} weeks`;
    return `${Math.ceil(daysLeft / 30)} months`;
  };

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 rounded-lg bg-gradient-to-br from-red-500 to-orange-500">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            Upcoming Deadlines
          </CardTitle>
          <Button size="sm" variant="outline" className="gap-2">
            <Bell className="h-4 w-4" />
            Set Alert
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {deadlines.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600 mb-2">No upcoming deadlines</p>
            <p className="text-sm text-slate-500">You&apos;re all caught up!</p>
          </div>
        ) : (
          deadlines.map((deadline, index) => (
            <div 
              key={index} 
              className="group p-4 rounded-lg border border-slate-200 hover:border-red-300 hover:shadow-md transition-all duration-300 bg-white/50 hover:bg-white/80"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-red-50 transition-colors duration-300">
                    {getTypeIcon(deadline.type)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 group-hover:text-red-600 transition-colors duration-300">
                      {deadline.title}
                    </h4>
                    <p className="text-sm text-slate-600">{deadline.deadline}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`${getPriorityColor(deadline.priority)} flex items-center gap-1`}>
                    {getPriorityIcon(deadline.priority)}
                    {deadline.priority}
                  </Badge>
                  <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className={`text-2xl font-bold ${getDaysLeftColor(deadline.daysLeft)}`}>
                      {deadline.daysLeft}
                    </p>
                    <p className="text-xs text-slate-500">days left</p>
                  </div>
                  <div className="text-sm text-slate-600">
                    <p className="font-medium">{getDaysLeftText(deadline.daysLeft)}</p>
                    <p className="text-slate-500">until deadline</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="gap-2">
                    <ExternalLink className="h-3 w-3" />
                    View
                  </Button>
                  {deadline.priority === "critical" && (
                    <Button size="sm" variant="destructive" className="gap-2">
                      <AlertTriangle className="h-3 w-3" />
                      Urgent
                    </Button>
                  )}
                </div>
              </div>

              {/* Progress bar for urgency */}
              {deadline.priority === "critical" && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-slate-600 mb-1">
                    <span>Time remaining</span>
                    <span>{deadline.daysLeft} days</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.max(0, 100 - (deadline.daysLeft / 30) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}

        {/* Add deadline button */}
        <div className="pt-4 border-t border-slate-200">
          <Button variant="outline" className="w-full gap-2 hover:bg-slate-50">
            <Plus className="h-4 w-4" />
            Add Deadline
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
