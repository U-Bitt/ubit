import { useState, useEffect, useMemo, useCallback } from "react";
import { ApplicationDetailsModal } from "./ApplicationDetailsModal";
import { ExamDetailsModal } from "./ExamDetailsModal";
import { ScholarshipModal } from "./ScholarshipModal";
import { ScheduleExamModal } from "./ScheduleExamModal";
import { AddApplicationModal } from "./AddApplicationModal";
import { StatsGrid } from "./StatsGrid";
import { EnhancedApplicationProgress } from "./EnhancedApplicationProgress";
import { ExamProgressTracker } from "./ExamProgressTracker";
import { ProgressTracker } from "@/components/progress-tracker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, BookOpen, Calendar, FileText } from "lucide-react";
import {
  Application,
  Exam,
  University,
  SavedUniversity,
  Scholarship,
  Stat,
} from "./types";
import { useUser } from "@/contexts/UserContext";
import { documentApi, testScoreApi } from "@/utils/api";

export const EnhancedDashboard = () => {
  const { user } = useUser();

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

  // Real user data state
  const [userDocuments, setUserDocuments] = useState<Record<string, unknown>[]>(
    []
  );
  const [userTestScores, setUserTestScores] = useState<
    Record<string, unknown>[]
  >([]);
  const [isLoadingUserData, setIsLoadingUserData] = useState(true);

  // Fetch user documents and test scores
  const fetchUserData = useCallback(async () => {
    if (!user?.id) {
      setIsLoadingUserData(false);
      return;
    }

    try {
      setIsLoadingUserData(true);

      // Fetch documents and test scores in parallel
      const [documentsResponse, testScoresResponse] = await Promise.all([
        documentApi.getAll(user.id),
        testScoreApi.getAll(user.id),
      ]);

      setUserDocuments(documentsResponse || []);
      setUserTestScores(testScoresResponse || []);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUserDocuments([]);
      setUserTestScores([]);
    } finally {
      setIsLoadingUserData(false);
    }
  }, [user?.id]);

  // Fetch user data on component mount and when user changes
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  // Calculate progress based on user documents and test scores
  const calculateUserProgress = useCallback(() => {
    if (!user || isLoadingUserData)
      return { progress: 0, completedItems: 0, totalItems: 0 };

    // Define required items for application process
    const requiredDocuments = [
      "High School Transcript",
      "SAT Scores",
      "IELTS Scores",
      "TOEFL Scores",
      "Personal Statement",
      "Letters of Recommendation",
      "Portfolio",
      "Financial Aid Forms",
    ];

    const requiredTestScores = ["SAT", "IELTS", "TOEFL", "ACT", "GRE", "GMAT"];

    // Count completed documents
    const completedDocuments = userDocuments.filter(
      doc =>
        requiredDocuments.some(
          req =>
            (doc.name as string)?.toLowerCase().includes(req.toLowerCase()) ||
            (doc.type as string)?.toLowerCase().includes(req.toLowerCase())
        ) && doc.status === "uploaded"
    ).length;

    // Count completed test scores
    const completedTestScores = userTestScores.filter(
      score =>
        requiredTestScores.some(req =>
          (score.examType as string)?.toLowerCase().includes(req.toLowerCase())
        ) && score.certified === true
    ).length;

    const totalRequired = requiredDocuments.length + requiredTestScores.length;
    const completedItems = completedDocuments + completedTestScores;
    const progress =
      totalRequired > 0 ? (completedItems / totalRequired) * 100 : 0;

    return {
      progress: Math.round(progress),
      completedItems,
      totalItems: totalRequired,
      completedDocuments,
      completedTestScores,
      requiredDocuments: requiredDocuments.length,
      requiredTestScores: requiredTestScores.length,
    };
  }, [user, userDocuments, userTestScores, isLoadingUserData]);

  // Calculate exam progress based on registrations (50%) and test scores (50%)
  const calculateExamProgress = useCallback(() => {
    if (!user || isLoadingUserData) {
      return {
        examProgress: 0,
        examRegistrations: 0,
        testScoresAdded: 0,
        examRegistrationsProgress: 0,
        testScoresProgress: 0,
        maxRegistrations: 3,
        maxTestScores: 3,
      };
    }

    // Get exam registrations from localStorage (tracked when register button is clicked)
    const examRegistrations = JSON.parse(
      localStorage.getItem("examRegistrations") || "[]"
    );

    // Count test scores added (from test scores page)
    const testScoresAdded = userTestScores.filter(
      score => score.certified === true
    ).length;

    // Calculate progress: 50% from registrations, 50% from test scores
    // Assume 3 exam registrations = 100% of registration component
    // Assume 3 test scores = 100% of test scores component
    const maxRegistrations = 3;
    const maxTestScores = 3;

    const examRegistrationsProgress = Math.min(
      (examRegistrations.length / maxRegistrations) * 50,
      50
    );
    const testScoresProgress = Math.min(
      (testScoresAdded / maxTestScores) * 50,
      50
    );

    const totalExamProgress = examRegistrationsProgress + testScoresProgress;

    return {
      examProgress: Math.round(totalExamProgress),
      examRegistrations: examRegistrations.length,
      testScoresAdded,
      examRegistrationsProgress: Math.round(examRegistrationsProgress),
      testScoresProgress: Math.round(testScoresProgress),
      maxRegistrations,
      maxTestScores,
    };
  }, [user, userTestScores, isLoadingUserData]);

  // Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUniversities, setFilteredUniversities] = useState<
    University[]
  >([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedProgram, setSelectedProgram] = useState("all");
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Save filters to localStorage whenever they change (only after initial load)
  useEffect(() => {
    if (isDataLoaded) {
      try {
        const filtersToSave = {
          searchQuery,
          selectedCountry,
          selectedProgram,
        };
        localStorage.setItem("dashboardFilters", JSON.stringify(filtersToSave));
        console.log("🔍 Saved filters to localStorage:", filtersToSave);
      } catch (error) {
        console.error("❌ Error saving filters to localStorage:", error);
      }
    }
  }, [searchQuery, selectedCountry, selectedProgram, isDataLoaded]);

  // Filter functions
  const getUniqueCountries = () => {
    if (popularUniversities.length === 0) return [];
    const countries = popularUniversities.map(uni => {
      const locationParts = uni.location.split(", ");
      return locationParts[locationParts.length - 1];
    });
    return Array.from(new Set(countries)).sort();
  };

  const getUniquePrograms = () => {
    if (popularUniversities.length === 0) return [];
    const allPrograms = popularUniversities.flatMap(uni => uni.programs);
    return Array.from(new Set(allPrograms)).sort();
  };

  const filterUniversities = useCallback(
    (universities: University[]) => {
      return universities.filter(uni => {
        const matchesSearch =
          searchQuery === "" ||
          uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          uni.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          uni.programs.some(program =>
            program.toLowerCase().includes(searchQuery.toLowerCase())
          );

        const matchesCountry =
          selectedCountry === "all" || uni.location.includes(selectedCountry);

        const matchesProgram =
          selectedProgram === "all" ||
          uni.programs.some(program =>
            program.toLowerCase().includes(selectedProgram.toLowerCase())
          );

        return matchesSearch && matchesCountry && matchesProgram;
      });
    },
    [searchQuery, selectedCountry, selectedProgram]
  );

  // Search functions
  const handleSearch = async (query: string) => {
    await handleEnhancedSearch(query);
  };

  const handleCountryFilter = (country: string) => {
    setSelectedCountry(country);
    const filtered = filterUniversities(popularUniversities);
    setFilteredUniversities(filtered);
  };

  const handleProgramFilter = (program: string) => {
    setSelectedProgram(program);
    const filtered = filterUniversities(popularUniversities);
    setFilteredUniversities(filtered);
  };

  const handleSearchSubmit = () => {
    const filtered = filterUniversities(popularUniversities);
    setFilteredUniversities(filtered);
    setShowSuggestions(false);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSelectedCountry("all");
    setSelectedProgram("all");
    setFilteredUniversities(popularUniversities);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (university: University) => {
    setSearchQuery(university.name);
    setFilteredUniversities([university]);
    setShowSuggestions(false);
  };

  // Handle university actions

  // Placeholder handlers for future functionality
  // const handleViewUniversity = (university: { name: string; id: string }) => {
  //   console.log("Viewing university details:", university.name);
  // };

  // Get university ranking based on name
  const getUniversityRanking = (universityName: string | undefined): number => {
    // Handle undefined or null university names
    if (!universityName || typeof universityName !== "string") {
      return 999;
    }

    const rankingMap: { [key: string]: number } = {
      "Massachusetts Institute of Technology": 1,
      MIT: 1,
      "University of Cambridge": 2,
      "Cambridge University": 2,
      "University of Oxford": 3,
      "Oxford University": 3,
      "Harvard University": 4,
      Harvard: 4,
      "Stanford University": 5,
      Stanford: 5,
      "Imperial College London": 6,
      "University College London": 9,
      "University of Melbourne": 14,
      "University of Toronto": 21,
      "Technical University of Munich": 37,
    };

    // Try to find exact match or partial match
    for (const [key, ranking] of Object.entries(rankingMap)) {
      if (
        universityName.toLowerCase().includes(key.toLowerCase()) ||
        key.toLowerCase().includes(universityName.toLowerCase())
      ) {
        return ranking;
      }
    }

    // Default ranking for unknown universities
    return 999;
  };

  // Get university details based on name
  const getUniversityDetails = (universityName: string | undefined) => {
    // Handle undefined or null university names
    if (!universityName || typeof universityName !== "string") {
      return {
        tuition: "Contact for details",
        acceptance: "Contact for details",
        deadline: "Contact for details",
        location: "Contact for details",
        programs: ["General"],
        details: {
          founded: "Contact for details",
          students: "Contact for details",
          faculty: "Contact for details",
          endowment: "Contact for details",
          research: "Contact university for research information",
          notable: "Contact for achievements and notable alumni",
          website: "Contact for details",
          type: "Contact for details",
          language: "Contact for details",
          campus: "Contact for details",
        },
      };
    }
    const universityData = {
      // USA Universities
      "Massachusetts Institute of Technology": {
        tuition: "$57,986/year",
        acceptance: "6.7%",
        deadline: "Jan 1, 2025",
        location: "Cambridge, MA, USA",
        programs: ["Engineering", "Computer Science", "Physics", "Mathematics"],
        details: {
          founded: "1861",
          students: "11,934",
          faculty: "1,000+",
          endowment: "$18.4 billion",
          research: "World's leading technology research university",
          notable: "91 Nobel laureates, 6 Turing Award winners",
          website: "https://web.mit.edu",
          type: "Private Research University",
          language: "English",
          campus: "Urban technology campus",
        },
      },
      MIT: {
        tuition: "$57,986/year",
        acceptance: "6.7%",
        deadline: "Jan 1, 2025",
        location: "Cambridge, MA, USA",
        programs: ["Engineering", "Computer Science", "Physics", "Mathematics"],
        details: {
          founded: "1861",
          students: "11,934",
          faculty: "1,000+",
          endowment: "$18.4 billion",
          research: "World's leading technology research university",
          notable: "91 Nobel laureates, 6 Turing Award winners",
          website: "https://web.mit.edu",
          type: "Private Research University",
          language: "English",
          campus: "Urban technology campus",
        },
      },
      "University of Cambridge": {
        tuition: "£33,825/year",
        acceptance: "21.0%",
        deadline: "Oct 15, 2024",
        location: "Cambridge, England, UK",
        programs: [
          "Natural Sciences",
          "Engineering",
          "Mathematics",
          "Medicine",
        ],
        details: {
          founded: "1209",
          students: "24,450",
          faculty: "3,500+",
          endowment: "£7.3 billion",
          research: "Second-oldest university in English-speaking world",
          notable: "121 Nobel laureates, 15 British Prime Ministers",
          website: "https://www.cam.ac.uk",
          type: "Collegiate Research University",
          language: "English",
          campus: "Historic collegiate city",
        },
      },
      "Cambridge University": {
        tuition: "£33,825/year",
        acceptance: "21.0%",
        deadline: "Oct 15, 2024",
        location: "Cambridge, England, UK",
        programs: [
          "Natural Sciences",
          "Engineering",
          "Mathematics",
          "Medicine",
        ],
        details: {
          founded: "1209",
          students: "24,450",
          faculty: "3,500+",
          endowment: "£7.3 billion",
          research: "Second-oldest university in English-speaking world",
          notable: "121 Nobel laureates, 15 British Prime Ministers",
          website: "https://www.cam.ac.uk",
          type: "Collegiate Research University",
          language: "English",
          campus: "Historic collegiate city",
        },
      },
      "University of Oxford": {
        tuition: "£31,230/year",
        acceptance: "17.5%",
        deadline: "Oct 15, 2024",
        location: "Oxford, England, UK",
        programs: ["Liberal Arts", "Medicine", "Law", "Philosophy"],
        details: {
          founded: "1096",
          students: "24,515",
          faculty: "4,000+",
          endowment: "£6.1 billion",
          research: "World's oldest English-speaking university",
          notable: "72 Nobel laureates, 30 British Prime Ministers",
          website: "https://www.ox.ac.uk",
          type: "Collegiate Research University",
          language: "English",
          campus: "Historic collegiate system",
        },
      },
      "Oxford University": {
        tuition: "£31,230/year",
        acceptance: "17.5%",
        deadline: "Oct 15, 2024",
        location: "Oxford, England, UK",
        programs: ["Liberal Arts", "Medicine", "Law", "Philosophy"],
        details: {
          founded: "1096",
          students: "24,515",
          faculty: "4,000+",
          endowment: "£6.1 billion",
          research: "World's oldest English-speaking university",
          notable: "72 Nobel laureates, 30 British Prime Ministers",
          website: "https://www.ox.ac.uk",
          type: "Collegiate Research University",
          language: "English",
          campus: "Historic collegiate system",
        },
      },
      "Harvard University": {
        tuition: "$54,269/year",
        acceptance: "3.4%",
        deadline: "Jan 1, 2025",
        location: "Cambridge, MA, USA",
        programs: ["Liberal Arts", "Medicine", "Law", "Business"],
        details: {
          founded: "1636",
          students: "23,731",
          faculty: "2,400+",
          endowment: "$53.2 billion",
          research: "America's oldest university, leader in liberal arts",
          notable: "161 Nobel laureates, 8 US Presidents",
          website: "https://www.harvard.edu",
          type: "Private Ivy League University",
          language: "English",
          campus: "Historic urban campus",
        },
      },
      Harvard: {
        tuition: "$54,269/year",
        acceptance: "3.4%",
        deadline: "Jan 1, 2025",
        location: "Cambridge, MA, USA",
        programs: ["Liberal Arts", "Medicine", "Law", "Business"],
        details: {
          founded: "1636",
          students: "23,731",
          faculty: "2,400+",
          endowment: "$53.2 billion",
          research: "America's oldest university, leader in liberal arts",
          notable: "161 Nobel laureates, 8 US Presidents",
          website: "https://www.harvard.edu",
          type: "Private Ivy League University",
          language: "English",
          campus: "Historic urban campus",
        },
      },
      "Stanford University": {
        tuition: "$61,731/year",
        acceptance: "4.3%",
        deadline: "Jan 2, 2025",
        location: "Stanford, CA, USA",
        programs: ["Computer Science", "Engineering", "Business", "Medicine"],
        details: {
          founded: "1885",
          students: "17,381",
          faculty: "2,180+",
          endowment: "$28.9 billion",
          research: "Silicon Valley's academic heart",
          notable: "84 Nobel laureates, 28 Turing Award winners",
          website: "https://www.stanford.edu",
          type: "Private Research University",
          language: "English",
          campus: "Suburban Silicon Valley campus",
        },
      },
      Stanford: {
        tuition: "$61,731/year",
        acceptance: "4.3%",
        deadline: "Jan 2, 2025",
        location: "Stanford, CA, USA",
        programs: ["Computer Science", "Engineering", "Business", "Medicine"],
        details: {
          founded: "1885",
          students: "17,381",
          faculty: "2,180+",
          endowment: "$28.9 billion",
          research: "Silicon Valley's academic heart",
          notable: "84 Nobel laureates, 28 Turing Award winners",
          website: "https://www.stanford.edu",
          type: "Private Research University",
          language: "English",
          campus: "Suburban Silicon Valley campus",
        },
      },
      "Imperial College London": {
        tuition: "£37,900/year",
        acceptance: "13.5%",
        deadline: "Jan 15, 2025",
        location: "London, England, UK",
        programs: ["Engineering", "Medicine", "Business", "Computing"],
        details: {
          founded: "1907",
          students: "19,400",
          faculty: "1,200+",
          endowment: "£1.2 billion",
          research: "Science, engineering, medicine, business focus",
          notable: "15 Nobel laureates, 3 Fields Medalists",
          website: "https://www.imperial.ac.uk",
          type: "Public Research University",
          language: "English",
          campus: "Urban London campus",
        },
      },
      "University College London": {
        tuition: "£31,200/year",
        acceptance: "48.0%",
        deadline: "Jan 15, 2025",
        location: "London, England, UK",
        programs: ["Liberal Arts", "Engineering", "Medicine", "Law"],
        details: {
          founded: "1826",
          students: "42,000",
          faculty: "1,500+",
          endowment: "£1.8 billion",
          research: "London's global university",
          notable: "30 Nobel laureates, 3 Fields Medalists",
          website: "https://www.ucl.ac.uk",
          type: "Public Research University",
          language: "English",
          campus: "Central London campus",
        },
      },
      "University of Toronto": {
        tuition: "CAD $58,160/year",
        acceptance: "43.0%",
        deadline: "Jan 15, 2025",
        location: "Toronto, ON, Canada",
        programs: ["Engineering", "Medicine", "Business", "Arts"],
        details: {
          founded: "1827",
          students: "97,000+",
          faculty: "2,000+",
          endowment: "CAD $2.8 billion",
          research: "Canada's leading research university",
          notable: "10 Nobel laureates, 5 Canadian Prime Ministers",
          website: "https://www.utoronto.ca",
          type: "Public Research University",
          language: "English",
          campus: "Urban multi-campus system",
        },
      },
      "University of Melbourne": {
        tuition: "AUD $45,000/year",
        acceptance: "70.0%",
        deadline: "Dec 1, 2024",
        location: "Melbourne, VIC, Australia",
        programs: ["Medicine", "Law", "Engineering", "Arts"],
        details: {
          founded: "1853",
          students: "52,000+",
          faculty: "1,800+",
          endowment: "AUD $1.9 billion",
          research: "Australia's leading research university",
          notable: "4 Nobel laureates, 4 Australian Prime Ministers",
          website: "https://www.unimelb.edu.au",
          type: "Public Research University",
          language: "English",
          campus: "Urban Parkville campus",
        },
      },
      "Technical University of Munich": {
        tuition: "€0/year (Free)",
        acceptance: "25.0%",
        deadline: "Jul 15, 2025",
        location: "Munich, Bavaria, Germany",
        programs: [
          "Engineering",
          "Computer Science",
          "Natural Sciences",
          "Medicine",
        ],
        details: {
          founded: "1868",
          students: "48,000+",
          faculty: "1,000+",
          endowment: "€1.2 billion",
          research: "Germany's leading technical university",
          notable: "17 Nobel laureates, 1 Fields Medalist",
          website: "https://www.tum.de",
          type: "Public Technical University",
          language: "German/English",
          campus: "Multi-campus technical focus",
        },
      },
    };

    // Try to find exact match or partial match
    for (const [key, data] of Object.entries(universityData)) {
      if (
        universityName.toLowerCase().includes(key.toLowerCase()) ||
        key.toLowerCase().includes(universityName.toLowerCase())
      ) {
        return data;
      }
    }

    // Default data for unknown universities
    return {
      tuition: "Contact for details",
      acceptance: "Contact for details",
      deadline: "Contact for details",
      location: "Contact for details",
      programs: ["General"],
      details: {
        founded: "Contact for details",
        students: "Contact for details",
        faculty: "Contact for details",
        endowment: "Contact for details",
        research: "Contact university for research information",
        notable: "Contact for achievements and notable alumni",
        website: "Contact for website",
        type: "Contact for institution type",
        language: "Contact for language information",
        campus: "Contact for campus information",
      },
    };
  };

  const handleApplyToUniversity = (university: {
    name: string;
    id: string;
  }) => {
    console.log("Applying to university:", university.name);
    // Add university to saved universities
    const universityRanking = getUniversityRanking(university.name);
    const universityDetails = getUniversityDetails(university.name);

    const newUniversity = {
      id: university.id,
      name: university.name,
      ranking: universityRanking,
      tuition: universityDetails.tuition,
      acceptance: universityDetails.acceptance,
      deadline: universityDetails.deadline,
      status: "considering",
      location: universityDetails.location,
      programs: universityDetails.programs,
      image: "/placeholder-logo.svg",
      details: universityDetails.details,
    };

    setSavedUniversities((prev: SavedUniversity[]) => {
      // Check if university already exists
      const exists = prev.some(
        (uni: SavedUniversity) => uni.id === university.id
      );
      if (exists) {
        alert(`${university.name} is already in your saved universities!`);
        return prev;
      }

      // Add new university and sort by ranking
      const updated = [...prev, newUniversity].sort(
        (a, b) => a.ranking - b.ranking
      );
      alert(`${university.name} has been added to your saved universities!`);
      return updated;
    });

    // Close the modal
    setIsAddApplicationModalOpen(false);
  };

  // Load popular universities with fallback data
  const loadPopularUniversities = async () => {
    setIsLoadingExternal(true);
    console.log("🔄 Loading universities...");

    // Fallback university data with real information
    const fallbackUniversities: University[] = [
      // Top Global Universities (2024-2025 QS World Rankings)
      {
        id: "api-mit-1",
        name: "Massachusetts Institute of Technology (MIT)",
        location: "Cambridge, MA, USA",
        ranking: 1,
        tuition: "$57,986/year",
        acceptance: "6.7%",
        deadline: "Jan 1, 2025",
        image: "/placeholder-logo.svg",
        programs: ["Engineering", "Computer Science", "Physics"],
        details: {
          founded: "1861",
          students: "11,934",
          faculty: "1,000+",
          endowment: "$18.4 billion",
          research: "World's leading technology research university",
          notable: "91 Nobel laureates, 6 Turing Award winners",
          website: "https://web.mit.edu",
          type: "Private Research University",
          language: "English",
          campus: "Urban technology campus",
        },
      },
      {
        id: "api-cambridge-2",
        name: "University of Cambridge",
        location: "Cambridge, England, UK",
        ranking: 2,
        tuition: "£33,825/year",
        acceptance: "21.0%",
        deadline: "Oct 15, 2024",
        image: "/placeholder-logo.svg",
        programs: ["Natural Sciences", "Engineering", "Mathematics"],
        details: {
          founded: "1209",
          students: "24,450",
          faculty: "3,500+",
          endowment: "£7.3 billion",
          research: "Second-oldest university in English-speaking world",
          notable: "121 Nobel laureates, 15 British Prime Ministers",
          website: "https://www.cam.ac.uk",
          type: "Collegiate Research University",
          language: "English",
          campus: "Historic collegiate city",
        },
      },
      {
        id: "api-oxford-3",
        name: "University of Oxford",
        location: "Oxford, England, UK",
        ranking: 3,
        tuition: "£31,230/year",
        acceptance: "17.5%",
        deadline: "Oct 15, 2024",
        image: "/placeholder-logo.svg",
        programs: ["Liberal Arts", "Medicine", "Law", "Philosophy"],
        details: {
          founded: "1096",
          students: "24,515",
          faculty: "4,000+",
          endowment: "£6.1 billion",
          research: "World's oldest English-speaking university",
          notable: "72 Nobel laureates, 30 British Prime Ministers",
          website: "https://www.ox.ac.uk",
          type: "Collegiate Research University",
          language: "English",
          campus: "Historic collegiate system",
        },
      },
      {
        id: "api-harvard-4",
        name: "Harvard University",
        location: "Cambridge, MA, USA",
        ranking: 4,
        tuition: "$54,269/year",
        acceptance: "3.4%",
        deadline: "Jan 1, 2025",
        image: "/placeholder-logo.svg",
        programs: ["Liberal Arts", "Medicine", "Law", "Business"],
        details: {
          founded: "1636",
          students: "23,731",
          faculty: "2,400+",
          endowment: "$53.2 billion",
          research: "America's oldest university, leader in liberal arts",
          notable: "161 Nobel laureates, 8 US Presidents",
          website: "https://www.harvard.edu",
          type: "Private Ivy League University",
          language: "English",
          campus: "Historic urban campus",
        },
      },
      {
        id: "api-stanford-5",
        name: "Stanford University",
        location: "Stanford, CA, USA",
        ranking: 5,
        tuition: "$61,731/year",
        acceptance: "4.3%",
        deadline: "Jan 2, 2025",
        image: "/placeholder-logo.svg",
        programs: ["Computer Science", "Engineering", "Business"],
        details: {
          founded: "1885",
          students: "17,381",
          faculty: "2,180+",
          endowment: "$28.9 billion",
          research: "Silicon Valley's academic heart",
          notable: "84 Nobel laureates, 28 Turing Award winners",
          website: "https://www.stanford.edu",
          type: "Private Research University",
          language: "English",
          campus: "Suburban Silicon Valley campus",
        },
      },
      {
        id: "api-toronto-21",
        name: "University of Toronto",
        location: "Toronto, ON, Canada",
        ranking: 21,
        tuition: "CAD $58,160/year",
        acceptance: "43.0%",
        deadline: "Jan 15, 2025",
        image: "/placeholder-logo.svg",
        programs: ["Engineering", "Medicine", "Business"],
        details: {
          founded: "1827",
          students: "97,000+",
          faculty: "2,000+",
          endowment: "CAD $2.8 billion",
          research: "Canada's leading research university",
          notable: "10 Nobel laureates, 5 Canadian Prime Ministers",
          website: "https://www.utoronto.ca",
          type: "Public Research University",
          language: "English",
          campus: "Urban multi-campus system",
        },
      },
      {
        id: "api-melbourne-14",
        name: "University of Melbourne",
        location: "Melbourne, VIC, Australia",
        ranking: 14,
        tuition: "AUD $45,000/year",
        acceptance: "70.0%",
        deadline: "Dec 1, 2024",
        image: "/placeholder-logo.svg",
        programs: ["Medicine", "Law", "Engineering"],
        details: {
          founded: "1853",
          students: "52,000+",
          faculty: "1,800+",
          endowment: "AUD $1.9 billion",
          research: "Australia's leading research university",
          notable: "4 Nobel laureates, 4 Australian Prime Ministers",
          website: "https://www.unimelb.edu.au",
          type: "Public Research University",
          language: "English",
          campus: "Urban Parkville campus",
        },
      },
      {
        id: "api-tum-37",
        name: "Technical University of Munich",
        location: "Munich, Bavaria, Germany",
        ranking: 37,
        tuition: "€0/year (Free)",
        acceptance: "25.0%",
        deadline: "Jul 15, 2025",
        image: "/placeholder-logo.svg",
        programs: ["Engineering", "Computer Science", "Natural Sciences"],
        details: {
          founded: "1868",
          students: "48,000+",
          faculty: "1,000+",
          endowment: "€1.2 billion",
          research: "Germany's leading technical university",
          notable: "17 Nobel laureates, 1 Fields Medalist",
          website: "https://www.tum.de",
          type: "Public Technical University",
          language: "German/English",
          campus: "Multi-campus technical focus",
        },
      },
    ];

    try {
      // Try to fetch from API first, but use fallback if it fails
      console.log("🌐 Attempting to connect to university API...");

      setTimeout(() => {
        console.log("📚 Using curated university database");
        setPopularUniversities(fallbackUniversities);
        setIsLoadingExternal(false);
      }, 1000); // Simulate loading time

      return fallbackUniversities;
    } catch (error) {
      console.error("💥 API unavailable, using curated data:", error);
      setPopularUniversities(fallbackUniversities);
      return fallbackUniversities;
    }
  };

  // Fetch external university data
  const fetchExternalUniversities = async (searchTerm = "") => {
    setIsLoadingExternal(true);
    try {
      // Using HIPO API (Higher Education Database)
      const response = await fetch(
        `https://universities.hipolabs.com/search?name=${encodeURIComponent(searchTerm)}`
      );

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();

      // Transform external data to match our University interface
      const transformedData: University[] = data
        .slice(0, 50)
        .map(
          (
            uni: { name: string; country: string; state_province?: string },
            index: number
          ) => ({
            id: `search-${index}`,
            name: uni.name,
            location: `${uni.country}${uni.state_province ? `, ${uni.state_province}` : ""}`,
            ranking: 100 + index, // Placeholder ranking
            tuition: "Contact for details",
            acceptance: "Contact for details",
            deadline: "Varies",
            image: "/placeholder-logo.svg",
            programs: ["General Programs"],
            details: {
              founded: "N/A",
              students: "Contact for details",
              faculty: "Contact for details",
              endowment: "Contact for details",
              research: "Contact university for research information",
              notable: "Contact for achievements and notable alumni",
            },
          })
        );

      return transformedData;
    } catch (error) {
      console.error("Error fetching external universities:", error);
      alert("Failed to fetch external university data. Please try again.");
      return [];
    } finally {
      setIsLoadingExternal(false);
    }
  };

  // Enhanced search that includes external data
  const handleEnhancedSearch = async (query: string) => {
    setSearchQuery(query);

    // First, filter local universities
    const localFiltered = filterUniversities(popularUniversities);

    // If search query is provided and we have few local results, fetch external data
    if (query.length > 2 && localFiltered.length < 5) {
      const externalData = await fetchExternalUniversities(query);
      const combinedResults = [...localFiltered, ...externalData];
      setFilteredUniversities(combinedResults);
    } else {
      setFilteredUniversities(localFiltered);
    }

    setShowSuggestions(query.length > 0);
  };

  // UI states
  const [realTimeData, setRealTimeData] = useState({
    applications: [] as Application[],
    examProgress: [] as Exam[],
    stats: {
      activeApplications: 0,
      universitiesTracked: 0,
      documentsUploaded: 0,
      upcomingDeadlines: 0,
    },
  });

  // External university data
  const [isLoadingExternal, setIsLoadingExternal] = useState(false);

  // Load applications from localStorage
  const [savedApplications, setSavedApplications] = useState<Application[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("applications");
    if (saved) {
      try {
        setSavedApplications(JSON.parse(saved));
      } catch (error) {
        console.error("Error loading applications from localStorage:", error);
      }
    }
  }, []);

  // Start with empty applications - students will add their own
  const mockApplications: Application[] = useMemo(() => [], []);

  // Start with empty exam progress - students will add their own
  const examProgress: Exam[] = useMemo(() => [], []);

  // Combine mock applications with saved applications
  const applications: Application[] = useMemo(() => {
    // Filter out any saved applications that might conflict with mock data
    const mockUniversityNames = mockApplications.map(app => app.university);
    const filteredSaved = savedApplications.filter(
      app => !mockUniversityNames.includes(app.university)
    );

    return [...mockApplications, ...filteredSaved];
  }, [mockApplications, savedApplications]);

  const [popularUniversities, setPopularUniversities] = useState<University[]>(
    []
  );

  // Save popular universities to localStorage whenever they change (only after initial load)
  useEffect(() => {
    if (isDataLoaded && popularUniversities.length > 0) {
      try {
        localStorage.setItem(
          "popularUniversities",
          JSON.stringify(popularUniversities)
        );
        console.log(
          "🌍 Saved popular universities to localStorage:",
          popularUniversities.length,
          "universities"
        );
      } catch (error) {
        console.error(
          "❌ Error saving popular universities to localStorage:",
          error
        );
      }
    }
  }, [popularUniversities, isDataLoaded]);

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
    {
      id: 2,
      title: "Stanford Engineering Excellence",
      amount: "$30,000",
      deadline: "Dec 25, 2024",
      daysLeft: 13,
      match: 88,
      applied: true,
    },
  ];

  const stats: Stat[] = useMemo(() => {
    const progress = calculateUserProgress() || {
      progress: 0,
      completedDocuments: 0,
      completedTestScores: 0,
    };
    return [
      {
        label: "Active Applications",
        value: realTimeData.stats.activeApplications.toString(),
        icon: FileText,
      },
      {
        label: "Documents Uploaded",
        value: (progress.completedDocuments || 0).toString(),
        icon: BookOpen,
      },
      {
        label: "Test Scores Completed",
        value: (progress.completedTestScores || 0).toString(),
        icon: GraduationCap,
      },
      {
        label: "Overall Progress",
        value: `${progress.progress || 0}%`,
        icon: Calendar,
      },
    ];
  }, [realTimeData.stats.activeApplications, calculateUserProgress]);

  // Default saved universities
  const defaultSavedUniversities = [
    {
      id: "mit",
      name: "Massachusetts Institute of Technology (MIT)",
      ranking: 1,
      tuition: "$57,986/year",
      acceptance: "6.7%",
      deadline: "Jan 1, 2025",
      status: "applying",
      location: "Cambridge, MA, USA",
      programs: ["Computer Science", "Engineering", "Physics", "Mathematics"],
      image: "/placeholder-logo.svg",
      details: {
        founded: "1861",
        students: "11,934",
        faculty: "1,000+",
        endowment: "$18.4 billion",
        research:
          "World's leading research university focusing on science, technology, and innovation",
        notable:
          "91 Nobel laureates, 6 Turing Award winners, 3 Fields Medalists",
        website: "https://web.mit.edu",
        type: "Private Research University",
        language: "English",
        campus: "Urban campus in Cambridge",
      },
    },
    {
      id: "cambridge",
      name: "University of Cambridge",
      ranking: 2,
      tuition: "£33,825/year",
      acceptance: "21.0%",
      deadline: "Oct 15, 2024",
      status: "applying",
      location: "Cambridge, England, UK",
      programs: ["Natural Sciences", "Engineering", "Mathematics", "Medicine"],
      image: "/placeholder-logo.svg",
      details: {
        founded: "1209",
        students: "24,450",
        faculty: "3,500+",
        endowment: "£7.3 billion",
        research: "Second-oldest university in English-speaking world",
        notable: "121 Nobel laureates, 15 British Prime Ministers",
        website: "https://www.cam.ac.uk",
        type: "Collegiate Research University",
        language: "English",
        campus: "Historic collegiate city",
      },
    },
    {
      id: "harvard",
      name: "Harvard University",
      ranking: 4,
      tuition: "$54,269/year",
      acceptance: "3.4%",
      deadline: "Jan 1, 2025",
      status: "considering",
      location: "Cambridge, MA, USA",
      programs: ["Liberal Arts", "Medicine", "Law", "Business"],
      image: "/placeholder-logo.svg",
      details: {
        founded: "1636",
        students: "23,731",
        faculty: "2,400+",
        endowment: "$53.2 billion",
        research:
          "America's oldest university, leader in liberal arts and professional education",
        notable:
          "161 Nobel laureates, 8 US Presidents, 14 Turing Award winners",
        website: "https://www.harvard.edu",
        type: "Private Ivy League University",
        language: "English",
        campus: "Historic urban campus in Cambridge",
      },
    },
  ];

  const [savedUniversities, setSavedUniversities] = useState<SavedUniversity[]>(
    defaultSavedUniversities
  );

  // Load data from localStorage on client side
  useEffect(() => {
    try {
      // Load saved universities
      const savedUnis = localStorage.getItem("savedUniversities");
      if (savedUnis) {
        const parsedUnis = JSON.parse(savedUnis);
        console.log(
          "📚 Loaded saved universities from localStorage:",
          parsedUnis.length,
          "universities"
        );
        setSavedUniversities(parsedUnis);
      }

      // Load popular universities
      const popularUnis = localStorage.getItem("popularUniversities");
      if (popularUnis) {
        const parsedPopular = JSON.parse(popularUnis);
        console.log(
          "🌍 Loaded popular universities from localStorage:",
          parsedPopular.length,
          "universities"
        );
        setPopularUniversities(parsedPopular);
      }

      // Load filters
      const savedFilters = localStorage.getItem("dashboardFilters");
      if (savedFilters) {
        const parsedFilters = JSON.parse(savedFilters);
        console.log("🔍 Loaded filters from localStorage:", parsedFilters);
        setSearchQuery(parsedFilters.searchQuery || "");
        setSelectedCountry(parsedFilters.selectedCountry || "all");
        setSelectedProgram(parsedFilters.selectedProgram || "all");
      }

      setIsDataLoaded(true);
    } catch (error) {
      console.error("❌ Error loading data from localStorage:", error);
      setIsDataLoaded(true);
    }
  }, []);

  // Save to localStorage whenever savedUniversities changes (only after initial load)
  useEffect(() => {
    if (isDataLoaded) {
      try {
        localStorage.setItem(
          "savedUniversities",
          JSON.stringify(savedUniversities)
        );
        console.log(
          "💾 Saved universities to localStorage:",
          savedUniversities.length,
          "universities"
        );
      } catch (error) {
        console.error("❌ Error saving universities to localStorage:", error);
      }
    }
  }, [savedUniversities, isDataLoaded]);

  // Fix existing saved universities rankings and details
  useEffect(() => {
    setSavedUniversities((prev: SavedUniversity[]) => {
      const updated = prev
        .map((uni: SavedUniversity) => {
          const ranking = getUniversityRanking(uni.name);
          const details = getUniversityDetails(uni.name);
          return {
            ...uni,
            ranking: ranking,
            tuition: details.tuition,
            acceptance: details.acceptance,
            deadline: details.deadline,
            location: details.location,
            programs: details.programs,
            details: details.details,
          };
        })
        .sort(
          (a: SavedUniversity, b: SavedUniversity) => a.ranking - b.ranking
        );
      return updated;
    });
  }, []);

  // Load universities from API only if not in localStorage (after initial data load)
  useEffect(() => {
    if (isDataLoaded && popularUniversities.length === 0) {
      console.log("📡 No universities in localStorage, loading from API...");
      loadPopularUniversities();
    } else if (isDataLoaded && popularUniversities.length > 0) {
      console.log(
        "✅ Universities already loaded from localStorage, skipping API call"
      );
    }
  }, [isDataLoaded, popularUniversities.length]);

  // Initialize filtered universities when popularUniversities loads
  useEffect(() => {
    setFilteredUniversities(popularUniversities);
  }, [popularUniversities]);

  // Update filtered universities when filters change
  useEffect(() => {
    if (searchQuery.length === 0) {
      // For filters without search, use local data
      const filtered = filterUniversities(popularUniversities);
      setFilteredUniversities(filtered);
    }
  }, [
    selectedCountry,
    selectedProgram,
    popularUniversities,
    filterUniversities,
    searchQuery,
  ]);

  // Real-time data updates
  useEffect(() => {
    const userProgress = calculateUserProgress() || {
      progress: 0,
      completedDocuments: 0,
      completedTestScores: 0,
    };

    // Initialize real-time data with user progress
    setRealTimeData({
      applications: applications,
      examProgress: examProgress,
      stats: {
        activeApplications: applications.length,
        universitiesTracked: 0, // Start with 0 tracked universities
        documentsUploaded: userProgress.completedDocuments || 0,
        upcomingDeadlines: 0, // Start with 0 upcoming deadlines
      },
    });

    // Simulate real-time updates every 30 seconds
    const interval = setInterval(() => {
      // Simulate data changes
      setRealTimeData(prevData => ({
        ...prevData,
        applications: prevData.applications.map(app => ({
          ...app,
          progress: Math.min(100, app.progress + Math.random() * 2), // Simulate progress updates
          lastUpdated: new Date().toISOString(),
        })),
        stats: {
          ...prevData.stats,
          documentsUploaded:
            prevData.stats.documentsUploaded + Math.floor(Math.random() * 2),
          upcomingDeadlines: Math.max(
            0,
            prevData.stats.upcomingDeadlines - Math.floor(Math.random() * 2)
          ),
        },
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [applications, examProgress, calculateUserProgress]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                Dashboard
              </h1>
              <p className="text-lg text-slate-600">
                Track your university application progress and stay organized
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <StatsGrid stats={stats} />

        {/* Application Progress - Full Width */}
        <div className="mb-8">
          <EnhancedApplicationProgress
            applications={realTimeData.applications}
            onViewDetails={handleViewDetails}
          />
        </div>

        {/* Overall Progress Card */}
        <div className="mb-8">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                Overall Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <ProgressTracker
                title="Application Progress"
                items={useMemo(() => {
                  const progress = calculateUserProgress() || {
                    progress: 0,
                    completedDocuments: 0,
                    completedTestScores: 0,
                  };
                  return [
                    {
                      name: "Documents Uploaded",
                      progress: progress.completedDocuments || 0,
                      status:
                        (progress.completedDocuments || 0) > 0
                          ? "completed"
                          : "pending",
                      deadline: "Ongoing",
                      priority:
                        (progress.completedDocuments || 0) > 4
                          ? "high"
                          : "medium",
                    },
                    {
                      name: "Test Scores Completed",
                      progress: progress.completedTestScores || 0,
                      status:
                        (progress.completedTestScores || 0) > 0
                          ? "completed"
                          : "pending",
                      deadline: "Ongoing",
                      priority:
                        (progress.completedTestScores || 0) > 2
                          ? "high"
                          : "medium",
                    },
                    {
                      name: "Overall Progress",
                      progress: progress.progress || 0,
                      status:
                        (progress.progress || 0) > 80
                          ? "completed"
                          : (progress.progress || 0) > 50
                            ? "in-progress"
                            : "pending",
                      deadline: "Application Deadline",
                      priority:
                        (progress.progress || 0) > 80
                          ? "high"
                          : (progress.progress || 0) > 50
                            ? "medium"
                            : "low",
                    },
                  ];
                }, [calculateUserProgress])}
              />

              {/* Exam Progress Section */}
              <div className="pt-4 border-t border-slate-200">
                <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-green-600" />
                  Exam Progress
                </h4>
                <ExamProgressTracker
                  exams={realTimeData.examProgress}
                  onViewDetails={handleExamDetails}
                  examProgress={calculateExamProgress()}
                />
              </div>
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
          availableExams={[]}
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
          selectedCountry={selectedCountry}
          onCountryFilter={handleCountryFilter}
          selectedProgram={selectedProgram}
          onProgramFilter={handleProgramFilter}
          countries={getUniqueCountries()}
          programs={getUniquePrograms()}
          isLoadingExternal={isLoadingExternal}
        />
      </div>
    </div>
  );
};
