import { useState, useEffect, useMemo } from "react";
import { ApplicationDetailsModal } from "./ApplicationDetailsModal";
import { ExamDetailsModal } from "./ExamDetailsModal";
import { ScholarshipModal } from "./ScholarshipModal";
import { ScheduleExamModal } from "./ScheduleExamModal";
import { AddApplicationModal } from "./AddApplicationModal";
import { StatsGrid } from "./StatsGrid";
import { UpcomingDeadlines } from "./UpcomingDeadlines";
import { RecentActivity } from "./RecentActivity";
import { UpcomingTasks } from "./UpcomingTasks";
import { ApplicationProgress } from "./ApplicationProgress";
import { ExamProgressTracker } from "./ExamProgressTracker";
import { SavedUniversities } from "./SavedUniversities";
import { ProgressTracker } from "@/components/progress-tracker";
import { MilestoneTracker } from "@/components/milestone-tracker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  GraduationCap,
  BookOpen,
  Calendar,
  Upload,
} from "lucide-react";
import {
  Application,
  Exam,
  University,
  Scholarship,
  Task,
  Deadline,
  ActivityItem,
  Stat,
} from "./types";

export const DashboardRefactored = () => {
  // Modal states
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);
  const [isScholarshipModalOpen, setIsScholarshipModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isAddApplicationModalOpen, setIsAddApplicationModalOpen] =
    useState(false);

  // Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUniversities, setFilteredUniversities] = useState<
    University[]
  >([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Mock data
  const applications: Application[] = [
    {
      id: 1,
      university: "MIT",
      program: "Computer Science",
      status: "In Progress",
      deadline: "Jan 1, 2025",
      progress: 75,
      ranking: 1,
      location: "Cambridge, MA, USA",
      tuition: "$57,986/year",
      acceptance: "6.7%",
      image: "/mit-campus-aerial.png",
      description:
        "The Computer Science program at MIT focuses on the fundamental principles of computing and their applications.",
      website: "https://www.mit.edu",
      requirements: [
        "SAT: 1500+ or ACT: 34+",
        "IELTS: 7.0+ or TOEFL: 100+",
        "High school transcripts",
        "Letters of recommendation (2)",
        "Personal statement",
        "Extracurricular activities",
      ],
      documents: [
        { name: "High School Transcript", status: "uploaded", required: true },
        { name: "SAT Scores", status: "uploaded", required: true },
        { name: "Personal Statement", status: "draft", required: true },
        {
          name: "Letters of Recommendation",
          status: "pending",
          required: true,
        },
        { name: "Portfolio", status: "not-required", required: false },
        { name: "Financial Aid Forms", status: "pending", required: false },
      ],
      milestones: [
        { title: "Application Started", date: "Nov 1, 2024", completed: true },
        { title: "Documents Uploaded", date: "Nov 15, 2024", completed: true },
        {
          title: "Personal Statement Draft",
          date: "Dec 1, 2024",
          completed: true,
        },
        {
          title: "Letters of Recommendation",
          date: "Dec 20, 2024",
          completed: false,
        },
        { title: "Final Review", date: "Dec 28, 2024", completed: false },
        { title: "Submission", date: "Jan 1, 2025", completed: false },
      ],
    },
    // Add more applications as needed
  ];

  const examProgress: Exam[] = [
    {
      id: 1,
      exam: "SAT",
      fullName: "Scholastic Assessment Test",
      date: "Dec 14, 2024",
      daysLeft: 2,
      status: "registered",
      score: "1480",
      target: "1500+",
      progress: 85,
      registrationId: "SAT-2024-12-14-12345",
      location: "Downtown Test Center, Ulaanbaatar",
      duration: "3 hours 45 minutes",
      sections: [
        {
          name: "Reading",
          score: 370,
          target: 380,
          progress: 95,
          status: "completed",
        },
        {
          name: "Writing & Language",
          score: 360,
          target: 370,
          progress: 90,
          status: "completed",
        },
        {
          name: "Math",
          score: 750,
          target: 750,
          progress: 100,
          status: "completed",
        },
      ],
      practiceTests: [
        {
          name: "Practice Test 1",
          date: "Nov 15, 2024",
          score: 1420,
          status: "completed",
          improvement: "+20",
        },
        {
          name: "Practice Test 2",
          date: "Nov 1, 2024",
          score: 1400,
          status: "completed",
          improvement: "+15",
        },
        {
          name: "Practice Test 3",
          date: "Oct 15, 2024",
          score: 1385,
          status: "completed",
          improvement: "Baseline",
        },
      ],
      studyPlan: [
        {
          topic: "Reading Comprehension",
          progress: 100,
          priority: "high",
          status: "completed",
        },
        {
          topic: "Grammar Rules",
          progress: 100,
          priority: "high",
          status: "completed",
        },
        {
          topic: "Algebra & Functions",
          progress: 100,
          priority: "medium",
          status: "completed",
        },
        {
          topic: "Advanced Math",
          progress: 60,
          priority: "high",
          status: "in-progress",
        },
        {
          topic: "Data Analysis",
          progress: 30,
          priority: "medium",
          status: "in-progress",
        },
      ],
      resources: [
        {
          name: "Khan Academy SAT Prep",
          type: "Practice Tests",
          status: "active",
          url: "https://www.khanacademy.org/test-prep/sat",
        },
        {
          name: "College Board Official Guide",
          type: "Study Material",
          status: "completed",
          url: "https://satsuite.collegeboard.org/sat/practice-preparation",
        },
        {
          name: "SAT Math Bootcamp",
          type: "Course",
          status: "in-progress",
          url: "https://www.khanacademy.org/math",
        },
      ],
    },
    // Add more exams as needed
  ];

  const popularUniversities: University[] = useMemo(
    () => [
      {
        id: "mit",
        name: "MIT",
        location: "Cambridge, MA, USA",
        ranking: 1,
        tuition: "$57,986/year",
        acceptance: "6.7%",
        deadline: "Jan 1, 2025",
        image: "/mit-campus-aerial.png",
        programs: ["Computer Science", "Engineering", "Physics", "Mathematics"],
      },
      // Add more universities as needed
    ],
    []
  );

  const scholarshipOpportunities: Scholarship[] = [
    {
      id: 1,
      title: "MIT Merit Scholarship",
      amount: "$25,000",
      deadline: "Dec 20, 2024",
      daysLeft: 8,
      match: 95,
      applied: false,
    },
    // Add more scholarships as needed
  ];

  const upcomingTasks: Task[] = [
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

  const stats: Stat[] = [
    { label: "Applications", value: "3", icon: FileText },
    { label: "Universities", value: "2,500+", icon: GraduationCap },
    { label: "Documents", value: "12", icon: BookOpen },
    { label: "Deadlines", value: "2", icon: Calendar },
  ];

  const upcomingDeadlines: Deadline[] = [
    {
      id: 1,
      title: "MIT Application",
      deadline: "Jan 1, 2025",
      daysLeft: 15,
      priority: "high",
      type: "application",
    },
    {
      id: 2,
      title: "Stanford Application",
      deadline: "Jan 2, 2025",
      daysLeft: 16,
      priority: "high",
      type: "application",
    },
    {
      id: 3,
      title: "SAT Registration",
      deadline: "Dec 15, 2024",
      daysLeft: 3,
      priority: "critical",
      type: "exam",
    },
    {
      id: 4,
      title: "Harvard Application",
      deadline: "Jan 15, 2025",
      daysLeft: 29,
      priority: "medium",
      type: "application",
    },
  ];

  const recentActivity: ActivityItem[] = [
    {
      id: 1,
      type: "application",
      title: "Started MIT Application",
      description: "Application progress: 75% complete",
      time: "2 hours ago",
      icon: FileText,
    },
    {
      id: 2,
      type: "document",
      title: "Uploaded Transcript",
      description: "Official high school transcript uploaded",
      time: "4 hours ago",
      icon: Upload,
    },
    {
      id: 3,
      type: "university",
      title: "Viewed Stanford Profile",
      description: "Added to saved universities",
      time: "1 day ago",
      icon: GraduationCap,
    },
  ];

  const savedUniversities = [
    {
      id: "mit",
      name: "MIT",
      ranking: 1,
      tuition: "$57,986",
      acceptance: "6.7%",
      deadline: "Jan 1, 2025",
      status: "applying",
    },
    {
      id: "stanford",
      name: "Stanford",
      ranking: 2,
      tuition: "$61,731",
      acceptance: "4.3%",
      deadline: "Jan 2, 2025",
      status: "applying",
    },
    {
      id: "harvard",
      name: "Harvard",
      ranking: 3,
      tuition: "$57,261",
      acceptance: "3.4%",
      deadline: "Jan 15, 2025",
      status: "considering",
    },
  ];

  // Initialize filtered universities when component mounts
  useEffect(() => {
    setFilteredUniversities(popularUniversities);
  }, [popularUniversities]);

  // Event handlers
  const handleViewDetails = (application: Application) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedApplication(null);
  };

  const handleExamDetails = (exam: Exam) => {
    setSelectedExam(exam);
    setIsExamModalOpen(true);
  };

  const closeExamModal = () => {
    setIsExamModalOpen(false);
    setSelectedExam(null);
  };

  const openExternalLink = (url: string) => {
    console.log("Opening URL:", url);
    if (url && url.startsWith("http")) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      console.error("Invalid URL:", url);
    }
  };

  const getExamOfficialWebsite = (exam: string) => {
    switch (exam) {
      case "SAT":
        return "https://satsuite.collegeboard.org";
      case "IELTS":
        return "https://www.ielts.org";
      case "TOEFL":
        return "https://www.ets.org/toefl";
      default:
        return "#";
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowSuggestions(query.length > 0);

    if (query.trim() === "") {
      setFilteredUniversities(popularUniversities);
    } else {
      const filtered = popularUniversities.filter(
        university =>
          university.name.toLowerCase().includes(query.toLowerCase()) ||
          university.location.toLowerCase().includes(query.toLowerCase()) ||
          university.programs.some((program: string) =>
            program.toLowerCase().includes(query.toLowerCase())
          )
      );
      setFilteredUniversities(filtered);
    }
  };

  const handleSearchSubmit = () => {
    setShowSuggestions(false);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setFilteredUniversities(popularUniversities);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (university: University) => {
    setSearchQuery(university.name);
    setShowSuggestions(false);
    setFilteredUniversities([university]);
  };

  const handleApplyToUniversity = (university: University) => {
    console.log(`Starting application for ${university.name}`);
    setIsAddApplicationModalOpen(false);
  };

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
        <StatsGrid stats={stats} />

        {/* Upcoming Deadlines & Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <UpcomingDeadlines deadlines={upcomingDeadlines} />
          <RecentActivity activities={recentActivity} />
        </div>

        {/* Upcoming Tasks */}
        <UpcomingTasks tasks={upcomingTasks} />

        {/* Applications Progress */}
        <ApplicationProgress
          applications={applications}
          onViewDetails={handleViewDetails}
        />

        {/* Additional Widgets Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <ExamProgressTracker
            exams={examProgress}
            onViewDetails={handleExamDetails}
          />
          <SavedUniversities universities={savedUniversities} />
        </div>

        {/* Progress Tracker and Milestone Tracker */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
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

          <Card>
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

        {/* Modals */}
        <ApplicationDetailsModal
          application={selectedApplication}
          isOpen={isModalOpen}
          onClose={closeModal}
          onExternalLink={openExternalLink}
        />

        <ExamDetailsModal
          exam={selectedExam}
          isOpen={isExamModalOpen}
          onClose={closeExamModal}
          onExternalLink={openExternalLink}
          getExamOfficialWebsite={getExamOfficialWebsite}
        />

        <ScholarshipModal
          isOpen={isScholarshipModalOpen}
          onClose={() => setIsScholarshipModalOpen(false)}
          onExternalLink={openExternalLink}
          scholarships={scholarshipOpportunities}
        />

        <ScheduleExamModal
          isOpen={isScheduleModalOpen}
          onClose={() => setIsScheduleModalOpen(false)}
          onExternalLink={openExternalLink}
          availableExams={[]} // Add exam data here
        />

        <AddApplicationModal
          isOpen={isAddApplicationModalOpen}
          onClose={() => setIsAddApplicationModalOpen(false)}
          onExternalLink={openExternalLink}
          searchQuery={searchQuery}
          onSearchChange={handleSearch}
          onSearchSubmit={handleSearchSubmit}
          onClearSearch={handleClearSearch}
          showSuggestions={showSuggestions}
          onSuggestionClick={handleSuggestionClick}
          onHideSuggestions={() => setShowSuggestions(false)}
          filteredUniversities={filteredUniversities}
          onApplyToUniversity={handleApplyToUniversity}
          selectedCountry="all"
          onCountryFilter={() => {}}
          selectedProgram="all"
          onProgramFilter={() => {}}
          countries={[]}
          programs={[]}
          isLoadingExternal={false}
        />
      </div>
    </div>
  );
};
