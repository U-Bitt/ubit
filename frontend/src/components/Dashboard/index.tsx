import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ProgressTracker } from "@/components/progress-tracker";
import { MilestoneTracker } from "@/components/milestone-tracker";
import Image from "next/image";
import {
  GraduationCap,
  Calendar,
  CheckCircle,
  BookOpen,
  FileText,
  Plus,
  Upload,
  Users,
  Clock,
  AlertTriangle,
  TrendingUp,
  Target,
  Award,
  BarChart3,
  Activity,
  ExternalLink,
  Eye,
  Edit,
  X,
  MapPin,
  DollarSign,
  Percent,
  Mail,
  Phone,
  Globe,
  ArrowRight,
  Search,
} from "lucide-react";
import { useState, useEffect } from "react";

interface Application {
  image: string;
  university: string;
  program: string;
  ranking: number;
  status: string;
  location: string;
  tuition: string;
  acceptance: string;
  deadline: string;
  progress: number;
  description: string;
  requirements: string[];
  documents: Document[];
  milestones: Milestone[];
  website: string;
}

interface Document {
  name: string;
  status: string;
  required: boolean;
}

interface Milestone {
  title: string;
  date: string;
  completed: boolean;
}

interface Exam {
  exam: string;
  fullName: string;
  status: string;
  daysLeft: number;
  date: string;
  location: string;
  duration: string;
  registrationId?: string;
  progress: number;
  score?: string;
  target: string;
  sections: Section[];
  practiceTests: PracticeTest[];
  studyPlan: StudyTopic[];
  resources: Resource[];
}

interface Section {
  name: string;
  score?: number;
  target: number;
  progress: number;
  status: string;
}

interface PracticeTest {
  name: string;
  score: number;
  date: string;
  status: string;
  improvement?: string;
}

interface StudyTopic {
  topic: string;
  progress: number;
  priority: string;
  status: string;
}

interface Resource {
  name: string;
  type: string;
  url: string;
  status: string;
}

export const Dashboard = () => {
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);
  const [isScholarshipModalOpen, setIsScholarshipModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isAddApplicationModalOpen, setIsAddApplicationModalOpen] =
    useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUniversities, setFilteredUniversities] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const applications = [
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
    {
      id: 2,
      university: "Stanford",
      program: "AI/ML",
      status: "Submitted",
      deadline: "Jan 2, 2025",
      progress: 100,
      ranking: 2,
      location: "Stanford, CA, USA",
      tuition: "$61,731/year",
      acceptance: "4.3%",
      image: "/stanford-campus.jpg",
      description:
        "Stanford's AI/ML program is one of the leading programs in artificial intelligence and machine learning.",
      website: "https://www.stanford.edu",
      requirements: [
        "SAT: 1520+ or ACT: 35+",
        "IELTS: 7.5+ or TOEFL: 110+",
        "High school transcripts",
        "Letters of recommendation (3)",
        "Personal statement",
        "Research experience preferred",
      ],
      documents: [
        { name: "High School Transcript", status: "uploaded", required: true },
        { name: "SAT Scores", status: "uploaded", required: true },
        { name: "Personal Statement", status: "uploaded", required: true },
        {
          name: "Letters of Recommendation",
          status: "uploaded",
          required: true,
        },
        { name: "Research Portfolio", status: "uploaded", required: false },
        { name: "Financial Aid Forms", status: "uploaded", required: false },
      ],
      milestones: [
        { title: "Application Started", date: "Oct 15, 2024", completed: true },
        { title: "Documents Uploaded", date: "Nov 1, 2024", completed: true },
        { title: "Personal Statement", date: "Nov 15, 2024", completed: true },
        {
          title: "Letters of Recommendation",
          date: "Dec 1, 2024",
          completed: true,
        },
        { title: "Final Review", date: "Dec 20, 2024", completed: true },
        { title: "Submission", date: "Jan 2, 2025", completed: true },
      ],
    },
    {
      id: 3,
      university: "Harvard",
      program: "Data Science",
      status: "Draft",
      deadline: "Jan 15, 2025",
      progress: 45,
      ranking: 3,
      location: "Cambridge, MA, USA",
      tuition: "$57,261/year",
      acceptance: "3.4%",
      image: "/harvard-campus.jpg",
      description:
        "Harvard's Data Science program combines statistical methods with computational techniques for data analysis.",
      website: "https://www.harvard.edu",
      requirements: [
        "SAT: 1540+ or ACT: 36+",
        "IELTS: 7.5+ or TOEFL: 110+",
        "High school transcripts",
        "Letters of recommendation (2)",
        "Personal statement",
        "Leadership experience",
      ],
      documents: [
        { name: "High School Transcript", status: "uploaded", required: true },
        { name: "SAT Scores", status: "pending", required: true },
        { name: "Personal Statement", status: "draft", required: true },
        {
          name: "Letters of Recommendation",
          status: "pending",
          required: true,
        },
        {
          name: "Leadership Portfolio",
          status: "not-started",
          required: false,
        },
        { name: "Financial Aid Forms", status: "not-started", required: false },
      ],
      milestones: [
        { title: "Application Started", date: "Nov 20, 2024", completed: true },
        { title: "Documents Uploaded", date: "Dec 1, 2024", completed: false },
        {
          title: "Personal Statement Draft",
          date: "Dec 15, 2024",
          completed: false,
        },
        {
          title: "Letters of Recommendation",
          date: "Dec 25, 2024",
          completed: false,
        },
        { title: "Final Review", date: "Jan 10, 2025", completed: false },
        { title: "Submission", date: "Jan 15, 2025", completed: false },
      ],
    },
  ];

  const handleViewDetails = (application: Application) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedApplication(null);
  };

  const openExternalLink = (url: string) => {
    console.log("Opening URL:", url); // Debug log
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

  const scholarshipOpportunities = [
    {
      id: 1,
      title: "MIT Merit Scholarship",
      amount: "$25,000",
      deadline: "Dec 20, 2024",
      daysLeft: 8,
      match: 95,
      applied: false,
    },
    {
      id: 2,
      title: "Stanford Engineering Excellence",
      amount: "$30,000",
      deadline: "Jan 5, 2025",
      daysLeft: 24,
      match: 88,
      applied: true,
    },
    {
      id: 3,
      title: "Harvard Leadership Award",
      amount: "$20,000",
      deadline: "Jan 10, 2025",
      daysLeft: 29,
      match: 92,
      applied: false,
    },
  ];

  const availableExams = [
    {
      id: 1,
      name: "SAT",
      fullName: "Scholastic Assessment Test",
      provider: "College Board",
      duration: "3 hours 45 minutes",
      cost: "$60",
      registrationUrl: "https://satsuite.collegeboard.org/sat/registration",
      nextDates: [
        { date: "Dec 14, 2024", location: "Downtown Test Center", spots: 15 },
        { date: "Jan 25, 2025", location: "University Campus", spots: 8 },
        { date: "Mar 8, 2025", location: "High School Center", spots: 22 },
      ],
    },
    {
      id: 2,
      name: "IELTS",
      fullName: "International English Language Testing System",
      provider: "British Council",
      duration: "2 hours 45 minutes",
      cost: "$245",
      registrationUrl: "https://www.ielts.org/book-a-test",
      nextDates: [
        { date: "Jan 20, 2025", location: "British Council", spots: 12 },
        { date: "Feb 17, 2025", location: "Language Center", spots: 18 },
        { date: "Mar 15, 2025", location: "International School", spots: 6 },
      ],
    },
    {
      id: 3,
      name: "TOEFL",
      fullName: "Test of English as a Foreign Language",
      provider: "ETS",
      duration: "3 hours 30 minutes",
      cost: "$225",
      registrationUrl: "https://www.ets.org/toefl/test-takers/ibt/register",
      nextDates: [
        { date: "Feb 10, 2025", location: "ETS Test Center", spots: 20 },
        { date: "Mar 2, 2025", location: "Computer Lab", spots: 14 },
        { date: "Apr 6, 2025", location: "University Hall", spots: 16 },
      ],
    },
  ];

  const popularUniversities = [
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
    {
      id: "stanford",
      name: "Stanford University",
      location: "Stanford, CA, USA",
      ranking: 2,
      tuition: "$61,731/year",
      acceptance: "3.9%",
      deadline: "Jan 2, 2025",
      image: "/stanford-campus.jpg",
      programs: ["Computer Science", "Engineering", "Business", "Medicine"],
    },
    {
      id: "harvard",
      name: "Harvard University",
      location: "Cambridge, MA, USA",
      ranking: 3,
      tuition: "$57,261/year",
      acceptance: "3.2%",
      deadline: "Jan 1, 2025",
      image: "/harvard-campus.jpg",
      programs: ["Liberal Arts", "Medicine", "Law", "Business"],
    },
    {
      id: "berkeley",
      name: "UC Berkeley",
      location: "Berkeley, CA, USA",
      ranking: 4,
      tuition: "$44,115/year",
      acceptance: "14.5%",
      deadline: "Nov 30, 2024",
      image: "/berkeley-logo.svg",
      programs: ["Computer Science", "Engineering", "Business", "Liberal Arts"],
    },
    {
      id: "caltech",
      name: "Caltech",
      location: "Pasadena, CA, USA",
      ranking: 5,
      tuition: "$60,864/year",
      acceptance: "6.4%",
      deadline: "Jan 3, 2025",
      image: "/caltech-logo.svg",
      programs: ["Physics", "Engineering", "Computer Science", "Mathematics"],
    },
    {
      id: "princeton",
      name: "Princeton University",
      location: "Princeton, NJ, USA",
      ranking: 6,
      tuition: "$59,710/year",
      acceptance: "5.6%",
      deadline: "Jan 1, 2025",
      image: "/princeton-logo.svg",
      programs: ["Liberal Arts", "Engineering", "Public Policy", "Economics"],
    },
    {
      id: "yale",
      name: "Yale University",
      location: "New Haven, CT, USA",
      ranking: 7,
      tuition: "$62,250/year",
      acceptance: "4.6%",
      deadline: "Jan 2, 2025",
      image: "/yale-logo.svg",
      programs: ["Liberal Arts", "Medicine", "Law", "Business"],
    },
    {
      id: "columbia",
      name: "Columbia University",
      location: "New York, NY, USA",
      ranking: 8,
      tuition: "$65,340/year",
      acceptance: "3.7%",
      deadline: "Jan 1, 2025",
      image: "/columbia-logo.svg",
      programs: ["Liberal Arts", "Engineering", "Journalism", "Business"],
    },
    {
      id: "chicago",
      name: "University of Chicago",
      location: "Chicago, IL, USA",
      ranking: 9,
      tuition: "$61,179/year",
      acceptance: "5.4%",
      deadline: "Jan 2, 2025",
      image: "/chicago-logo.svg",
      programs: ["Liberal Arts", "Economics", "Business", "Public Policy"],
    },
    {
      id: "cambridge",
      name: "University of Cambridge",
      location: "Cambridge, UK",
      ranking: 10,
      tuition: "£22,227/year",
      acceptance: "21%",
      deadline: "Oct 15, 2024",
      image: "/cambridge-university-campus.jpg",
      programs: ["Liberal Arts", "Engineering", "Medicine", "Natural Sciences"],
    },
    {
      id: "oxford",
      name: "University of Oxford",
      location: "Oxford, UK",
      ranking: 11,
      tuition: "£26,770/year",
      acceptance: "17%",
      deadline: "Oct 15, 2024",
      image: "/oxford-university-campus.jpg",
      programs: ["Liberal Arts", "Medicine", "Law", "Natural Sciences"],
    },
    {
      id: "toronto",
      name: "University of Toronto",
      location: "Toronto, Canada",
      ranking: 12,
      tuition: "CAD $58,160/year",
      acceptance: "43%",
      deadline: "Jan 15, 2025",
      image: "/university-of-toronto-campus.png",
      programs: ["Computer Science", "Engineering", "Medicine", "Business"],
    },
  ];

  // Initialize filtered universities when component mounts
  useEffect(() => {
    setFilteredUniversities(popularUniversities);
  }, []);

  const quickActions = [
    {
      label: "Add Application",
      icon: Plus,
      action: "add-application",
      color: "bg-blue-500",
    },
    {
      label: "Upload Documents",
      icon: Upload,
      action: "upload-docs",
      color: "bg-green-500",
    },
    {
      label: "Schedule Exam",
      icon: Calendar,
      action: "schedule-exam",
      color: "bg-purple-500",
    },
    {
      label: "Find Scholarships",
      icon: Award,
      action: "find-scholarships",
      color: "bg-yellow-500",
      scholarships: scholarshipOpportunities,
    },
  ];

  const upcomingDeadlines = [
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

  const recentActivity = [
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

    {
      id: 4,
      type: "exam",
      title: "SAT Score Received",
      description: "Score: 1480 - Great improvement!",
      time: "2 days ago",
      icon: TrendingUp,
    },
    {
      id: 5,
      type: "scholarship",
      title: "Applied for MIT Scholarship",
      description: "Engineering Excellence Scholarship",
      time: "3 days ago",
      icon: Award,
    },
  ];

  const examProgress = [
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
    {
      id: 2,
      exam: "IELTS",
      fullName: "International English Language Testing System",
      date: "Jan 20, 2025",
      daysLeft: 39,
      status: "preparing",
      score: undefined,
      target: "7.5+",
      progress: 60,
      registrationId: "IELTS-2025-01-20-67890",
      location: "British Council, Ulaanbaatar",
      duration: "2 hours 45 minutes",
      sections: [
        {
          name: "Listening",
          score: undefined,
          target: 7.5,
          progress: 70,
          status: "in-progress",
        },
        {
          name: "Reading",
          score: undefined,
          target: 7.5,
          progress: 65,
          status: "in-progress",
        },
        {
          name: "Writing",
          score: undefined,
          target: 7.0,
          progress: 55,
          status: "in-progress",
        },
        {
          name: "Speaking",
          score: undefined,
          target: 7.5,
          progress: 60,
          status: "in-progress",
        },
      ],
      practiceTests: [
        {
          name: "IELTS Practice Test 1",
          date: "Dec 1, 2024",
          score: 6.5,
          status: "completed",
          improvement: "+0.5",
        },
        {
          name: "IELTS Practice Test 2",
          date: "Nov 15, 2024",
          score: 6.0,
          status: "completed",
          improvement: "Baseline",
        },
      ],
      studyPlan: [
        {
          topic: "Academic Vocabulary",
          progress: 100,
          priority: "high",
          status: "completed",
        },
        {
          topic: "Listening Strategies",
          progress: 100,
          priority: "high",
          status: "completed",
        },
        {
          topic: "Reading Techniques",
          progress: 70,
          priority: "high",
          status: "in-progress",
        },
        {
          topic: "Essay Writing",
          progress: 40,
          priority: "medium",
          status: "in-progress",
        },
        {
          topic: "Speaking Fluency",
          progress: 30,
          priority: "medium",
          status: "in-progress",
        },
      ],
      resources: [
        {
          name: "IELTS Official Practice",
          type: "Practice Tests",
          status: "active",
          url: "https://www.ielts.org/for-test-takers/preparation",
        },
        {
          name: "Cambridge IELTS Books",
          type: "Study Material",
          status: "in-progress",
          url: "https://www.cambridge.org/cambridgeenglish/catalog/exams/cambridge-ielts",
        },
        {
          name: "Speaking Partner Sessions",
          type: "Practice",
          status: "scheduled",
          url: "https://www.italki.com/en/teachers/ielts",
        },
      ],
    },
    {
      id: 3,
      exam: "TOEFL",
      fullName: "Test of English as a Foreign Language",
      date: "Feb 10, 2025",
      daysLeft: 60,
      status: "planning",
      score: undefined,
      target: "100+",
      progress: 25,
      registrationId: undefined,
      location: "ETS Test Center, Ulaanbaatar",
      duration: "3 hours 30 minutes",
      sections: [
        {
          name: "Reading",
          score: undefined,
          target: 25,
          progress: 20,
          status: "in-progress",
        },
        {
          name: "Listening",
          score: undefined,
          target: 25,
          progress: 25,
          status: "in-progress",
        },
        {
          name: "Speaking",
          score: undefined,
          target: 25,
          progress: 30,
          status: "in-progress",
        },
        {
          name: "Writing",
          score: undefined,
          target: 25,
          progress: 25,
          status: "in-progress",
        },
      ],
      practiceTests: [
        {
          name: "TOEFL Practice Test 1",
          date: "Dec 5, 2024",
          score: 85,
          status: "completed",
          improvement: "Baseline",
        },
      ],
      studyPlan: [
        {
          topic: "TOEFL Format Overview",
          progress: 100,
          priority: "high",
          status: "completed",
        },
        {
          topic: "Academic Reading Skills",
          progress: 20,
          priority: "high",
          status: "in-progress",
        },
        {
          topic: "Listening Comprehension",
          progress: 25,
          priority: "high",
          status: "in-progress",
        },
        {
          topic: "Speaking Tasks",
          progress: 10,
          priority: "medium",
          status: "in-progress",
        },
        {
          topic: "Integrated Writing",
          progress: 5,
          priority: "medium",
          status: "in-progress",
        },
      ],
      resources: [
        {
          name: "ETS Official TOEFL Guide",
          type: "Study Material",
          status: "planned",
          url: "https://www.ets.org/toefl/test-takers/ibt/prepare",
        },
        {
          name: "TOEFL Practice Online",
          type: "Practice Tests",
          status: "planned",
          url: "https://toeflpractice.ets.org",
        },
        {
          name: "English Grammar Course",
          type: "Course",
          status: "active",
          url: "https://www.grammarly.com/grammar-check",
        },
      ],
    },
  ];

  const handleExamDetails = (exam: Exam) => {
    setSelectedExam(exam);
    setIsExamModalOpen(true);
  };

  const closeExamModal = () => {
    setIsExamModalOpen(false);
    setSelectedExam(null);
  };

  const openScholarshipModal = () => {
    setIsScholarshipModalOpen(true);
  };

  const closeScholarshipModal = () => {
    setIsScholarshipModalOpen(false);
  };

  const openScheduleModal = () => {
    setIsScheduleModalOpen(true);
  };

  const closeScheduleModal = () => {
    setIsScheduleModalOpen(false);
  };

  const openAddApplicationModal = () => {
    setIsAddApplicationModalOpen(true);
  };

  const closeAddApplicationModal = () => {
    setIsAddApplicationModalOpen(false);
    setSearchQuery("");
    setFilteredUniversities(popularUniversities);
    setShowSuggestions(false);
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
          university.programs.some(program =>
            program.toLowerCase().includes(query.toLowerCase())
          )
      );
      setFilteredUniversities(filtered);
    }
  };

  const handleSearchSubmit = () => {
    setShowSuggestions(false);
    // Search functionality is already handled by handleSearch
  };

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

        {/* Quick Actions Panel */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center gap-2 hover:shadow-md transition-shadow"
                    onClick={() => {
                      if (action.action === "find-scholarships") {
                        openScholarshipModal();
                      } else if (action.action === "schedule-exam") {
                        openScheduleModal();
                      } else if (action.action === "add-application") {
                        openAddApplicationModal();
                      }
                    }}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${action.color}`}
                    >
                      <action.icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-xs font-medium">{action.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
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

        {/* Upcoming Deadlines & Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Upcoming Deadlines */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Upcoming Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingDeadlines.map(deadline => (
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
                      <h4 className="font-semibold text-sm">
                        {deadline.title}
                      </h4>
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

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map(activity => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                    <activity.icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm">{activity.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      {activity.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Tasks - Full Width */}
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
                {upcomingTasks.map((task, index) => (
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
                        <h4 className="font-medium text-sm mb-1">
                          {task.task}
                        </h4>
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

        {/* Applications Progress - Full Width */}
        <div className="mb-8">
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
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewDetails(app)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Additional Widgets Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Exam Progress Tracker */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Exam Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {examProgress.map((exam, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-sm">{exam.exam}</h4>
                      <p className="text-xs text-muted-foreground">
                        {exam.date} ({exam.daysLeft} days left)
                      </p>
                    </div>
                    <Badge
                      variant={
                        exam.status === "registered"
                          ? "default"
                          : exam.status === "preparing"
                            ? "secondary"
                            : "outline"
                      }
                      className="text-xs"
                    >
                      {exam.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{exam.progress}%</span>
                    </div>
                    <Progress value={exam.progress} className="h-2" />
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    {exam.score ? (
                      <span className="text-green-600 font-medium">
                        Score: {exam.score}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">
                        Target: {exam.target}
                      </span>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleExamDetails(exam)}
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Details
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* University Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Saved Universities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {savedUniversities.map(uni => (
                <div
                  key={uni.id}
                  className="p-3 rounded-lg border hover:shadow-sm transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-sm">{uni.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        #{uni.ranking} • {uni.acceptance}
                      </p>
                    </div>
                    <Badge
                      variant={
                        uni.status === "applying" ? "default" : "secondary"
                      }
                      className="text-xs"
                    >
                      {uni.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>{uni.tuition}/year</span>
                    <span>Due: {uni.deadline}</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Progress Tracker and Milestone Tracker */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Progress Tracker */}
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

          {/* Milestone Tracker */}
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
      </div>

      {/* Application Details Modal */}
      {isModalOpen && selectedApplication && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Image
                    src={selectedApplication.image}
                    alt={selectedApplication.university}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h2 className="text-2xl font-bold">
                      {selectedApplication.university}
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      {selectedApplication.program}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">
                        #{selectedApplication.ranking}
                      </Badge>
                      <Badge
                        variant={
                          selectedApplication.status === "Submitted"
                            ? "default"
                            : selectedApplication.status === "In Progress"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {selectedApplication.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={closeModal}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-8">
              {/* University Overview */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      University Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {selectedApplication.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {selectedApplication.tuition}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Percent className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {selectedApplication.acceptance} acceptance rate
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        Deadline: {selectedApplication.deadline}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Application Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          Overall Progress
                        </span>
                        <span className="text-sm font-bold">
                          {selectedApplication.progress}%
                        </span>
                      </div>
                      <Progress
                        value={selectedApplication.progress}
                        className="h-3"
                      />
                      <div className="text-xs text-muted-foreground">
                        {selectedApplication.progress}% complete
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Program Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Program Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedApplication.description}
                  </p>
                </CardContent>
              </Card>

              {/* Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Admission Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {selectedApplication.requirements.map(
                      (req: string, index: number) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm"
                        >
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                      )
                    )}
                  </ul>
                </CardContent>
              </Card>

              {/* Document Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Document Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedApplication.documents.map(
                      (doc: Document, index: number) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg border"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                doc.status === "uploaded"
                                  ? "bg-green-500"
                                  : doc.status === "draft"
                                    ? "bg-yellow-500"
                                    : doc.status === "pending"
                                      ? "bg-orange-500"
                                      : doc.status === "not-required"
                                        ? "bg-gray-300"
                                        : "bg-gray-300"
                              }`}
                            />
                            <div>
                              <span className="font-medium text-sm">
                                {doc.name}
                              </span>
                              {doc.required && (
                                <Badge
                                  variant="destructive"
                                  className="ml-2 text-xs"
                                >
                                  Required
                                </Badge>
                              )}
                            </div>
                          </div>
                          <Badge
                            variant={
                              doc.status === "uploaded"
                                ? "default"
                                : doc.status === "draft"
                                  ? "secondary"
                                  : doc.status === "pending"
                                    ? "outline"
                                    : "outline"
                            }
                            className="text-xs capitalize"
                          >
                            {doc.status.replace("-", " ")}
                          </Badge>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Application Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Application Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedApplication.milestones.map(
                      (milestone: Milestone, index: number) => (
                        <div key={index} className="flex items-center gap-4">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              milestone.completed
                                ? "bg-green-500 text-white"
                                : "bg-gray-200 text-gray-500"
                            }`}
                          >
                            {milestone.completed ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : (
                              <span className="text-sm font-bold">
                                {index + 1}
                              </span>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span
                                className={`font-medium ${
                                  milestone.completed
                                    ? "text-foreground"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {milestone.title}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {milestone.date}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4 border-t">
                <Button className="flex-1">
                  <Edit className="h-4 w-4 mr-2" />
                  Continue Application
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => openExternalLink(selectedApplication.website)}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit University Website
                </Button>
                <Button variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Admissions
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Exam Details Modal */}
      {isExamModalOpen && selectedExam && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedExam.exam}</h2>
                    <p className="text-lg text-muted-foreground">
                      {selectedExam.fullName}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant={
                          selectedExam.status === "registered"
                            ? "default"
                            : selectedExam.status === "preparing"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {selectedExam.status}
                      </Badge>
                      <Badge variant="outline">
                        {selectedExam.daysLeft} days left
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={closeExamModal}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-8">
              {/* Exam Overview */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Exam Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Date: {selectedExam.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{selectedExam.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        Duration: {selectedExam.duration}
                      </span>
                    </div>
                    {selectedExam.registrationId && (
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          ID: {selectedExam.registrationId}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Score & Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          Overall Progress
                        </span>
                        <span className="text-sm font-bold">
                          {selectedExam.progress}%
                        </span>
                      </div>
                      <Progress value={selectedExam.progress} className="h-3" />
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">
                            {selectedExam.score || "N/A"}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Current Score
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">
                            {selectedExam.target}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Target Score
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Section Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Section Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedExam.sections.map(
                      (section: Section, index: number) => (
                        <div key={index} className="p-4 rounded-lg border">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium text-sm">
                              {section.name}
                            </h4>
                            <Badge variant="outline" className="text-xs">
                              {section.progress}%
                            </Badge>
                          </div>
                          <Progress
                            value={section.progress}
                            className="h-2 mb-2"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Score: {section.score || "N/A"}</span>
                            <span>Target: {section.target}</span>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Practice Test History */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Practice Test History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedExam.practiceTests.map(
                      (test: PracticeTest, index: number) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg border"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-bold text-blue-600">
                                {index + 1}
                              </span>
                            </div>
                            <div>
                              <div className="font-medium text-sm">
                                {test.date}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Improvement: {test.improvement}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg">
                              {test.score}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Score
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Study Plan */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Study Plan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedExam.studyPlan.map(
                      (topic: StudyTopic, index: number) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 rounded-lg border"
                        >
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              topic.status === "completed"
                                ? "bg-green-500 text-white"
                                : "bg-gray-200 text-gray-500"
                            }`}
                          >
                            {topic.status === "completed" ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : (
                              <span className="text-xs font-bold">
                                {index + 1}
                              </span>
                            )}
                          </div>
                          <div className="flex-1">
                            <span
                              className={`font-medium text-sm ${
                                topic.status === "completed"
                                  ? "text-foreground"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {topic.topic}
                            </span>
                          </div>
                          <Badge
                            variant={
                              topic.priority === "high"
                                ? "destructive"
                                : topic.priority === "medium"
                                  ? "default"
                                  : "secondary"
                            }
                            className="text-xs"
                          >
                            {topic.priority}
                          </Badge>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Study Resources */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Study Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedExam.resources.map(
                      (resource: Resource, index: number) => (
                        <div key={index} className="p-4 rounded-lg border">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-sm">
                              {resource.name}
                            </h4>
                            <Badge
                              variant={
                                resource.status === "active"
                                  ? "default"
                                  : resource.status === "completed"
                                    ? "secondary"
                                    : resource.status === "in-progress"
                                      ? "outline"
                                      : "outline"
                              }
                              className="text-xs"
                            >
                              {resource.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mb-3">
                            Type: {resource.type}
                          </p>
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full"
                            onClick={() => openExternalLink(resource.url)}
                          >
                            <ExternalLink className="h-3 w-3 mr-2" />
                            Access Resource
                          </Button>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex justify-center pt-4 border-t">
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 min-w-[200px]"
                  onClick={() =>
                    openExternalLink(getExamOfficialWebsite(selectedExam.exam))
                  }
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Official Website
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scholarship Opportunities Modal */}
      {isScholarshipModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Award className="h-8 w-8 text-yellow-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">
                      Scholarship Opportunities
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      Find and apply for scholarships
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeScholarshipModal}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Scholarship List */}
              <div className="grid md:grid-cols-2 gap-6">
                {scholarshipOpportunities.map(scholarship => (
                  <Card
                    key={scholarship.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">
                          {scholarship.title}
                        </CardTitle>
                        <Badge
                          variant={
                            scholarship.applied ? "default" : "secondary"
                          }
                          className="text-xs"
                        >
                          {scholarship.applied
                            ? "Applied"
                            : `${scholarship.match}% match`}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="font-semibold text-green-600">
                          {scholarship.amount}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {scholarship.daysLeft} days left to apply
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {scholarship.match}% match with your profile
                        </span>
                      </div>
                      {!scholarship.applied ? (
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                          <Award className="h-4 w-4 mr-2" />
                          Apply Now
                        </Button>
                      ) : (
                        <Button variant="outline" className="w-full" disabled>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Application Submitted
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center pt-4 border-t">
                <Button
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 min-w-[200px]"
                  onClick={() =>
                    openExternalLink("https://www.scholarships.com")
                  }
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Find More Scholarships
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Exam Modal */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Calendar className="h-8 w-8 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Schedule Exam</h2>
                    <p className="text-lg text-muted-foreground">
                      Register for standardized tests
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={closeScheduleModal}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-8">
              {/* Available Exams */}
              <div className="space-y-6">
                {availableExams.map(exam => (
                  <Card
                    key={exam.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{exam.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {exam.fullName}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {exam.provider}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Exam Details */}
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{exam.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-semibold text-green-600">
                            {exam.cost}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Multiple locations</span>
                        </div>
                      </div>

                      {/* Available Dates */}
                      <div>
                        <h4 className="font-semibold mb-3">
                          Available Test Dates
                        </h4>
                        <div className="space-y-3">
                          {exam.nextDates.map((testDate, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 rounded-lg border"
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                  <Calendar className="h-4 w-4 text-purple-600" />
                                </div>
                                <div>
                                  <div className="font-medium text-sm">
                                    {testDate.date}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {testDate.location}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <Badge
                                  variant={
                                    testDate.spots > 10
                                      ? "default"
                                      : testDate.spots > 5
                                        ? "secondary"
                                        : "destructive"
                                  }
                                  className="text-xs"
                                >
                                  {testDate.spots} spots left
                                </Badge>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    openExternalLink(exam.registrationUrl)
                                  }
                                >
                                  Register
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Quick Register Button */}
                      <div className="pt-4 border-t">
                        <Button
                          className="w-full bg-purple-600 hover:bg-purple-700"
                          onClick={() => openExternalLink(exam.registrationUrl)}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Register for {exam.name}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Help Section */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">
                        Need Help Choosing?
                      </h4>
                      <p className="text-sm text-blue-800 mb-3">
                        Not sure which exam to take? Check your target
                        universities' requirements or consult with your academic
                        advisor.
                      </p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-blue-300 text-blue-700"
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          University Requirements
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-blue-300 text-blue-700"
                        >
                          <Users className="h-3 w-3 mr-1" />
                          Get Advice
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* Add Application Modal */}
      {isAddApplicationModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Plus className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Add New Application</h2>
                    <p className="text-lg text-muted-foreground">
                      Start your university application
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeAddApplicationModal}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Modal Content */}
            <div
              className="p-6 space-y-8"
              onClick={() => setShowSuggestions(false)}
            >
              {/* Search Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Search Universities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <div className="flex gap-4">
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          placeholder="Search universities by name, location, or program..."
                          value={searchQuery}
                          onChange={e => handleSearch(e.target.value)}
                          onFocus={() =>
                            setShowSuggestions(searchQuery.length > 0)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />

                        {/* Search Suggestions Dropdown */}
                        {showSuggestions && searchQuery.length > 0 && (
                          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                            {filteredUniversities.length > 0 ? (
                              filteredUniversities
                                .slice(0, 5)
                                .map(university => (
                                  <div
                                    key={university.id}
                                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                                    onClick={() => {
                                      setSearchQuery(university.name);
                                      setShowSuggestions(false);
                                      setFilteredUniversities([university]);
                                    }}
                                  >
                                    <div className="flex items-center gap-3">
                                      <img
                                        src={university.image}
                                        alt={university.name}
                                        className="w-8 h-8 rounded object-cover"
                                        onError={e => {
                                          e.currentTarget.src =
                                            "/placeholder-logo.svg";
                                        }}
                                      />
                                      <div>
                                        <p className="font-medium text-sm">
                                          {university.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                          {university.location}
                                        </p>
                                      </div>
                                      <Badge
                                        variant="outline"
                                        className="ml-auto text-xs"
                                      >
                                        #{university.ranking}
                                      </Badge>
                                    </div>
                                  </div>
                                ))
                            ) : (
                              <div className="px-4 py-3 text-gray-500 text-sm">
                                No universities found for "{searchQuery}"
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <Button
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={handleSearchSubmit}
                      >
                        <Search className="h-4 w-4 mr-2" />
                        Search
                      </Button>
                      {searchQuery && (
                        <Button
                          variant="outline"
                          onClick={() => {
                            setSearchQuery("");
                            setFilteredUniversities(popularUniversities);
                            setShowSuggestions(false);
                          }}
                        >
                          Clear
                        </Button>
                      )}
                    </div>

                    {/* Search Results Summary */}
                    {searchQuery && (
                      <div className="mt-3 text-sm text-gray-600">
                        {filteredUniversities.length > 0 ? (
                          <span>
                            Found {filteredUniversities.length} universit
                            {filteredUniversities.length === 1 ? "y" : "ies"}
                            {searchQuery && ` for "${searchQuery}"`}
                          </span>
                        ) : (
                          <span className="text-red-500">
                            No results found for "{searchQuery}"
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Popular Universities */}
              <div>
                <h3 className="text-xl font-semibold mb-6">
                  {searchQuery ? `Search Results` : `Popular Universities`}
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredUniversities.map(university => (
                    <Card
                      key={university.id}
                      className="hover:shadow-lg transition-shadow cursor-pointer"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <img
                            src={university.image}
                            alt={university.name}
                            className="w-16 h-16 rounded-lg object-cover"
                            onError={e => {
                              e.currentTarget.src = "/placeholder-logo.svg";
                            }}
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg">
                              {university.name}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {university.location}
                            </p>
                            <Badge variant="outline" className="mt-1 text-xs">
                              #{university.ranking}
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              Tuition:
                            </span>
                            <span className="font-medium">
                              {university.tuition}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              Acceptance:
                            </span>
                            <span className="font-medium">
                              {university.acceptance}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              Deadline:
                            </span>
                            <span className="font-medium">
                              {university.deadline}
                            </span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-xs text-muted-foreground mb-2">
                            Popular Programs:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {university.programs
                              .slice(0, 3)
                              .map((program: string, index: number) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {program}
                                </Badge>
                              ))}
                            {university.programs.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{university.programs.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="flex-1 bg-blue-600 hover:bg-blue-700"
                            onClick={() => {
                              // Here you would typically start the application process
                              console.log(
                                `Starting application for ${university.name}`
                              );
                              closeAddApplicationModal();
                            }}
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Apply Now
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              openExternalLink(
                                `https://www.${university.name.toLowerCase().replace(/\s+/g, "")}.edu`
                              )
                            }
                          >
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Can't find your university?
                      </h4>
                      <p className="text-sm text-gray-600">
                        Browse our complete database of 2,500+ universities
                        worldwide
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="border-gray-300 text-gray-700"
                      >
                        <Globe className="h-4 w-4 mr-2" />
                        Browse All Universities
                      </Button>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Custom University
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
