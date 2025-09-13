import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ProgressTracker } from "@/components/progress-tracker";
import { MilestoneTracker } from "@/components/milestone-tracker";
import {
  GraduationCap,
  Calendar,
  CheckCircle,
  BookOpen,
  FileText,
} from "lucide-react";

export default function DashboardPage() {
  const applications = [
    {
      university: "MIT",
      program: "Computer Science",
      status: "In Progress",
      deadline: "Jan 1, 2025",
      progress: 75,
    },
    {
      university: "Stanford",
      program: "AI/ML",
      status: "Submitted",
      deadline: "Jan 2, 2025",
      progress: 100,
    },
    {
      university: "Harvard",
      program: "Data Science",
      status: "Draft",
      deadline: "Jan 15, 2025",
      progress: 45,
    },
  ];

  const upcomingTasks = [
    {
      task: "Submit MIT application",
      dueDate: "Jan 1, 2025",
      priority: "High",
      completed: false,
    },
    {
      task: "Take SAT retake",
      dueDate: "Dec 7, 2024",
      priority: "High",
      completed: false,
    },
    {
      task: "Request recommendation letters",
      dueDate: "Dec 15, 2024",
      priority: "Medium",
      completed: true,
    },
  ];

  const stats = [
    { label: "Applications", value: "3", icon: FileText },
    { label: "Universities", value: "2,500+", icon: GraduationCap },
    { label: "Documents", value: "12", icon: BookOpen },
    { label: "Deadlines", value: "2", icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Track your university application progress
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Applications Progress */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Application Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {applications.map((app, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{app.university}</h4>
                        <p className="text-sm text-muted-foreground">
                          {app.program}
                        </p>
                      </div>
                      <Badge
                        variant={
                          app.status === "Submitted"
                            ? "default"
                            : app.status === "In Progress"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {app.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{app.progress}%</span>
                      </div>
                      <Progress value={app.progress} className="h-2" />
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">
                        Deadline: {app.deadline}
                      </span>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Tasks */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Tasks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingTasks.map((task, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      task.completed ? "bg-muted/50" : "bg-background"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
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
                    <div className="flex-1">
                      <p className="text-sm font-medium">{task.task}</p>
                      <p className="text-xs text-muted-foreground">
                        Due: {task.dueDate}
                      </p>
                    </div>
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
                ))}
              </CardContent>
            </Card>

            {/* Progress Tracker */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Overall Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <ProgressTracker
                  title="Application Progress"
                  items={[
                    {
                      name: "MIT Application",
                      progress: 75,
                      status: "in-progress",
                      deadline: "Jan 1, 2025",
                      priority: "high",
                    },
                    {
                      name: "Stanford Application",
                      progress: 100,
                      status: "completed",
                      deadline: "Jan 2, 2025",
                      priority: "high",
                    },
                    {
                      name: "Harvard Application",
                      progress: 45,
                      status: "pending",
                      deadline: "Jan 15, 2025",
                      priority: "medium",
                    },
                  ]}
                />
              </CardContent>
            </Card>

            {/* Milestone Tracker */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Milestones</CardTitle>
              </CardHeader>
              <CardContent>
                <MilestoneTracker
                  milestones={[
                    {
                      id: "1",
                      title: "Application Submitted",
                      description: "MIT application completed and submitted",
                      status: "completed",
                      date: "Dec 1, 2024",
                      category: "Application",
                    },
                    {
                      id: "2",
                      title: "Interview Scheduled",
                      description: "MIT interview scheduled for next week",
                      status: "current",
                      date: "Dec 15, 2024",
                      category: "Interview",
                    },
                    {
                      id: "3",
                      title: "Decision Received",
                      description: "Waiting for admission decision",
                      status: "upcoming",
                      date: "Mar 15, 2025",
                      category: "Decision",
                    },
                  ]}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
