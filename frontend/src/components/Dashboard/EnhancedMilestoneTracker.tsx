import { useState, useCallback, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  Clock, 
  Circle, 
  ChevronDown, 
  ChevronRight,
  Calendar,
  AlertTriangle,
  Target,
  FileText,
  
  Award,
  Users,
  BookOpen,
  Upload,
  ExternalLink,
  Star
} from "lucide-react";

interface MilestoneStep {
  id: string;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "pending" | "overdue";
  priority: "high" | "medium" | "low";
  dueDate: string;
  completedDate?: string;
  estimatedTime: string;
  requirements: string[];
  resources: {
    name: string;
    url: string;
    type: "document" | "website" | "form" | "guide";
  }[];
  progress: number;
  notes?: string;
}

interface EnhancedMilestone {
  id: string;
  title: string;
  description: string;
  status: "completed" | "current" | "upcoming" | "overdue";
  category: "Application" | "Document" | "Exam" | "Interview" | "Decision" | "Financial";
  dueDate: string;
  completedDate?: string;
  priority: "high" | "medium" | "low";
  progress: number;
  steps: MilestoneStep[];
  totalSteps: number;
  completedSteps: number;
  estimatedDuration: string;
  requirements: string[];
  tips: string[];
  icon: React.ElementType;
  color: string;
}

interface EnhancedMilestoneTrackerProps {
  milestones: EnhancedMilestone[];
  onStepComplete?: (milestoneId: string, stepId: string) => void;
  onMilestoneComplete?: (milestoneId: string) => void;
  onStepUncomplete?: (milestoneId: string, stepId: string) => void;
  onMilestoneUncomplete?: (milestoneId: string) => void;
}

export const EnhancedMilestoneTracker = ({ 
  milestones, 
  onStepComplete, 
  onMilestoneComplete,
  onStepUncomplete,
  onMilestoneUncomplete
}: EnhancedMilestoneTrackerProps) => {
  const [expandedMilestones, setExpandedMilestones] = useState<Set<string>>(new Set());
  const [localMilestones, setLocalMilestones] = useState<EnhancedMilestone[]>(milestones);
  const [showTips, setShowTips] = useState<Set<string>>(new Set());
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const toggleExpanded = (milestoneId: string) => {
    const newExpanded = new Set(expandedMilestones);
    if (newExpanded.has(milestoneId)) {
      newExpanded.delete(milestoneId);
    } else {
      newExpanded.add(milestoneId);
    }
    setExpandedMilestones(newExpanded);
  };

  const toggleStepComplete = useCallback((milestoneId: string, stepId: string) => {
    const stepKey = `${milestoneId}-${stepId}`;
    const newCompleted = new Set(completedSteps);
    
    if (newCompleted.has(stepKey)) {
      newCompleted.delete(stepKey);
      onStepUncomplete?.(milestoneId, stepId);
      console.log(`❌ Uncompleted step: ${stepKey}`);
    } else {
      newCompleted.add(stepKey);
      onStepComplete?.(milestoneId, stepId);
      console.log(`✅ Completed step: ${stepKey}`);
    }
    
    setCompletedSteps(newCompleted);
  }, [completedSteps, onStepComplete, onStepUncomplete]);

  const toggleMilestoneComplete = useCallback((milestoneId: string) => {
    console.log(`🎯 Toggle milestone complete clicked: ${milestoneId}`);
    setLocalMilestones(prev => 
      prev.map(milestone => {
        if (milestone.id === milestoneId) {
          const newStatus = milestone.status === 'completed' ? 'current' : 'completed';
          console.log(`🔄 Changing milestone ${milestoneId} from ${milestone.status} to ${newStatus}`);
          
          if (newStatus === 'completed') {
            onMilestoneComplete?.(milestoneId);
          } else {
            onMilestoneUncomplete?.(milestoneId);
          }
          return {
            ...milestone,
            status: newStatus,
            completedDate: newStatus === 'completed' ? new Date().toISOString().split('T')[0] : undefined,
            progress: newStatus === 'completed' ? 100 : milestone.progress
          };
        }
        return milestone;
      })
    );
  }, [onMilestoneComplete, onMilestoneUncomplete]);

  const updateMilestoneProgress = useCallback((milestoneId: string) => {
    setLocalMilestones(prev => 
      prev.map(milestone => {
        if (milestone.id === milestoneId) {
          const totalSteps = milestone.steps.length;
          const completedCount = milestone.steps.filter(step => 
            completedSteps.has(`${milestoneId}-${step.id}`)
          ).length;
          const progress = (completedCount / totalSteps) * 100; // Keep decimal precision
          
          console.log(`📊 Updating milestone ${milestoneId}: ${completedCount}/${totalSteps} = ${Math.round(progress)}%`);
          
          return {
            ...milestone,
            progress: Math.round(progress), // Round to whole number
            completedSteps: completedCount,
            status: progress === 100 ? 'completed' : progress > 0 ? 'current' : 'upcoming'
          };
        }
        return milestone;
      })
    );
  }, [completedSteps]);

  // Update all milestone progress when completedSteps changes
  useEffect(() => {
    console.log('🔄 Completed steps changed, updating all milestone progress...');
    localMilestones.forEach(milestone => {
      updateMilestoneProgress(milestone.id);
    });
  }, [completedSteps, localMilestones, updateMilestoneProgress]);

  const toggleTips = (milestoneId: string) => {
    const newShowTips = new Set(showTips);
    if (newShowTips.has(milestoneId)) {
      newShowTips.delete(milestoneId);
    } else {
      newShowTips.add(milestoneId);
    }
    setShowTips(newShowTips);
  };


  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "current":
        return <Clock className="h-5 w-5 text-blue-600" />;
      case "upcoming":
        return <Circle className="h-5 w-5 text-gray-400" />;
      case "overdue":
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default:
        return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "current":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "upcoming":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "overdue":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
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

  const getStepStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-600" />;
      case "pending":
        return <Circle className="h-4 w-4 text-gray-400" />;
      case "overdue":
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getDaysUntilDeadline = (date: string) => {
    const today = new Date();
    const deadline = new Date(date);
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Application":
        return <FileText className="h-4 w-4" />;
      case "Document":
        return <Upload className="h-4 w-4" />;
      case "Exam":
        return <BookOpen className="h-4 w-4" />;
      case "Interview":
        return <Users className="h-4 w-4" />;
      case "Decision":
        return <Award className="h-4 w-4" />;
      case "Financial":
        return <Star className="h-4 w-4" />;
      default:
        return <Target className="h-4 w-4" />;
    }
  };

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
              <Target className="h-5 w-5 text-white" />
            </div>
            Application Milestones
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <div className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>{milestones.filter(m => m.status === 'completed').length} completed</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-blue-600" />
              <span>{milestones.filter(m => m.status === 'current').length} in progress</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {localMilestones.map((milestone, index) => {
          const isExpanded = expandedMilestones.has(milestone.id);
          const daysLeft = getDaysUntilDeadline(milestone.dueDate);
          const isOverdue = daysLeft < 0;
          
          return (
            <div key={milestone.id} className="group">
              {/* Main Milestone Card */}
              <div 
                className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-lg ${
                  milestone.status === 'completed' 
                    ? 'border-green-200 bg-green-50/50' 
                    : milestone.status === 'current'
                    ? 'border-blue-200 bg-blue-50/50'
                    : milestone.status === 'overdue'
                    ? 'border-red-200 bg-red-50/50'
                    : 'border-gray-200 bg-gray-50/50'
                }`}
                onClick={() => toggleExpanded(milestone.id)}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${milestone.color}`}>
                      {getCategoryIcon(milestone.category)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                          {milestone.title}
                        </h4>
                        <Badge className={`${getStatusColor(milestone.status)} flex items-center gap-1`}>
                          {getStatusIcon(milestone.status)}
                          {milestone.status.replace('-', ' ').toUpperCase()}
                        </Badge>
                        <Badge className={`${getPriorityColor(milestone.priority)} flex items-center gap-1`}>
                          {milestone.priority.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">{milestone.description}</p>
                      
                      {/* Progress Bar */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-slate-700 text-base">Progress</span>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-slate-900">
                              {milestone.progress}%
                            </div>
                            <div className="text-sm text-slate-500">
                              {milestone.completedSteps}/{milestone.totalSteps} steps completed
                            </div>
                          </div>
                        </div>
                        <div className="relative">
                          <Progress value={milestone.progress} className="h-4" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs font-bold text-white drop-shadow-sm">
                              {milestone.progress}%
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between text-xs text-slate-500">
                          <span>Started</span>
                          <span>{milestone.progress}% Complete</span>
                          <span>Finished</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMilestoneComplete(milestone.id);
                      }}
                    >
                      {milestone.status === 'completed' ? (
                        <>
                          <CheckCircle className="h-4 w-4" />
                          Mark Incomplete
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4" />
                          Mark Complete
                        </>
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpanded(milestone.id);
                      }}
                    >
                      {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Calendar className="h-4 w-4" />
                    <div>
                      <div className="font-medium">Due Date</div>
                      <div className={`font-bold ${isOverdue ? 'text-red-600' : 'text-slate-900'}`}>
                        {milestone.dueDate}
                      </div>
                      {isOverdue ? (
                        <div className="text-xs text-red-600">Overdue by {Math.abs(daysLeft)} days</div>
                      ) : (
                        <div className="text-xs text-slate-500">{daysLeft} days left</div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock className="h-4 w-4" />
                    <div>
                      <div className="font-medium">Duration</div>
                      <div className="font-bold text-slate-900">{milestone.estimatedDuration}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-slate-600">
                    <Target className="h-4 w-4" />
                    <div>
                      <div className="font-medium">Category</div>
                      <div className="font-bold text-slate-900">{milestone.category}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-slate-600">
                    <CheckCircle className="h-4 w-4" />
                    <div>
                      <div className="font-medium">Completion</div>
                      <div className="font-bold text-slate-900 text-lg">{milestone.progress}%</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="mt-4 p-6 bg-white rounded-xl border border-slate-200 space-y-6">
                  {/* Steps */}
                  <div>
                    <h5 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <Target className="h-5 w-5 text-blue-600" />
                      Steps ({milestone.completedSteps}/{milestone.totalSteps})
                    </h5>
                    <div className="space-y-3">
                      {milestone.steps.map((step, stepIndex) => (
                        <div key={step.id} className="p-4 rounded-lg border border-slate-200 hover:border-blue-300 transition-colors duration-300">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-1">
                              {getStepStatusIcon(step.status)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h6 className="font-medium text-slate-900">{step.title}</h6>
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 px-2 text-xs"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleStepComplete(milestone.id, step.id);
                                    }}
                                  >
                                    {completedSteps.has(`${milestone.id}-${step.id}`) ? (
                                      <>
                                        <CheckCircle className="h-3 w-3 text-green-600 mr-1" />
                                        Complete
                                      </>
                                    ) : (
                                      <>
                                        <Circle className="h-3 w-3 text-gray-400 mr-1" />
                                        Mark Done
                                      </>
                                    )}
                                  </Button>
                                  <Badge className={`${getPriorityColor(step.priority)} text-xs`}>
                                    {step.priority}
                                  </Badge>
                                  <span className="text-xs text-slate-500">{step.estimatedTime}</span>
                                </div>
                              </div>
                              <p className="text-sm text-slate-600 mb-3">{step.description}</p>
                              
                              {/* Step Progress */}
                              <div className="space-y-2 mb-3">
                                <div className="flex justify-between items-center">
                                  <span className="font-medium text-slate-700 text-sm">Progress</span>
                                  <div className="text-right">
                                    <span className="text-lg font-bold text-slate-900">
                                      {step.progress}%
                                    </span>
                                  </div>
                                </div>
                                <div className="relative">
                                  <Progress value={step.progress} className="h-3" />
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-xs font-bold text-white drop-shadow-sm">
                                      {step.progress}%
                                    </span>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Requirements */}
                              {step.requirements.length > 0 && (
                                <div className="mb-3">
                                  <p className="text-xs font-medium text-slate-700 mb-2 block">Requirements:</p>
                                  <ul className="text-xs text-slate-600 space-y-1">
                                    {step.requirements.map((req, reqIndex) => (
                                      <li key={reqIndex} className="flex items-center gap-2">
                                        <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                                        {req}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              
                              {/* Resources */}
                              {step.resources.length > 0 && (
                                <div className="mb-3">
                                  <p className="text-xs font-medium text-slate-700 mb-2 block">Resources:</p>
                                  <div className="flex flex-wrap gap-2">
                                    {step.resources.map((resource, resIndex) => (
                                      <Button
                                        key={resIndex}
                                        variant="outline"
                                        size="sm"
                                        className="text-xs h-6"
                                        onClick={() => window.open(resource.url, '_blank')}
                                      >
                                        <ExternalLink className="h-3 w-3 mr-1" />
                                        {resource.name}
                                      </Button>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              {/* Notes */}
                              {step.notes && (
                                <div className="p-3 bg-slate-50 rounded-lg">
                                  <p className="text-xs font-medium text-slate-700 mb-1 block">Notes:</p>
                                  <p className="text-xs text-slate-600">{step.notes}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tips */}
                  {milestone.tips.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h5 className="font-bold text-lg flex items-center gap-2">
                          <Star className="h-5 w-5 text-yellow-600" />
                          Tips & Advice
                        </h5>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleTips(milestone.id);
                          }}
                          className="text-yellow-600 hover:text-yellow-700"
                        >
                          {showTips.has(milestone.id) ? 'Hide Tips' : 'Show Tips'}
                        </Button>
                      </div>
                      {showTips.has(milestone.id) && (
                        <div className="grid gap-3">
                          {milestone.tips.map((tip, tipIndex) => (
                            <div key={tipIndex} className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                              <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-yellow-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <span className="text-xs font-bold text-yellow-800">{tipIndex + 1}</span>
                                </div>
                                <p className="text-sm text-slate-700">{tip}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Requirements */}
                  {milestone.requirements.length > 0 && (
                    <div>
                      <h5 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <FileText className="h-5 w-5 text-green-600" />
                        Overall Requirements
                      </h5>
                      <div className="grid gap-3">
                        {milestone.requirements.map((req, reqIndex) => (
                          <div key={reqIndex} className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-200">
                            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </div>
                            <div className="flex-1">
                              <span className="text-sm text-slate-700 font-medium">{req}</span>
                              <div className="mt-1 text-xs text-slate-500">
                                Required for {milestone.category} milestone
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>
          );
        })}
      </CardContent>

    </Card>
  );
};
