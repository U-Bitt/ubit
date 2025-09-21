import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, ChevronDown, ChevronUp, Calendar, AlertCircle } from "lucide-react";
import { useState } from "react";

interface DetailedMilestone {
  id: string;
  title: string;
  description: string;
  status: "completed" | "current" | "upcoming";
  date: string;
  category: string;
  steps: string[];
  completedSteps: number;
  totalSteps: number;
  priority: "high" | "medium" | "low";
  estimatedTime: string;
  tips?: string[];
}

interface DetailedMilestoneTrackerProps {
  milestones: DetailedMilestone[];
  onStepComplete?: (milestoneId: string, stepIndex: number) => void;
  onMilestoneComplete?: (milestoneId: string) => void;
  onStepUncomplete?: (milestoneId: string, stepIndex: number) => void;
  onMilestoneUncomplete?: (milestoneId: string) => void;
}

export const DetailedMilestoneTracker = ({ 
  milestones, 
  onStepComplete, 
  onMilestoneComplete,
  onStepUncomplete,
  onMilestoneUncomplete
}: DetailedMilestoneTrackerProps) => {
  const [expandedMilestones, setExpandedMilestones] = useState<Set<string>>(new Set());

  const toggleExpanded = (milestoneId: string) => {
    const newExpanded = new Set(expandedMilestones);
    if (newExpanded.has(milestoneId)) {
      newExpanded.delete(milestoneId);
    } else {
      newExpanded.add(milestoneId);
    }
    setExpandedMilestones(newExpanded);
  };


  const getPriorityColor = (priority: string) => {
    switch (priority) {
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

  const getDaysUntilDeadline = (date: string) => {
    const today = new Date();
    const deadline = new Date(date);
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          University Application Milestones
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {milestones.map((milestone, index) => {
          const isExpanded = expandedMilestones.has(milestone.id);
          const daysUntil = getDaysUntilDeadline(milestone.date);
          const isOverdue = daysUntil < 0;
          const isUrgent = daysUntil <= 7 && daysUntil >= 0;

          return (
            <div key={milestone.id} className="relative">
              {/* Timeline line */}
              {index < milestones.length - 1 && (
                <div className="absolute left-4 top-16 w-0.5 h-24 bg-gray-200" />
              )}

              <div className="flex items-start gap-4">
                {/* Status Icon */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  milestone.status === "completed" 
                    ? "bg-green-500 text-white" 
                    : milestone.status === "current"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}>
                  {milestone.status === "completed" ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : milestone.status === "current" ? (
                    <Clock className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-bold">{index + 1}</span>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`font-semibold text-lg ${
                      milestone.status === "completed" 
                        ? "text-green-700" 
                        : milestone.status === "current"
                        ? "text-blue-700"
                        : "text-gray-600"
                    }`}>
                      {milestone.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={milestone.status === "completed" ? "default" : milestone.status === "current" ? "secondary" : "outline"}
                        className="text-xs"
                      >
                        {milestone.category}
                      </Badge>
                      <Badge 
                        variant="outline"
                        className={`text-xs ${getPriorityColor(milestone.priority)}`}
                      >
                        {milestone.priority === "high" ? "High" : milestone.priority === "medium" ? "Medium" : "Low"}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">
                    {milestone.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Steps: {milestone.completedSteps}/{milestone.totalSteps}</span>
                      <span>{Math.round((milestone.completedSteps / milestone.totalSteps) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          milestone.status === "completed" 
                            ? "bg-green-500" 
                            : milestone.status === "current"
                            ? "bg-blue-500"
                            : "bg-gray-300"
                        }`}
                        style={{ width: `${(milestone.completedSteps / milestone.totalSteps) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Date and Time Info */}
                  <div className="flex items-center gap-4 mb-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>Date: {new Date(milestone.date).toLocaleDateString('en-US')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>Duration: {milestone.estimatedTime}</span>
                    </div>
                    {isOverdue && (
                      <div className="flex items-center gap-1 text-red-600">
                        <AlertCircle className="h-3 w-3" />
                        <span>Overdue: {Math.abs(daysUntil)} days</span>
                      </div>
                    )}
                    {isUrgent && !isOverdue && (
                      <div className="flex items-center gap-1 text-orange-600">
                        <AlertCircle className="h-3 w-3" />
                        <span>Urgent: {daysUntil} days left</span>
                      </div>
                    )}
                  </div>

                  {/* Expandable Steps */}
                  <div className="border border-gray-200 rounded-lg">
                    <Button
                      variant="ghost"
                      onClick={() => toggleExpanded(milestone.id)}
                      className="w-full justify-between p-3 h-auto"
                    >
                      <span className="text-sm font-medium">
                        View Detailed Steps
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>

                    {isExpanded && (
                      <div className="p-4 border-t border-gray-200 space-y-3">
                        {/* Steps List */}
                        <div className="space-y-2">
                          <p className="text-xs font-medium text-gray-500 mb-2">Steps:</p>
                          <div className="space-y-2">
                            {milestone.steps.map((step, stepIndex) => (
                              <div key={stepIndex} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                  stepIndex < milestone.completedSteps
                                    ? "bg-green-500 text-white"
                                    : "bg-gray-200 text-gray-400"
                                }`}>
                                  {stepIndex < milestone.completedSteps ? (
                                    <CheckCircle className="h-3 w-3" />
                                  ) : (
                                    <span className="text-xs font-bold">{stepIndex + 1}</span>
                                  )}
                                </div>
                                <span className={`flex-1 text-sm ${
                                  stepIndex < milestone.completedSteps
                                    ? "text-green-700 line-through"
                                    : "text-gray-600"
                                }`}>
                                  {step}
                                </span>
                                <div className="flex gap-2">
                                  {stepIndex < milestone.completedSteps ? (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => onStepUncomplete?.(milestone.id, stepIndex)}
                                      className="text-xs bg-red-50 hover:bg-red-100 text-red-700 border-red-200 hover:border-red-300 transition-all duration-200"
                                    >
                                      ↶ Uncomplete
                                    </Button>
                                  ) : (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => onStepComplete?.(milestone.id, stepIndex)}
                                      className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200 hover:border-blue-300 transition-all duration-200"
                                    >
                                      ✓ Complete
                                    </Button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Tips */}
                        {milestone.tips && milestone.tips.length > 0 && (
                          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                            <h5 className="text-sm font-medium text-blue-900 mb-2">Tips:</h5>
                            <ul className="space-y-1">
                              {milestone.tips.map((tip, tipIndex) => (
                                <li key={tipIndex} className="text-xs text-blue-800 flex items-start gap-2">
                                  <span className="text-blue-600 mt-0.5">•</span>
                                  <span>{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Complete/Uncomplete Milestone Button */}
                        {milestone.status === "completed" ? (
                          <div className="mt-4 pt-3 border-t border-gray-200">
                              <Button
                                onClick={() => onMilestoneUncomplete?.(milestone.id)}
                                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 hover:shadow-lg"
                                size="sm"
                              >
                                ↶ Uncomplete Milestone
                              </Button>
                          </div>
                        ) : milestone.completedSteps === milestone.totalSteps ? (
                          <div className="mt-4 pt-3 border-t border-gray-200">
                              <Button
                                onClick={() => onMilestoneComplete?.(milestone.id)}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 hover:shadow-lg"
                                size="sm"
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                🎉 Complete This Milestone
                              </Button>
                          </div>
                        ) : null}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Summary */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-4">Summary</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">
                {milestones.filter(m => m.status === "completed").length}
              </div>
              <div className="text-xs text-gray-600">Completed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {milestones.filter(m => m.status === "current").length}
              </div>
              <div className="text-xs text-gray-600">In Progress</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-600">
                {milestones.filter(m => m.status === "upcoming").length}
              </div>
              <div className="text-xs text-gray-600">Upcoming</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {milestones.reduce((acc, m) => acc + m.completedSteps, 0)}
              </div>
              <div className="text-xs text-gray-600">Total Steps Done</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
