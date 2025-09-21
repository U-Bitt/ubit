import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { DetailedMilestoneTracker } from "@/components/DetailedMilestoneTracker";
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
  Globe,
  Search,
  Trash2,
} from "lucide-react";

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
interface University {
  id: string;
  name: string;
  location: string;
  ranking: number;
  programs: string[];
  tuition: string;
  acceptance: string;
  deadline: string;
  image: string;
}
interface SavedUniversity {
  id: number;
  name: string;
  location: string;
  ranking: number;
  image: string;
  programs: string[];
  tuition: string;
  acceptanceRate: string;
  savedDate: string;
  notes: string;
  website: string;
  applicationDeadline: string;
  requirements: string[];
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
  const [isUploadDocumentsModalOpen, setIsUploadDocumentsModalOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{
    id: string;
    name: string;
    type: string;
    category: string;
    file: File;
    status: 'uploading' | 'uploaded' | 'error';
  }>>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUniversities, setFilteredUniversities] = useState<University[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSavedUni, setSelectedSavedUni] = useState<SavedUniversity | null>(null);
  const [isSavedUniModalOpen, setIsSavedUniModalOpen] = useState(false);
  
  // Saved universities data
  const savedUniversities = [
    {
      id: 1,
      name: "Harvard University",
      location: "Cambridge, MA, USA",
      ranking: 1,
      image: "/harvard-campus.jpg",
      programs: ["Computer Science", "Business", "Medicine"],
      tuition: "$54,269/year",
      acceptanceRate: "3.4%",
      savedDate: "2024-11-15",
      notes: "Dream school - excellent CS program",
      website: "https://www.harvard.edu",
      applicationDeadline: "Jan 1, 2025",
      requirements: ["SAT/ACT", "TOEFL/IELTS", "Essays", "Recommendations"],
    },
    {
      id: 2,
      name: "MIT",
      location: "Cambridge, MA, USA", 
      ranking: 2,
      image: "/mit-campus-aerial.png",
      programs: ["Engineering", "Computer Science", "Physics"],
      tuition: "$57,986/year",
      acceptanceRate: "6.7%",
      savedDate: "2024-11-10",
      notes: "Strong engineering focus",
      website: "https://www.mit.edu",
      applicationDeadline: "Jan 1, 2025",
      requirements: ["SAT/ACT", "TOEFL/IELTS", "Essays", "Recommendations"],
    },
    {
      id: 3,
      name: "Stanford University",
      location: "Stanford, CA, USA",
      ranking: 3,
      image: "/stanford-campus.jpg",
      programs: ["Computer Science", "Engineering", "Business"],
      tuition: "$61,731/year",
      acceptanceRate: "4.3%",
      savedDate: "2024-11-05",
      notes: "Silicon Valley connections",
      website: "https://www.stanford.edu",
      applicationDeadline: "Jan 2, 2025",
      requirements: ["SAT/ACT", "TOEFL/IELTS", "Essays", "Recommendations"],
    },
    {
      id: 4,
      name: "University of Toronto",
      location: "Toronto, ON, Canada",
      ranking: 18,
      image: "/university-of-toronto-campus.png",
      programs: ["Computer Science", "Engineering", "Business"],
      tuition: "CAD $58,160/year",
      acceptanceRate: "43%",
      savedDate: "2024-10-28",
      notes: "Good backup option - lower cost",
      website: "https://www.utoronto.ca",
      applicationDeadline: "Jan 15, 2025",
      requirements: ["SAT/ACT", "IELTS/TOEFL", "Essays", "Transcripts"],
    },
  ];

  // Saved universities state - initialize with default data for SSR
  const [savedUnis, setSavedUnis] = useState<SavedUniversity[]>(savedUniversities);
  
  // Milestone progress state - initialize with default data for SSR
  const [milestoneProgress, setMilestoneProgress] = useState<{[key: string]: {completedSteps: number, status: "completed" | "current" | "upcoming"}}>({
    "1": { completedSteps: 4, status: "completed" },
    "2": { completedSteps: 3, status: "current" },
    "3": { completedSteps: 0, status: "upcoming" },
    "4": { completedSteps: 0, status: "upcoming" },
    "5": { completedSteps: 0, status: "upcoming" }
  });

  // User profile state
  const [userProfile, setUserProfile] = useState({
    personalInfo: {
      firstName: "Alex",
      lastName: "Smith",
      email: "alex.smith@email.com",
      phone: "+1 (555) 123-4567",
      dateOfBirth: "2005-03-15",
      nationality: "American",
      address: "123 Main St, New York, NY 10001",
      bio: "Passionate computer science student with a love for innovation and technology."
    },
    academicInfo: {
      gpa: "3.8/4.0",
      school: "International High School",
      graduationYear: "2024",
      major: "Computer Science",
    },
    testScores: [
      { id: 1, test: "SAT", score: "1450", date: "Dec 2024" },
      { id: 2, test: "TOEFL", score: "108", date: "Nov 2023" },
      { id: 3, test: "IELTS", score: "6", date: "July 2021" },
    ],
    interests: [
      "Computer Science",
      "Engineering", 
      "Research",
      "Innovation",
    ]
  });
  const [applications, setApplications] = useState([
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
  ]);
  const handleViewDetails = (application: Application) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };
  
  const handleDeleteApplication = (applicationId: number) => {
    if (confirm('Are you sure you want to delete this application? This action cannot be undone.')) {
      setApplications(prev => prev.filter(app => app.id !== applicationId));
      alert('Application deleted successfully!');
    }
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
  // Generate dynamic exam progress based on user profile
  const examProgress = useMemo(() => {
    const baseExams = [
    {
      id: 1,
      exam: "SAT",
      fullName: "Scholastic Assessment Test",
      date: "Dec 14, 2024",
      daysLeft: 2,
      target: "1500+",
      registrationId: "SAT-2024-12-14-12345",
      location: "Downtown Test Center, Ulaanbaatar",
      duration: "3 hours 45 minutes",
      sections: [
          { name: "Reading", target: 380 },
          { name: "Writing & Language", target: 370 },
          { name: "Math", target: 750 },
        ],
    },
    {
      id: 2,
      exam: "IELTS",
      fullName: "International English Language Testing System",
      date: "Jan 20, 2025",
      daysLeft: 39,
      target: "7.5+",
      registrationId: "IELTS-2025-01-20-67890",
      location: "British Council, Ulaanbaatar",
      duration: "2 hours 45 minutes",
      sections: [
          { name: "Listening", target: 7.5 },
          { name: "Reading", target: 7.5 },
          { name: "Writing", target: 7.0 },
          { name: "Speaking", target: 7.5 },
        ],
    },
    {
      id: 3,
      exam: "TOEFL",
      fullName: "Test of English as a Foreign Language",
        date: "Feb 15, 2025",
        daysLeft: 65,
        target: "110+",
        registrationId: "TOEFL-2025-02-15-11111",
        location: "International Test Center, Ulaanbaatar",
        duration: "3 hours 10 minutes",
      sections: [
          { name: "Reading", target: 30 },
          { name: "Listening", target: 28 },
          { name: "Speaking", target: 28 },
          { name: "Writing", target: 30 },
        ],
      },
    ];

    if (!userProfile || !userProfile.testScores) {
      // Return default exam progress if userProfile is not loaded yet
      return baseExams.map(exam => ({
        ...exam,
        score: "Not taken",
        progress: 0,
        status: "not-started",
        sections: exam.sections.map(section => ({
          ...section,
          score: 0,
          progress: 0,
          status: "not-started",
        })),
      }));
    }

    return baseExams.map(exam => {
      // Find user's test score for this exam
      const userTestScore = userProfile.testScores.find(score => 
        score.test.toLowerCase().includes(exam.exam.toLowerCase())
      );

      let score = "Not taken";
      let progress = 0;
      let status = "not-started";

      if (userTestScore) {
        score = userTestScore.score;
        
        // Calculate progress based on score vs target
        if (exam.exam === "SAT") {
          const currentScore = parseInt(score);
          const targetScore = parseInt(exam.target.replace("+", ""));
          progress = Math.min(Math.round((currentScore / targetScore) * 100), 100);
          status = currentScore >= targetScore ? "completed" : "preparing";
        } else if (exam.exam === "TOEFL") {
          const currentScore = parseInt(score);
          const targetScore = parseInt(exam.target.replace("+", ""));
          progress = Math.min(Math.round((currentScore / targetScore) * 100), 100);
          status = currentScore >= targetScore ? "completed" : "preparing";
        } else if (exam.exam === "IELTS") {
          const currentScore = parseFloat(score);
          const targetScore = parseFloat(exam.target.replace("+", ""));
          progress = Math.min(Math.round((currentScore / targetScore) * 100), 100);
          status = currentScore >= targetScore ? "completed" : "preparing";
        }

        // Generate section scores based on overall progress
        const sections = exam.sections.map(section => {
          let sectionScore = 0;
          let sectionProgress = 0;
          let sectionStatus = "not-started";

          if (exam.exam === "SAT") {
            if (section.name === "Math") {
              sectionScore = Math.round(750 * (progress / 100));
            } else {
              sectionScore = Math.round(370 * (progress / 100));
            }
            sectionProgress = Math.min(progress, 100);
          } else if (exam.exam === "TOEFL") {
            sectionScore = Math.round(parseInt(section.target) * (progress / 100));
            sectionProgress = Math.min(progress, 100);
          } else if (exam.exam === "IELTS") {
            sectionScore = Math.round(parseFloat(section.target) * (progress / 100) * 10) / 10;
            sectionProgress = Math.min(progress, 100);
          }

          if (sectionProgress >= 100) {
            sectionStatus = "completed";
          } else if (sectionProgress > 0) {
            sectionStatus = "in-progress";
          }

          return {
            ...section,
            score: sectionScore,
            progress: sectionProgress,
            status: sectionStatus,
          };
        });

        return {
          ...exam,
          score,
          progress,
          status,
          sections,
        };
      }

      // If no user test score, return exam with default values
      return {
        ...exam,
        score: "Not taken",
        progress: 0,
        status: "not-started",
        sections: exam.sections.map(section => ({
          ...section,
          score: 0,
          progress: 0,
          status: "not-started",
        })),
      };
    });
  }, [userProfile]);
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
  const openUploadDocumentsModal = () => {
    setIsUploadDocumentsModalOpen(true);
  };
  const closeUploadDocumentsModal = () => {
    setIsUploadDocumentsModalOpen(false);
  };

  // File upload functions
  const handleFileUpload = (category: string, fileType: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.jpg,.jpeg,.png';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const newFile = {
          id: Date.now().toString(),
          name: file.name,
          type: fileType,
          category: category,
          file: file,
          status: 'uploading' as const
        };
        
        setUploadedFiles(prev => [...prev, newFile]);
        
        // Simulate upload process
        setTimeout(() => {
          setUploadedFiles(prev => 
            prev.map(f => 
              f.id === newFile.id 
                ? { ...f, status: 'uploaded' as const }
                : f
            )
          );
        }, 2000);
      }
    };
    input.click();
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const uploadAllFiles = () => {
    const filesToUpload = uploadedFiles.filter(f => f.status === 'uploaded');
    if (filesToUpload.length === 0) {
      alert('No files to upload. Please select files first.');
      return;
    }
    
    // Simulate upload process
    alert(`Uploading ${filesToUpload.length} files...`);
    console.log('Files to upload:', filesToUpload);
    
    // In a real app, you would upload to a server here
    setTimeout(() => {
      alert('Files uploaded successfully!');
      setUploadedFiles([]);
      closeUploadDocumentsModal();
    }, 3000);
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
  const handleViewSavedUni = (university: SavedUniversity) => {
    setSelectedSavedUni(university);
    setIsSavedUniModalOpen(true);
  };
  const handleApplyToUni = (university: SavedUniversity) => {
    // Add to applications logic
    console.log('Adding to applications:', university.name);
    // You can implement the actual logic here
    alert(`Added ${university.name} to your applications!`);
  };
  const handleRemoveSavedUni = (universityId: number) => {
    setSavedUnis(prev => prev.filter(uni => uni.id !== universityId));
  };

  // Function to clear all saved data
  const clearAllSavedData = () => {
    if (confirm('Are you sure you want to clear all saved data? This action cannot be undone.')) {
      localStorage.removeItem('milestoneProgress');
      localStorage.removeItem('savedUniversities');
      localStorage.removeItem('applications');
      // Reset to default values
      setMilestoneProgress({
        "1": { completedSteps: 4, status: "completed" },
        "2": { completedSteps: 3, status: "current" },
        "3": { completedSteps: 0, status: "upcoming" },
        "4": { completedSteps: 0, status: "upcoming" },
        "5": { completedSteps: 0, status: "upcoming" }
      });
      setSavedUnis(savedUniversities);
      // Reset applications to default (keep the original 3 applications)
      setApplications([
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
          description: "The Computer Science program at MIT focuses on the fundamental principles of computing and their applications.",
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
            { name: "Letters of Recommendation", status: "pending", required: true },
            { name: "Portfolio", status: "not-required", required: false },
            { name: "Financial Aid Forms", status: "pending", required: false },
          ],
          milestones: [
            { title: "Application Started", date: "Nov 1, 2024", completed: true },
            { title: "Documents Uploaded", date: "Nov 15, 2024", completed: true },
            { title: "Personal Statement Draft", date: "Dec 1, 2024", completed: true },
            { title: "Letters of Recommendation", date: "Dec 20, 2024", completed: false },
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
          description: "Stanford's AI/ML program is one of the leading programs in artificial intelligence and machine learning.",
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
            { name: "Letters of Recommendation", status: "uploaded", required: true },
            { name: "Research Portfolio", status: "uploaded", required: false },
            { name: "Financial Aid Forms", status: "uploaded", required: false },
          ],
          milestones: [
            { title: "Application Started", date: "Oct 15, 2024", completed: true },
            { title: "Documents Uploaded", date: "Nov 1, 2024", completed: true },
            { title: "Personal Statement", date: "Nov 15, 2024", completed: true },
            { title: "Letters of Recommendation", date: "Dec 1, 2024", completed: true },
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
          description: "Harvard's Data Science program combines statistical methods with computational techniques for data analysis.",
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
            { name: "Letters of Recommendation", status: "pending", required: true },
            { name: "Leadership Portfolio", status: "not-started", required: false },
            { name: "Financial Aid Forms", status: "not-started", required: false },
          ],
          milestones: [
            { title: "Application Started", date: "Nov 20, 2024", completed: true },
            { title: "Documents Uploaded", date: "Dec 1, 2024", completed: false },
            { title: "Personal Statement Draft", date: "Dec 15, 2024", completed: false },
            { title: "Letters of Recommendation", date: "Dec 25, 2024", completed: false },
            { title: "Final Review", date: "Jan 10, 2025", completed: false },
            { title: "Submission", date: "Jan 15, 2025", completed: false },
          ],
        },
      ]);
      alert('All saved data has been cleared!');
    }
  };

  // Load data from localStorage on client-side mount
  useEffect(() => {
    // Load saved universities
    const savedUnis = localStorage.getItem('savedUniversities');
    if (savedUnis) {
      try {
        const parsedUnis = JSON.parse(savedUnis);
        setSavedUnis(parsedUnis);
      } catch (error) {
        console.error('Error loading saved universities:', error);
        // If there's an error parsing, use default data
        setSavedUnis(savedUniversities);
      }
    } else {
      // Ensure we always have the default 4 universities
      setSavedUnis(savedUniversities);
    }

    // Load saved applications
    const savedApps = localStorage.getItem('applications');
    if (savedApps) {
      try {
        const parsedApps = JSON.parse(savedApps);
        setApplications(parsedApps);
      } catch (error) {
        console.error('Error loading saved applications:', error);
        // If there's an error parsing, keep default applications
      }
    }

    // Load milestone progress
    const savedProgress = localStorage.getItem('milestoneProgress');
    if (savedProgress) {
      try {
        setMilestoneProgress(JSON.parse(savedProgress));
      } catch (error) {
        console.error('Error loading milestone progress:', error);
      }
    }

    // Load user profile data
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      try {
        setUserProfile(JSON.parse(savedProfile));
      } catch (error) {
        console.error('Error loading user profile:', error);
      }
    }
  }, []);

  // Save milestone progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('milestoneProgress', JSON.stringify(milestoneProgress));
  }, [milestoneProgress]);

  // Save saved universities to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('savedUniversities', JSON.stringify(savedUnis));
  }, [savedUnis]);

  // Save applications to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('applications', JSON.stringify(applications));
  }, [applications]);

  // Listen for user profile changes and update exam progress
  useEffect(() => {
    // This will trigger when userProfile changes
    // The exam progress will be recalculated based on new test scores
  }, [userProfile]);
  // Detailed milestones data with dynamic state
  const detailedMilestones = useMemo(() => [
    {
      id: "1",
      title: "Step 1: Research Universities",
      description: "Gather information about universities, requirements, rankings, and admission criteria",
      status: milestoneProgress["1"].status,
      date: "2024-10-01",
      category: "Research",
      priority: "high" as const,
      estimatedTime: "2-3 weeks",
      steps: [
        "Research university websites",
        "Check rankings and reputation",
        "Gather tuition and cost information",
        "Study admission requirements"
      ],
      completedSteps: milestoneProgress["1"].completedSteps,
      totalSteps: 4,
      tips: [
        "Get information from official university websites",
        "Consult with student representatives",
        "Study university history, specialties, and programs"
      ]
    },
    {
      id: "2", 
      title: "Step 2: Prepare Documents",
      description: "Prepare and verify all required documents for applications",
      status: milestoneProgress["2"].status,
      date: "2024-12-15",
      category: "Documents",
      priority: "high" as const,
      estimatedTime: "4-6 weeks",
      steps: [
        "Academic transcripts (diploma, grade reports)",
        "IELTS/TOEFL test scores",
        "Write personal statement",
        "Get recommendation letters",
        "Financial documents"
      ],
      completedSteps: milestoneProgress["2"].completedSteps,
      totalSteps: 5,
      tips: [
        "Translate documents to English",
        "Get official verification",
        "Write personal statement clearly and interestingly",
        "Contact recommenders in advance"
      ]
    },
    {
      id: "3",
      title: "Step 3: Submit Applications",
      description: "Complete and submit applications to all target universities",
      status: milestoneProgress["3"].status,
      date: "2024-12-31",
      category: "Application",
      priority: "high" as const,
      estimatedTime: "1-2 weeks",
      steps: [
        "Fill out online application forms",
        "Upload required documents",
        "Pay application fees",
        "Submit and verify",
        "Wait for confirmation"
      ],
      completedSteps: milestoneProgress["3"].completedSteps,
      totalSteps: 5,
      tips: [
        "Fill application forms carefully",
        "Complete all required fields",
        "Pay fees on time",
        "Wait for confirmation after submission"
      ]
    },
    {
      id: "4",
      title: "Step 4: Attend Interviews",
      description: "Participate in university interviews if required",
      status: milestoneProgress["4"].status,
      date: "2025-01-15",
      category: "Interview",
      priority: "medium" as const,
      estimatedTime: "1 week",
      steps: [
        "Schedule interview appointments",
        "Prepare for interviews",
        "Attend interviews",
        "Wait for results"
      ],
      completedSteps: milestoneProgress["4"].completedSteps,
      totalSteps: 4,
      tips: [
        "Research interview topics in advance",
        "Prepare self-introduction",
        "Prepare questions to ask",
        "Test technical setup beforehand"
      ]
    },
    {
      id: "5",
      title: "Step 5: Wait for Decisions",
      description: "Wait for admission decisions from universities",
      status: milestoneProgress["5"].status,
      date: "2025-03-15",
      category: "Decision",
      priority: "low" as const,
      estimatedTime: "2-3 months",
      steps: [
        "Wait for decision notifications",
        "Receive acceptance letters",
        "Make final choice",
        "Plan next steps"
      ],
      completedSteps: milestoneProgress["5"].completedSteps,
      totalSteps: 4,
      tips: [
        "Wait patiently for decision notifications",
        "Compare options if multiple acceptances",
        "Check financial aid and scholarships",
        "Prepare for next steps"
      ]
    }
  ], [milestoneProgress]);
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
                      } else if (action.action === "upload-docs") {
                        openUploadDocumentsModal();
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
          {/* Recent Activity */}
        <div className="mb-8">
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
        {/* Saved Universities */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Saved Universities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedUnis.map((university) => (
                  <div
                    key={university.id}
                    className="group relative bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all duration-200 hover:border-primary/20"
                  >
                    {/* University Image */}
                    <div className="relative h-32 w-full mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={university.image}
                        alt={university.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="text-xs">
                          #{university.ranking}
                        </Badge>
                      </div>
                    </div>
                    {/* University Info */}
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900 group-hover:text-primary transition-colors">
                          {university.name}
                        </h3>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {university.location}
                        </p>
                      </div>
                      {/* Programs */}
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Programs:</p>
                        <div className="flex flex-wrap gap-1">
                          {university.programs.slice(0, 2).map((program: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {program}
                        </Badge>
                          ))}
                          {university.programs.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{university.programs.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <p className="text-gray-500">Tuition</p>
                          <p className="font-medium">{university.tuition}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Acceptance</p>
                          <p className="font-medium">{university.acceptanceRate}</p>
                        </div>
                      </div>
                      {/* Notes */}
                      {university.notes && (
                        <div className="bg-gray-50 p-2 rounded text-xs text-gray-600">
                          <p className="font-medium mb-1">Notes:</p>
                          <p>{university.notes}</p>
                        </div>
                      )}
                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() => window.open(university.website, '_blank')}
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Visit Website
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleApplyToUni(university)}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Apply
                        </Button>
                      </div>
                      {/* Additional Action Buttons */}
                      <div className="flex gap-2 pt-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewSavedUni(university)}
                          className="flex-1"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View Details
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRemoveSavedUni(university.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      {/* Additional Info */}
                      <div className="text-xs text-gray-500 space-y-1">
                        <p>Deadline: {university.applicationDeadline}</p>
                        <p>Saved: {new Date(university.savedDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* View All Button */}
              <div className="mt-6 text-center">
                <Button 
                  variant="outline" 
                  className="w-full max-w-xs"
                  onClick={() => {
                    // Navigate to universities page or open a modal
                    alert(`Viewing all ${savedUnis.length} saved universities!`);
                    console.log('Saved universities:', savedUnis);
                    // In a real app, you would navigate to a universities page
                    // router.push('/universities?filter=saved');
                  }}
                >
                  <Search className="h-4 w-4 mr-2" />
                  View All Saved Universities
                </Button>
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
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewDetails(app)}
                        >
                          View Details
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDeleteApplication(app.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        {/* Cards in List Layout */}
        <div className="space-y-6 mb-8">
            {/* Exam Progress Tracker */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Exam Progress
                </CardTitle>
              </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Exam Progress Items */}
                <div className="space-y-4">
                  {examProgress.map((exam, index) => {
                    const getExamColor = (status: string) => {
                      switch (status) {
                        case "registered":
                          return {
                            bg: "from-blue-50 to-indigo-50",
                            border: "border-blue-200",
                            icon: "bg-blue-600",
                            text: "text-blue-600",
                            badge: "bg-blue-100 text-blue-800 border-blue-200"
                          };
                        case "preparing":
                          return {
                            bg: "from-orange-50 to-amber-50",
                            border: "border-orange-200",
                            icon: "bg-orange-600",
                            text: "text-orange-600",
                            badge: "bg-orange-100 text-orange-800 border-orange-200"
                          };
                        case "completed":
                          return {
                            bg: "from-green-50 to-emerald-50",
                            border: "border-green-200",
                            icon: "bg-green-600",
                            text: "text-green-600",
                            badge: "bg-green-100 text-green-800 border-green-200"
                          };
                        default:
                          return {
                            bg: "from-gray-50 to-slate-50",
                            border: "border-gray-200",
                            icon: "bg-gray-600",
                            text: "text-gray-600",
                            badge: "bg-gray-100 text-gray-800 border-gray-200"
                          };
                      }
                    };

                    const colors = getExamColor(exam.status);
                    const examInitials = exam.exam.split(' ').map(word => word[0]).join('').toUpperCase();

                    return (
                      <div key={index} className={`bg-gradient-to-r ${colors.bg} border ${colors.border} rounded-lg p-4 hover:shadow-md transition-all duration-200`}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 ${colors.icon} rounded-lg flex items-center justify-center`}>
                              <span className="text-white font-bold text-sm">{examInitials}</span>
                            </div>
                      <div>
                              <h4 className="font-semibold text-gray-900">{exam.exam}</h4>
                              <p className="text-sm text-gray-600">
                          {exam.date} ({exam.daysLeft} days left)
                        </p>
                      </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={`text-xs ${colors.badge}`}>
                              {exam.status === "registered" && <CheckCircle className="h-3 w-3 mr-1" />}
                              {exam.status === "preparing" && <Clock className="h-3 w-3 mr-1" />}
                              {exam.status === "completed" && <CheckCircle className="h-3 w-3 mr-1" />}
                              {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                      </Badge>
                          </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Progress</span>
                            <span className={`font-semibold ${colors.text}`}>{exam.progress}%</span>
                      </div>
                          <Progress value={exam.progress} className="h-3 bg-gray-200">
                            <div className={`h-3 bg-gradient-to-r ${colors.icon.replace('bg-', 'from-').replace('-600', '-500')} ${colors.icon.replace('bg-', 'to-')} rounded-full transition-all duration-300`} style={{ width: `${exam.progress}%` }} />
                          </Progress>
                    </div>
                        <div className="flex justify-between items-center mt-3 text-sm">
                          <div className="flex items-center gap-4">
                      {exam.score ? (
                              <div className="flex items-center gap-1 text-green-600">
                                <CheckCircle className="h-4 w-4" />
                                <span className="font-medium">Score: {exam.score}</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1 text-gray-600">
                                <Target className="h-4 w-4" />
                                <span>Target: {exam.target}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-1 text-gray-600">
                              <Calendar className="h-4 w-4" />
                              <span>{exam.date}</span>
                            </div>
                          </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleExamDetails(exam)}
                            className={`${colors.text} border-current hover:bg-opacity-10 transition-all duration-200`}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Details
                      </Button>
                    </div>
                  </div>
                    );
                  })}
                </div>

                {/* Exam Summary Stats */}
                <div className="bg-gradient-to-r from-gray-50 to-indigo-50 rounded-lg p-4 border border-gray-200">
                  <h5 className="font-semibold text-gray-900 mb-3">Exam Summary</h5>
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">
                        {examProgress.filter(e => e.status === "registered").length}
                      </div>
                      <div className="text-xs text-gray-600">Registered</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-600">
                        {examProgress.filter(e => e.status === "preparing").length}
                      </div>
                      <div className="text-xs text-gray-600">Preparing</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {examProgress.filter(e => e.status === "completed").length}
                      </div>
                      <div className="text-xs text-gray-600">Completed</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">
                        {Math.round(examProgress.reduce((acc, exam) => acc + exam.progress, 0) / examProgress.length)}%
                      </div>
                      <div className="text-xs text-gray-600">Avg Progress</div>
                    </div>
                  </div>
                </div>
              </div>
              </CardContent>
            </Card>

          {/* Overall Progress Card */}
            <Card>
              <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Overall Progress
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (confirm('Are you sure you want to reset all milestone progress? This action cannot be undone.')) {
                        setMilestoneProgress({
                          "1": { completedSteps: 0, status: "upcoming" },
                          "2": { completedSteps: 0, status: "upcoming" },
                          "3": { completedSteps: 0, status: "upcoming" },
                          "4": { completedSteps: 0, status: "upcoming" },
                          "5": { completedSteps: 0, status: "upcoming" }
                        });
                        // Set first milestone as current
                        setMilestoneProgress(prev => ({
                          ...prev,
                          "1": { ...prev["1"], status: "current" as const }
                        }));
                        alert('Milestone progress has been reset!');
                      }
                    }}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Reset Progress
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearAllSavedData}
                    className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                  >
                    Clear All Data
                  </Button>
                </div>
              </div>
              </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Application Progress Items */}
                <div className="space-y-4">
                  {applications.map((app) => {
                    // Get color scheme based on application
                    const getAppColor = (university: string) => {
                      switch (university.toLowerCase()) {
                        case 'mit':
                          return {
                            bg: 'from-blue-50 to-indigo-50',
                            border: 'border-blue-200',
                            icon: 'bg-blue-600',
                            text: 'text-blue-600',
                            initials: 'MIT'
                          };
                        case 'stanford':
                          return {
                            bg: 'from-green-50 to-emerald-50',
                            border: 'border-green-200',
                            icon: 'bg-green-600',
                            text: 'text-green-600',
                            initials: 'SU'
                          };
                        case 'harvard':
                          return {
                            bg: 'from-purple-50 to-violet-50',
                            border: 'border-purple-200',
                            icon: 'bg-purple-600',
                            text: 'text-purple-600',
                            initials: 'HU'
                          };
                        default:
                          return {
                            bg: 'from-gray-50 to-slate-50',
                            border: 'border-gray-200',
                            icon: 'bg-gray-600',
                            text: 'text-gray-600',
                            initials: app.university.substring(0, 2).toUpperCase()
                          };
                      }
                    };

                    const colors = getAppColor(app.university);
                    const isCompleted = app.status === 'Submitted';
                    const isInProgress = app.status === 'In Progress';
                    const isDraft = app.status === 'Draft';

                    return (
                      <div key={app.id} className={`bg-gradient-to-r ${colors.bg} border ${colors.border} rounded-lg p-4 hover:shadow-md transition-all duration-200`}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 ${colors.icon} rounded-lg flex items-center justify-center`}>
                              <span className="text-white font-bold text-sm">{colors.initials}</span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{app.university} Application</h4>
                              <p className="text-sm text-gray-600">{app.program}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant={isCompleted ? "default" : isInProgress ? "secondary" : "outline"}
                              className={
                                isCompleted 
                                  ? "bg-green-100 text-green-800 border-green-200"
                                  : isInProgress 
                                  ? "bg-orange-100 text-orange-800 border-orange-200"
                                  : "bg-gray-100 text-gray-800 border-gray-200"
                              }
                            >
                              {isCompleted && <CheckCircle className="h-3 w-3 mr-1" />}
                              {app.status}
                            </Badge>
                            <Badge variant="outline" className={
                              app.progress >= 80 ? "text-red-600 border-red-200" : 
                              app.progress >= 50 ? "text-orange-600 border-orange-200" : 
                              "text-blue-600 border-blue-200"
                            }>
                              {app.progress >= 80 ? "High Priority" : 
                               app.progress >= 50 ? "Medium Priority" : 
                               "Low Priority"}
                            </Badge>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Progress</span>
                            <span className={`font-semibold ${colors.text}`}>{app.progress}%</span>
                          </div>
                          <Progress value={app.progress} className="h-3 bg-gray-200">
                            <div 
                              className={`h-3 bg-gradient-to-r ${colors.icon.replace('bg-', 'from-').replace('-600', '-500')} ${colors.icon} rounded-full transition-all duration-300`} 
                              style={{ width: `${app.progress}%` }} 
                            />
                          </Progress>
                        </div>
                        <div className="flex justify-between items-center mt-3 text-sm">
                          <div className="flex items-center gap-1 text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span>Deadline: {app.deadline}</span>
                          </div>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className={`${colors.text} ${colors.border.replace('border-', 'border-')} hover:bg-opacity-10`}
                            onClick={() => handleViewDetails(app)}
                          >
                            {isCompleted ? (
                              <>
                                <CheckCircle className="h-3 w-3 mr-1" />
                                View Results
                              </>
                            ) : isDraft ? (
                              <>
                                <ExternalLink className="h-3 w-3 mr-1" />
                                Continue
                              </>
                            ) : (
                              <>
                                <ExternalLink className="h-3 w-3 mr-1" />
                                View Details
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Summary Stats */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-4 border border-gray-200">
                  <h5 className="font-semibold text-gray-900 mb-3">Application Summary</h5>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {applications.filter(app => app.status === 'Submitted').length}
                      </div>
                      <div className="text-xs text-gray-600">Completed</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">
                        {applications.filter(app => app.status === 'In Progress').length}
                      </div>
                      <div className="text-xs text-gray-600">In Progress</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">
                        {applications.filter(app => app.status === 'Draft').length}
                      </div>
                      <div className="text-xs text-gray-600">Draft</div>
                    </div>
                  </div>
                </div>
              </div>
              </CardContent>
            </Card>

          {/* University Application Milestones Card */}
          <DetailedMilestoneTracker 
            milestones={detailedMilestones}
            onStepComplete={(milestoneId, stepIndex) => {
              console.log(`Step ${stepIndex + 1} completed for milestone ${milestoneId}`);
              
              // Update milestone progress
              setMilestoneProgress(prev => {
                const updated = { ...prev };
                const currentProgress = updated[milestoneId];
                
                if (currentProgress) {
                  const newCompletedSteps = Math.max(currentProgress.completedSteps, stepIndex + 1);
                  updated[milestoneId] = {
                    ...currentProgress,
                    completedSteps: newCompletedSteps
                  };
                  
                  // Check if all steps are completed
                  const milestone = detailedMilestones.find(m => m.id === milestoneId);
                  if (milestone && newCompletedSteps >= milestone.totalSteps) {
                    updated[milestoneId] = {
                      ...updated[milestoneId],
                      status: "completed" as const
                    };
                  }
                }
                
                return updated;
              });
            }}
            onMilestoneComplete={(milestoneId) => {
              console.log(`Milestone ${milestoneId} completed`);
              
              // Mark milestone as completed
              setMilestoneProgress(prev => ({
                ...prev,
                [milestoneId]: {
                  ...prev[milestoneId],
                  status: "completed" as const
                }
              }));
              
              // Move to next milestone if it exists
              const currentIndex = detailedMilestones.findIndex(m => m.id === milestoneId);
              if (currentIndex < detailedMilestones.length - 1) {
                const nextMilestoneId = detailedMilestones[currentIndex + 1].id;
                setMilestoneProgress(prev => ({
                  ...prev,
                  [nextMilestoneId]: {
                    ...prev[nextMilestoneId],
                    status: "current" as const
                  }
                }));
              }
              
              // Show success message
              alert(`Congratulations! You've completed ${detailedMilestones.find(m => m.id === milestoneId)?.title}`);
            }}
            onStepUncomplete={(milestoneId, stepIndex) => {
              console.log(`Step ${stepIndex + 1} uncompleted for milestone ${milestoneId}`);
              
              // Update milestone progress
              setMilestoneProgress(prev => {
                const updated = { ...prev };
                const currentProgress = updated[milestoneId];
                
                if (currentProgress) {
                  const newCompletedSteps = Math.min(currentProgress.completedSteps, stepIndex);
                  updated[milestoneId] = {
                    ...currentProgress,
                    completedSteps: newCompletedSteps,
                    status: "current" as const // Reset to current when uncompleting
                  };
                }
                
                return updated;
              });
            }}
            onMilestoneUncomplete={(milestoneId) => {
              console.log(`Milestone ${milestoneId} uncompleted`);
              
              // Mark milestone as current (not completed)
              setMilestoneProgress(prev => ({
                ...prev,
                [milestoneId]: {
                  ...prev[milestoneId],
                  status: "current" as const
                }
              }));
              
              // Show message
              alert(`Milestone uncompleted: ${detailedMilestones.find(m => m.id === milestoneId)?.title}`);
            }}
          />
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
                <Button 
                  variant="outline"
                  onClick={() => {
                    // Open email client or contact form
                    const email = "admissions@" + selectedApplication.university.toLowerCase().replace(/\s+/g, '') + ".edu";
                    const subject = `Application Inquiry - ${selectedApplication.program}`;
                    const body = `Dear Admissions Office,\n\nI am writing to inquire about my application for the ${selectedApplication.program} program at ${selectedApplication.university}.\n\nApplication ID: ${selectedApplication.id}\nStatus: ${selectedApplication.status}\nProgress: ${selectedApplication.progress}%\n\nPlease let me know if you need any additional information.\n\nThank you,\n[Your Name]`;
                    
                    // Create mailto link
                    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                    window.open(mailtoLink, '_blank');
                    
                    // Also show an alert with contact info
                    alert(`Contacting ${selectedApplication.university} Admissions:\n\nEmail: ${email}\n\nThis will open your email client with a pre-filled message.`);
                  }}
                >
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
                              // Add new application to the applications list
                              const newApplication = {
                                id: applications.length + 1,
                                university: university.name,
                                program: university.programs[0] || "General Studies",
                                status: "Draft",
                                deadline: university.deadline,
                                progress: 0,
                                ranking: university.ranking,
                                location: university.location,
                                tuition: university.tuition,
                                acceptance: university.acceptance,
                                image: university.image,
                                description: `Application for ${university.name} - ${university.programs[0] || "General Studies"}`,
                                website: `https://www.${university.name.toLowerCase().replace(/\s+/g, "")}.edu`,
                                requirements: [
                                  "SAT/ACT scores",
                                  "High school transcripts",
                                  "Letters of recommendation",
                                  "Personal statement",
                                  "English proficiency test (if applicable)"
                                ],
                                documents: [
                                  { name: "High School Transcript", status: "not-started", required: true },
                                  { name: "SAT/ACT Scores", status: "not-started", required: true },
                                  { name: "Personal Statement", status: "not-started", required: true },
                                  { name: "Letters of Recommendation", status: "not-started", required: true },
                                  { name: "English Test Scores", status: "not-started", required: false }
                                ],
                                milestones: [
                                  { title: "Application Started", date: new Date().toISOString().split('T')[0], completed: true },
                                  { title: "Documents Uploaded", date: "", completed: false },
                                  { title: "Personal Statement", date: "", completed: false },
                                  { title: "Letters of Recommendation", date: "", completed: false },
                                  { title: "Final Review", date: "", completed: false },
                                  { title: "Submission", date: university.deadline, completed: false }
                                ]
                              };
                              
                              // Add to applications array
                              setApplications(prev => [...prev, newApplication]);
                              console.log('Adding new application:', newApplication);
                              alert(`Successfully added ${university.name} application!\n\nStatus: Draft\nProgress: 0%\nDeadline: ${university.deadline}\n\nYou can now track your progress in the Application Progress section.`);
                              
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
                        onClick={() => {
                          alert('Opening all universities page...');
                          console.log('Navigate to universities page');
                          // In a real app: router.push('/universities');
                        }}
                      >
                        <Globe className="h-4 w-4 mr-2" />
                        Browse All Universities
                      </Button>
                      <Button 
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => {
                          alert('Add Custom University feature coming soon!');
                          console.log('Open add custom university modal');
                          // In a real app: openAddCustomUniversityModal();
                        }}
                      >
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
      {/* Saved University Details Modal */}
      {isSavedUniModalOpen && selectedSavedUni && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                    <GraduationCap className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedSavedUni.name}</h2>
                    <p className="text-lg text-muted-foreground">
                      {selectedSavedUni.location}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary">
                        #{selectedSavedUni.ranking} Ranking
                      </Badge>
                      <Badge variant="outline">
                        {selectedSavedUni.acceptanceRate} Acceptance Rate
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setIsSavedUniModalOpen(false)}>
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
                      <MapPin className="h-5 w-5" />
                      University Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{selectedSavedUni.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Tuition: {selectedSavedUni.tuition}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Percent className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Acceptance Rate: {selectedSavedUni.acceptanceRate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Deadline: {selectedSavedUni.applicationDeadline}</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Programs Offered
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedSavedUni.programs.map((program: string, index: number) => (
                        <Badge key={index} variant="outline" className="mr-2 mb-2">
                          {program}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              {/* Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Application Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedSavedUni.requirements.map((req: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{req}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              {/* Notes */}
              {selectedSavedUni.notes && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Edit className="h-5 w-5" />
                      Your Notes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-700">{selectedSavedUni.notes}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
              {/* Action Buttons */}
              <div className="flex gap-4 pt-4 border-t">
                <Button 
                  className="flex-1"
                  onClick={() => handleApplyToUni(selectedSavedUni)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Apply to This University
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => window.open(selectedSavedUni.website, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit University Website
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleRemoveSavedUni(selectedSavedUni.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <X className="h-4 w-4 mr-2" />
                  Remove from Saved
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Upload Documents Modal */}
      {isUploadDocumentsModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Upload Documents</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={closeUploadDocumentsModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-6">
                {/* Document Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Academic Documents */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-blue-600" />
                        Academic Documents
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div 
                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer"
                        onClick={() => handleFileUpload('Academic', 'High School Transcript')}
                      >
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-2">High School Transcript</p>
                        <Button size="sm" variant="outline">
                          Choose File
                        </Button>
                      </div>
                      <div 
                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer"
                        onClick={() => handleFileUpload('Academic', 'Diploma/Certificate')}
                      >
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-2">Diploma/Certificate</p>
                        <Button size="sm" variant="outline">
                          Choose File
                        </Button>
                      </div>
                      <div 
                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer"
                        onClick={() => handleFileUpload('Academic', 'Academic Records')}
                      >
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-2">Academic Records</p>
                        <Button size="sm" variant="outline">
                          Choose File
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Test Scores */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-green-600" />
                        Test Scores
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div 
                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors cursor-pointer"
                        onClick={() => handleFileUpload('Test Scores', 'SAT/ACT Scores')}
                      >
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-2">SAT/ACT Scores</p>
                        <Button size="sm" variant="outline">
                          Choose File
                        </Button>
                      </div>
                      <div 
                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors cursor-pointer"
                        onClick={() => handleFileUpload('Test Scores', 'TOEFL/IELTS Scores')}
                      >
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-2">TOEFL/IELTS Scores</p>
                        <Button size="sm" variant="outline">
                          Choose File
                        </Button>
                      </div>
                      <div 
                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors cursor-pointer"
                        onClick={() => handleFileUpload('Test Scores', 'Other Test Scores')}
                      >
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-2">Other Test Scores</p>
                        <Button size="sm" variant="outline">
                          Choose File
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Personal Documents */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-purple-600" />
                      Personal Documents
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div 
                        className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-purple-400 transition-colors cursor-pointer"
                        onClick={() => handleFileUpload('Personal', 'Passport/ID')}
                      >
                        <Upload className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-2">Passport/ID</p>
                        <Button size="sm" variant="outline">
                          Choose File
                        </Button>
                      </div>
                      <div 
                        className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-purple-400 transition-colors cursor-pointer"
                        onClick={() => handleFileUpload('Personal', 'Recommendation Letters')}
                      >
                        <Upload className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-2">Recommendation Letters</p>
                        <Button size="sm" variant="outline">
                          Choose File
                        </Button>
                      </div>
                      <div 
                        className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-purple-400 transition-colors cursor-pointer"
                        onClick={() => handleFileUpload('Personal', 'Essays/Statements')}
                      >
                        <Upload className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-2">Essays/Statements</p>
                        <Button size="sm" variant="outline">
                          Choose File
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Uploaded Files List */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-orange-600" />
                      Uploaded Files
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {uploadedFiles.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                          <FileText className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                          <p>No files uploaded yet</p>
                          <p className="text-sm">Click on any upload area above to add files</p>
                        </div>
                      ) : (
                        uploadedFiles.map((file) => (
                          <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <FileText className="h-4 w-4 text-gray-500" />
                              <span className="text-sm font-medium">{file.name}</span>
                              <Badge variant="secondary" className="text-xs">{file.category}</Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge 
                                variant="outline" 
                                className={
                                  file.status === 'uploaded' 
                                    ? "text-green-600 border-green-200" 
                                    : file.status === 'uploading'
                                    ? "text-blue-600 border-blue-200"
                                    : "text-red-600 border-red-200"
                                }
                              >
                                {file.status === 'uploaded' ? 'Uploaded' : file.status === 'uploading' ? 'Uploading...' : 'Error'}
                              </Badge>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-red-600 hover:text-red-700"
                                onClick={() => removeFile(file.id)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button variant="outline" onClick={closeUploadDocumentsModal}>
                    Cancel
                  </Button>
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={uploadAllFiles}
                    disabled={uploadedFiles.length === 0}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Selected Files ({uploadedFiles.length})
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
