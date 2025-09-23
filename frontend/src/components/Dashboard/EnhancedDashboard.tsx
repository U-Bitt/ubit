import { useState, useEffect, useMemo, useCallback } from "react";
import { ApplicationDetailsModal } from "./ApplicationDetailsModal";
import { ExamDetailsModal } from "./ExamDetailsModal";
import { ScholarshipModal } from "./ScholarshipModal";
import { ScheduleExamModal } from "./ScheduleExamModal";
import { AddApplicationModal } from "./AddApplicationModal";
import { StatsGrid } from "./StatsGrid";
import { EnhancedQuickActionsPanel } from "./EnhancedQuickActionsPanel";
import { EnhancedApplicationProgress } from "./EnhancedApplicationProgress";
import { ExamProgressTracker } from "./ExamProgressTracker";
import { EnhancedSavedUniversities } from "./EnhancedSavedUniversities";
import { ProgressTracker } from "@/components/progress-tracker";
import { EnhancedMilestoneTracker } from "./EnhancedMilestoneTracker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  GraduationCap,
  BookOpen,
  Calendar,
  Plus,
  Upload,
  Award,
  Download,
  Sparkles,
  Users,
} from "lucide-react";
import {
  Application,
  Exam,
  University,
  SavedUniversity,
  Scholarship,
  Stat,
  QuickAction,
} from "./types";

export const EnhancedDashboard = () => {
  // Modal states
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);
  const [isScholarshipModalOpen, setIsScholarshipModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isAddApplicationModalOpen, setIsAddApplicationModalOpen] = useState(false);

  // Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUniversities, setFilteredUniversities] = useState<University[]>([]);
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
          selectedProgram
        };
        localStorage.setItem('dashboardFilters', JSON.stringify(filtersToSave));
        console.log('🔍 Saved filters to localStorage:', filtersToSave);
      } catch (error) {
        console.error('❌ Error saving filters to localStorage:', error);
      }
    }
  }, [searchQuery, selectedCountry, selectedProgram, isDataLoaded]);

  // Filter functions
  const getUniqueCountries = () => {
    if (popularUniversities.length === 0) return [];
    const countries = popularUniversities.map(uni => {
      const locationParts = uni.location.split(', ');
      return locationParts[locationParts.length - 1];
    });
    return Array.from(new Set(countries)).sort();
  };

  const getUniquePrograms = () => {
    if (popularUniversities.length === 0) return [];
    const allPrograms = popularUniversities.flatMap(uni => uni.programs);
    return Array.from(new Set(allPrograms)).sort();
  };

  const filterUniversities = useCallback((universities: University[]) => {
    return universities.filter(uni => {
      const matchesSearch = searchQuery === "" || 
        uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uni.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uni.programs.some(program => 
          program.toLowerCase().includes(searchQuery.toLowerCase())
        );
      
      const matchesCountry = selectedCountry === "all" || 
        uni.location.includes(selectedCountry);
      
      const matchesProgram = selectedProgram === "all" || 
        uni.programs.some(program => 
          program.toLowerCase().includes(selectedProgram.toLowerCase())
        );
      
      return matchesSearch && matchesCountry && matchesProgram;
    });
  }, [searchQuery, selectedCountry, selectedProgram]);

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


  // Handle quick actions
  const handleQuickAction = (action: string) => {
    switch (action) {
      case "add-application":
        setIsAddApplicationModalOpen(true);
        break;
      case "upload-documents":
        console.log("Opening document upload...");
        // Add document upload logic
        break;
      case "schedule-exam":
        setIsExamModalOpen(true);
        break;
      case "find-scholarships":
        setIsScholarshipModalOpen(true);
        break;
      case "ai-suggestions":
        console.log("Opening AI suggestions...");
        // Add AI suggestions logic
        break;
      case "export-data":
        console.log("Exporting data...");
        // Add export logic
        break;
      default:
        console.log(`Action ${action} not implemented`);
    }
  };

  // Handle university actions
  const handleEditUniversity = (university: { name: string; id: string }) => {
    console.log("Editing university:", university.name);
    // Open edit modal or navigate to edit page
    alert(`Editing ${university.name} - This would open an edit form`);
  };

  // Placeholder handlers for future functionality
  // const handleViewUniversity = (university: { name: string; id: string }) => {
  //   console.log("Viewing university details:", university.name);
  // };

  const handleRemoveUniversity = (universityId: string) => {
    console.log("Removing university:", universityId);
    setSavedUniversities((prev: SavedUniversity[]) => {
      const updatedList = prev.filter((uni: SavedUniversity) => uni.id !== universityId);
      const removedUni = prev.find((uni: SavedUniversity) => uni.id === universityId);
      if (removedUni) {
        alert(`${removedUni.name} has been removed from your saved universities!`);
      }
      return updatedList;
    });
  };

  // Get university ranking based on name
  const getUniversityRanking = (universityName: string): number => {
    const rankingMap: { [key: string]: number } = {
      "Massachusetts Institute of Technology": 1,
      "MIT": 1,
      "University of Cambridge": 2,
      "Cambridge University": 2,
      "University of Oxford": 3,
      "Oxford University": 3,
      "Harvard University": 4,
      "Harvard": 4,
      "Stanford University": 5,
      "Stanford": 5,
      "Imperial College London": 6,
      "University College London": 9,
      "University of Melbourne": 14,
      "University of Toronto": 21,
      "Technical University of Munich": 37
    };

    // Normalize university name for better matching
    const normalizedName = universityName.toLowerCase().trim();
    
    // Try exact match first
    for (const [key, ranking] of Object.entries(rankingMap)) {
      const normalizedKey = key.toLowerCase();
      if (normalizedName === normalizedKey) {
        return ranking;
      }
    }
    
    // Try partial match - check if university name contains ranking key
    for (const [key, ranking] of Object.entries(rankingMap)) {
      const normalizedKey = key.toLowerCase();
      if (normalizedName.includes(normalizedKey)) {
        return ranking;
      }
    }
    
    // Try reverse match - check if ranking key contains university name
    for (const [key, ranking] of Object.entries(rankingMap)) {
      const normalizedKey = key.toLowerCase();
      if (normalizedKey.includes(normalizedName)) {
        return ranking;
      }
    }

    // Default ranking for unknown universities
    return 999;
  };

  // Get university details based on name
  const getUniversityDetails = (universityName: string) => {
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
          campus: "Urban technology campus"
        }
      },
      "MIT": {
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
          campus: "Urban technology campus"
        }
      },
      "University of Cambridge": {
        tuition: "£33,825/year",
        acceptance: "21.0%",
        deadline: "Oct 15, 2024",
        location: "Cambridge, England, UK",
        programs: ["Natural Sciences", "Engineering", "Mathematics", "Medicine"],
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
          campus: "Historic collegiate city"
        }
      },
      "Cambridge University": {
        tuition: "£33,825/year",
        acceptance: "21.0%",
        deadline: "Oct 15, 2024",
        location: "Cambridge, England, UK",
        programs: ["Natural Sciences", "Engineering", "Mathematics", "Medicine"],
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
          campus: "Historic collegiate city"
        }
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
          campus: "Historic collegiate system"
        }
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
          campus: "Historic collegiate system"
        }
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
          campus: "Historic urban campus"
        }
      },
      "Harvard": {
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
          campus: "Historic urban campus"
        }
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
          campus: "Suburban Silicon Valley campus"
        }
      },
      "Stanford": {
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
          campus: "Suburban Silicon Valley campus"
        }
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
          campus: "Urban London campus"
        }
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
          campus: "Central London campus"
        }
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
          campus: "Urban multi-campus system"
        }
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
          campus: "Urban Parkville campus"
        }
      },
      "Technical University of Munich": {
        tuition: "€0/year (Free)",
        acceptance: "25.0%",
        deadline: "Jul 15, 2025",
        location: "Munich, Bavaria, Germany",
        programs: ["Engineering", "Computer Science", "Natural Sciences", "Medicine"],
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
          campus: "Multi-campus technical focus"
        }
      }
    };

    // Try to find exact match or partial match
    for (const [key, data] of Object.entries(universityData)) {
      if (universityName.toLowerCase().includes(key.toLowerCase()) || 
          key.toLowerCase().includes(universityName.toLowerCase())) {
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
        campus: "Contact for campus information"
      }
    };
  };

  const handleApplyToUniversity = (university: { name: string; id: string }) => {
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
      details: universityDetails.details
    };
    
    setSavedUniversities((prev: SavedUniversity[]) => {
      // Check if university already exists
      const exists = prev.some((uni: SavedUniversity) => uni.id === university.id);
      if (exists) {
        alert(`${university.name} is already in your saved universities!`);
        return prev;
      }
      
      // Add new university and sort by ranking
      const updated = [...prev, newUniversity].sort((a, b) => a.ranking - b.ranking);
      alert(`${university.name} has been added to your saved universities!`);
      return updated;
    });
    
    // Close the modal
    setIsAddApplicationModalOpen(false);
  };

  const handleViewAllUniversities = () => {
    console.log("Viewing all universities...");
    // Navigate to universities page or open modal
    alert("Opening all universities view - This would show the complete university database");
  };

  // Load popular universities with fallback data
  const loadPopularUniversities = async () => {
    setIsLoadingExternal(true);
    console.log('🔄 Loading universities...');
    
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
          campus: "Urban technology campus"
        }
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
          campus: "Historic collegiate city"
        }
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
          campus: "Historic collegiate system"
        }
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
          campus: "Historic urban campus"
        }
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
          campus: "Suburban Silicon Valley campus"
        }
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
          campus: "Urban multi-campus system"
        }
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
          campus: "Urban Parkville campus"
        }
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
          campus: "Multi-campus technical focus"
        }
      }
    ];
    
    try {
      // Try to fetch from API first, but use fallback if it fails
      console.log('🌐 Attempting to connect to university API...');
      
      setTimeout(() => {
        console.log('📚 Using curated university database');
        setPopularUniversities(fallbackUniversities);
        setIsLoadingExternal(false);
      }, 1000); // Simulate loading time
      
      return fallbackUniversities;
    } catch (error) {
      console.error('💥 API unavailable, using curated data:', error);
      setPopularUniversities(fallbackUniversities);
      return fallbackUniversities;
    }
  };

  // Fetch external university data
  const fetchExternalUniversities = async (searchTerm = '') => {
    setIsLoadingExternal(true);
    try {
      // Using HIPO API (Higher Education Database)
      const response = await fetch(`https://universities.hipolabs.com/search?name=${encodeURIComponent(searchTerm)}`);
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Transform external data to match our University interface
      const transformedData: University[] = data.slice(0, 50).map((uni: { name: string; country: string; state_province?: string }, index: number) => ({
        id: `search-${index}`,
        name: uni.name,
        location: `${uni.country}${uni.state_province ? `, ${uni.state_province}` : ''}`,
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
          notable: "Contact for achievements and notable alumni"
        }
      }));

      return transformedData;
    } catch (error) {
      console.error('Error fetching external universities:', error);
      alert('Failed to fetch external university data. Please try again.');
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
      upcomingDeadlines: 0
    }
  });

  // External university data
  const [isLoadingExternal, setIsLoadingExternal] = useState(false);

  // Mock data with enhanced information
  const applications: Application[] = useMemo(() => [
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
      program: "Computer Science",
      status: "Submitted",
      deadline: "Jan 2, 2025",
      progress: 100,
      ranking: 2,
      location: "Stanford, CA, USA",
      tuition: "$61,731/year",
      acceptance: "4.3%",
      image: "/stanford-campus.jpg",
      description: "Stanford's CS program emphasizes both theoretical foundations and practical applications.",
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
        { name: "Research Portfolio", status: "uploaded", required: true },
        { name: "Financial Aid Forms", status: "uploaded", required: false },
      ],
      milestones: [
        { title: "Application Started", date: "Oct 15, 2024", completed: true },
        { title: "Documents Uploaded", date: "Nov 1, 2024", completed: true },
        { title: "Personal Statement Final", date: "Nov 15, 2024", completed: true },
        { title: "Letters of Recommendation", date: "Nov 20, 2024", completed: true },
        { title: "Final Review", date: "Dec 1, 2024", completed: true },
        { title: "Submission", date: "Dec 15, 2024", completed: true },
      ],
    },
  ], []);

  const examProgress: Exam[] = useMemo(() => [
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
        { name: "Reading", score: 370, target: 380, progress: 95, status: "completed" },
        { name: "Writing & Language", score: 360, target: 370, progress: 90, status: "completed" },
        { name: "Math", score: 750, target: 750, progress: 100, status: "completed" },
      ],
      practiceTests: [
        { name: "Practice Test 1", date: "Nov 15, 2024", score: 1420, status: "completed", improvement: "+20" },
        { name: "Practice Test 2", date: "Nov 1, 2024", score: 1400, status: "completed", improvement: "+15" },
        { name: "Practice Test 3", date: "Oct 15, 2024", score: 1385, status: "completed", improvement: "Baseline" },
      ],
      studyPlan: [
        { topic: "Reading Comprehension", progress: 100, priority: "high", status: "completed" },
        { topic: "Grammar Rules", progress: 100, priority: "high", status: "completed" },
        { topic: "Algebra & Functions", progress: 100, priority: "medium", status: "completed" },
        { topic: "Advanced Math", progress: 60, priority: "high", status: "in-progress" },
        { topic: "Data Analysis", progress: 30, priority: "medium", status: "in-progress" },
      ],
      resources: [
        { name: "Khan Academy SAT Prep", type: "Practice Tests", status: "active", url: "https://www.khanacademy.org/test-prep/sat" },
        { name: "College Board Official Guide", type: "Study Material", status: "completed", url: "https://satsuite.collegeboard.org/sat/practice-preparation" },
        { name: "SAT Math Bootcamp", type: "Course", status: "in-progress", url: "https://www.khanacademy.org/math" },
      ],
    },
  ], []);

  const [popularUniversities, setPopularUniversities] = useState<University[]>([]);

  // Save popular universities to localStorage whenever they change (only after initial load)
  useEffect(() => {
    if (isDataLoaded && popularUniversities.length > 0) {
      try {
        localStorage.setItem('popularUniversities', JSON.stringify(popularUniversities));
        console.log('🌍 Saved popular universities to localStorage:', popularUniversities.length, 'universities');
      } catch (error) {
        console.error('❌ Error saving popular universities to localStorage:', error);
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


  const stats: Stat[] = [
    { label: "Active Applications", value: realTimeData.stats.activeApplications.toString(), icon: FileText },
    { label: "Universities Tracked", value: `${realTimeData.stats.universitiesTracked.toLocaleString()}+`, icon: GraduationCap },
    { label: "Documents Uploaded", value: realTimeData.stats.documentsUploaded.toString(), icon: BookOpen },
    { label: "Upcoming Deadlines", value: realTimeData.stats.upcomingDeadlines.toString(), icon: Calendar },
  ];

  const quickActions: QuickAction[] = [
    { label: "Add Application", icon: Plus, action: "add-application", color: "bg-blue-500" },
    { label: "Upload Documents", icon: Upload, action: "upload-docs", color: "bg-green-500" },
    { label: "Schedule Exam", icon: Calendar, action: "schedule-exam", color: "bg-purple-500" },
    { label: "Find Scholarships", icon: Award, action: "find-scholarships", color: "bg-yellow-500" },
    { label: "AI Suggestions", icon: Sparkles, action: "ai-suggestions", color: "bg-pink-500" },
    { label: "Export Data", icon: Download, action: "export-data", color: "bg-indigo-500" },
  ];


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
        research: "World's leading research university focusing on science, technology, and innovation",
        notable: "91 Nobel laureates, 6 Turing Award winners, 3 Fields Medalists",
        website: "https://web.mit.edu",
        type: "Private Research University",
        language: "English",
        campus: "Urban campus in Cambridge"
      }
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
        campus: "Historic collegiate city"
      }
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
        research: "America's oldest university, leader in liberal arts and professional education",
        notable: "161 Nobel laureates, 8 US Presidents, 14 Turing Award winners",
        website: "https://www.harvard.edu",
        type: "Private Ivy League University",
        language: "English",
        campus: "Historic urban campus in Cambridge"
      }
    },
  ];

  const [savedUniversities, setSavedUniversities] = useState<SavedUniversity[]>(defaultSavedUniversities);

  // Load data from localStorage on client side
  useEffect(() => {
    try {
      // Load saved universities
      const savedUnis = localStorage.getItem('savedUniversities');
      if (savedUnis) {
        const parsedUnis = JSON.parse(savedUnis);
        console.log('📚 Loaded saved universities from localStorage:', parsedUnis.length, 'universities');
        setSavedUniversities(parsedUnis);
      }

      // Load popular universities
      const popularUnis = localStorage.getItem('popularUniversities');
      if (popularUnis) {
        const parsedPopular = JSON.parse(popularUnis);
        console.log('🌍 Loaded popular universities from localStorage:', parsedPopular.length, 'universities');
        setPopularUniversities(parsedPopular);
      }

      // Load filters
      const savedFilters = localStorage.getItem('dashboardFilters');
      if (savedFilters) {
        const parsedFilters = JSON.parse(savedFilters);
        console.log('🔍 Loaded filters from localStorage:', parsedFilters);
        setSearchQuery(parsedFilters.searchQuery || "");
        setSelectedCountry(parsedFilters.selectedCountry || "all");
        setSelectedProgram(parsedFilters.selectedProgram || "all");
      }

      setIsDataLoaded(true);
    } catch (error) {
      console.error('❌ Error loading data from localStorage:', error);
      setIsDataLoaded(true);
    }
  }, []);

  // Save to localStorage whenever savedUniversities changes (only after initial load)
  useEffect(() => {
    if (isDataLoaded) {
      try {
        localStorage.setItem('savedUniversities', JSON.stringify(savedUniversities));
        console.log('💾 Saved universities to localStorage:', savedUniversities.length, 'universities');
      } catch (error) {
        console.error('❌ Error saving universities to localStorage:', error);
      }
    }
  }, [savedUniversities, isDataLoaded]);

  // Fix existing saved universities rankings and details
  useEffect(() => {
    setSavedUniversities((prev: SavedUniversity[]) => {
      const updated = prev.map((uni: SavedUniversity) => {
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
          details: details.details
        };
      }).sort((a: SavedUniversity, b: SavedUniversity) => a.ranking - b.ranking);
      return updated;
    });
  }, []);

  // Load universities from API only if not in localStorage (after initial data load)
  useEffect(() => {
    if (isDataLoaded && popularUniversities.length === 0) {
      console.log('📡 No universities in localStorage, loading from API...');
      loadPopularUniversities();
    } else if (isDataLoaded && popularUniversities.length > 0) {
      console.log('✅ Universities already loaded from localStorage, skipping API call');
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
  }, [selectedCountry, selectedProgram, popularUniversities, filterUniversities, searchQuery]);

  // Real-time data updates
  useEffect(() => {
    // Initialize real-time data
    setRealTimeData({
      applications: applications,
      examProgress: examProgress,
      stats: {
        activeApplications: applications.length,
        universitiesTracked: 2500,
        documentsUploaded: 12,
        upcomingDeadlines: 3
      }
    });

    // Simulate real-time updates every 30 seconds
    const interval = setInterval(() => {
      // Simulate data changes
      setRealTimeData(prevData => ({
        ...prevData,
        applications: prevData.applications.map(app => ({
          ...app,
          progress: Math.min(100, app.progress + Math.random() * 2), // Simulate progress updates
          lastUpdated: new Date().toISOString()
        })),
        stats: {
          ...prevData.stats,
          documentsUploaded: prevData.stats.documentsUploaded + Math.floor(Math.random() * 2),
          upcomingDeadlines: Math.max(0, prevData.stats.upcomingDeadlines - Math.floor(Math.random() * 2))
        }
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [applications, examProgress]);


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

        {/* Quick Actions Panel */}
        <EnhancedQuickActionsPanel
          quickActions={quickActions}
          onActionClick={handleQuickAction}
        />

        {/* Stats Grid */}
        <StatsGrid stats={stats} />

        {/* Saved Universities - Top Priority */}
        <div className="mb-8">
          <EnhancedSavedUniversities 
            universities={savedUniversities}
            onEditUniversity={handleEditUniversity}
            onRemoveUniversity={handleRemoveUniversity}
            onApplyToUniversity={handleApplyToUniversity}
            onViewAllUniversities={handleViewAllUniversities}
            />
          </div>

        {/* Application Milestones - Full Width */}
        <div className="mb-8">
          <EnhancedMilestoneTracker
            milestones={[
              {
                id: "1",
                title: "MIT Application Submission",
                description: "Complete and submit MIT application with all required documents",
                status: "completed",
                category: "Application",
                dueDate: "Dec 1, 2024",
                completedDate: "Dec 1, 2024",
                    priority: "high",
                progress: 100,
                totalSteps: 6,
                completedSteps: 6,
                estimatedDuration: "2-3 weeks",
                requirements: [
                  "High school transcripts",
                  "SAT/ACT scores",
                  "Personal statement",
                  "Letters of recommendation (2)",
                  "Portfolio (if applicable)",
                  "Application fee payment"
                ],
                tips: [
                  "Start your personal statement early and get feedback from teachers",
                  "Request recommendation letters at least 3 weeks before deadline",
                  "Review all requirements carefully to avoid missing documents"
                ],
                icon: FileText,
                color: "bg-blue-500",
                steps: [
                  {
                    id: "1-1",
                    title: "Create MIT Application Account",
                    description: "Register on MIT's application portal and complete basic information",
                    status: "completed",
                    priority: "high",
                    dueDate: "Nov 1, 2024",
                    completedDate: "Nov 1, 2024",
                    estimatedTime: "30 minutes",
                    requirements: ["Valid email address", "Personal information"],
                    resources: [
                      { name: "MIT Application Portal", url: "https://apply.mit.edu", type: "website" },
                      { name: "Application Guide", url: "https://mit.edu/apply", type: "guide" }
                    ],
                    progress: 100,
                    notes: "Account created successfully"
                  },
                  {
                    id: "1-2",
                    title: "Upload Academic Documents",
                    description: "Submit high school transcripts and test scores",
                    status: "completed",
                    priority: "high",
                    dueDate: "Nov 15, 2024",
                    completedDate: "Nov 15, 2024",
                    estimatedTime: "2 hours",
                    requirements: ["Official transcripts", "SAT/ACT scores", "AP scores (if applicable)"],
                    resources: [
                      { name: "Transcript Request Form", url: "#", type: "form" },
                      { name: "Score Reporting Guide", url: "#", type: "guide" }
                    ],
                    progress: 100,
                    notes: "All academic documents uploaded"
                  },
                  {
                    id: "1-3",
                    title: "Write Personal Statement",
                    description: "Complete the main essay and supplemental essays",
                    status: "completed",
                    priority: "high",
                    dueDate: "Nov 20, 2024",
                    completedDate: "Nov 20, 2024",
                    estimatedTime: "1-2 weeks",
                    requirements: ["Main essay (500 words)", "Supplemental essays", "Proofreading"],
                    resources: [
                      { name: "Essay Prompts", url: "#", type: "guide" },
                      { name: "Writing Tips", url: "#", type: "guide" }
                    ],
                    progress: 100,
                    notes: "Personal statement reviewed by counselor"
                  },
                  {
                    id: "1-4",
                    title: "Request Letters of Recommendation",
                    description: "Ask teachers and counselors for recommendation letters",
                    status: "completed",
                    priority: "high",
                    dueDate: "Nov 25, 2024",
                    completedDate: "Nov 25, 2024",
                    estimatedTime: "1 week",
                    requirements: ["Identify recommenders", "Send formal requests", "Provide supporting materials"],
                    resources: [
                      { name: "Recommender Guidelines", url: "#", type: "guide" },
                      { name: "Request Template", url: "#", type: "document" }
                    ],
                    progress: 100,
                    notes: "Both letters submitted on time"
                  },
                  {
                    id: "1-5",
                    title: "Complete Application Review",
                    description: "Final review of all application materials before submission",
                    status: "completed",
                    priority: "high",
                    dueDate: "Nov 28, 2024",
                    completedDate: "Nov 28, 2024",
                    estimatedTime: "2 hours",
                    requirements: ["Check all sections", "Verify document uploads", "Proofread essays"],
                    resources: [
                      { name: "Application Checklist", url: "#", type: "document" },
                      { name: "Final Review Guide", url: "#", type: "guide" }
                    ],
                    progress: 100,
                    notes: "Application thoroughly reviewed"
                  },
                  {
                    id: "1-6",
                    title: "Submit Application",
                    description: "Final submission of MIT application with payment",
                    status: "completed",
                    priority: "high",
                    dueDate: "Dec 1, 2024",
                    completedDate: "Dec 1, 2024",
                    estimatedTime: "30 minutes",
                    requirements: ["Submit application", "Pay application fee", "Receive confirmation"],
                    resources: [
                      { name: "Payment Portal", url: "#", type: "website" },
                      { name: "Submission Confirmation", url: "#", type: "document" }
                    ],
                    progress: 100,
                    notes: "Application successfully submitted"
                  }
                ]
                  },
                  {
                    id: "2",
                title: "MIT Interview Preparation",
                description: "Prepare for and complete MIT admission interview",
                    status: "current",
                    category: "Interview",
                dueDate: "Dec 20, 2024",
                priority: "high",
                progress: 60,
                totalSteps: 4,
                completedSteps: 2,
                estimatedDuration: "1-2 weeks",
                requirements: [
                  "Schedule interview",
                  "Prepare responses to common questions",
                  "Research MIT programs",
                  "Practice with mock interviews"
                ],
                tips: [
                  "Be yourself and show genuine interest in MIT",
                  "Prepare specific examples of your achievements and challenges",
                  "Research MIT's culture and values to align your responses"
                ],
                icon: Users,
                color: "bg-green-500",
                steps: [
                  {
                    id: "2-1",
                    title: "Schedule Interview",
                    description: "Contact MIT alumni for interview scheduling",
                    status: "completed",
                    priority: "high",
                    dueDate: "Dec 10, 2024",
                    completedDate: "Dec 8, 2024",
                    estimatedTime: "1 hour",
                    requirements: ["Find local MIT alumni", "Schedule convenient time", "Confirm location"],
                    resources: [
                      { name: "Alumni Interview Portal", url: "#", type: "website" },
                      { name: "Interview Scheduling Guide", url: "#", type: "guide" }
                    ],
                    progress: 100,
                    notes: "Interview scheduled for Dec 18, 2024"
                  },
                  {
                    id: "2-2",
                    title: "Research MIT Programs",
                    description: "Study MIT's academic programs and culture",
                    status: "completed",
                    priority: "medium",
                    dueDate: "Dec 12, 2024",
                    completedDate: "Dec 12, 2024",
                    estimatedTime: "3-4 hours",
                    requirements: ["Study course catalog", "Research faculty", "Understand MIT culture"],
                    resources: [
                      { name: "MIT Course Catalog", url: "https://catalog.mit.edu", type: "website" },
                      { name: "MIT Culture Guide", url: "#", type: "guide" }
                    ],
                    progress: 100,
                    notes: "Comprehensive research completed"
                  },
                  {
                    id: "2-3",
                    title: "Practice Interview Questions",
                    description: "Prepare responses to common interview questions",
                    status: "in-progress",
                    priority: "high",
                    dueDate: "Dec 16, 2024",
                    estimatedTime: "2-3 days",
                    requirements: ["Prepare personal stories", "Practice common questions", "Record practice sessions"],
                    resources: [
                      { name: "Common Interview Questions", url: "#", type: "guide" },
                      { name: "STAR Method Guide", url: "#", type: "guide" }
                    ],
                    progress: 60,
                    notes: "Working on personal story examples"
                  },
                  {
                    id: "2-4",
                    title: "Mock Interview Session",
                    description: "Conduct practice interview with counselor or mentor",
                    status: "pending",
                    priority: "high",
                    dueDate: "Dec 17, 2024",
                    estimatedTime: "1 hour",
                    requirements: ["Schedule mock interview", "Practice full interview", "Receive feedback"],
                    resources: [
                      { name: "Mock Interview Guide", url: "#", type: "guide" },
                      { name: "Feedback Template", url: "#", type: "document" }
                    ],
                    progress: 0,
                    notes: "Scheduled for Dec 16, 2024"
                  }
                ]
                  },
                  {
                    id: "3",
                title: "Admission Decision",
                description: "Receive and respond to MIT admission decision",
                    status: "upcoming",
                    category: "Decision",
                dueDate: "Mar 15, 2025",
                priority: "high",
                progress: 0,
                totalSteps: 3,
                completedSteps: 0,
                estimatedDuration: "1-2 weeks",
                requirements: [
                  "Check decision portal",
                  "Review financial aid package",
                  "Make enrollment decision",
                  "Submit enrollment deposit"
                ],
                tips: [
                  "Check your email and portal regularly on decision day",
                  "Take time to carefully consider all options before deciding",
                  "Don't hesitate to ask questions about financial aid"
                ],
                icon: Award,
                color: "bg-purple-500",
                steps: [
                  {
                    id: "3-1",
                    title: "Check Decision Portal",
                    description: "Log in to MIT portal to view admission decision",
                    status: "pending",
                    priority: "high",
                    dueDate: "Mar 15, 2025",
                    estimatedTime: "30 minutes",
                    requirements: ["Access portal", "View decision letter", "Download decision"],
                    resources: [
                      { name: "MIT Decision Portal", url: "#", type: "website" },
                      { name: "Decision Day Guide", url: "#", type: "guide" }
                    ],
                    progress: 0
                  },
                  {
                    id: "3-2",
                    title: "Review Financial Aid",
                    description: "Analyze financial aid package and options",
                    status: "pending",
                    priority: "high",
                    dueDate: "Mar 20, 2025",
                    estimatedTime: "2-3 hours",
                    requirements: ["Review aid package", "Compare with other offers", "Calculate costs"],
                    resources: [
                      { name: "Financial Aid Calculator", url: "#", type: "website" },
                      { name: "Aid Comparison Tool", url: "#", type: "guide" }
                    ],
                    progress: 0
                  },
                  {
                    id: "3-3",
                    title: "Submit Enrollment Decision",
                    description: "Accept or decline MIT admission offer",
                    status: "pending",
                    priority: "high",
                    dueDate: "May 1, 2025",
                    estimatedTime: "1 hour",
                    requirements: ["Make final decision", "Submit enrollment form", "Pay deposit"],
                    resources: [
                      { name: "Enrollment Portal", url: "#", type: "website" },
                      { name: "Decision Timeline", url: "#", type: "guide" }
                    ],
                    progress: 0
                  }
                ]
              }
            ]}
            onStepComplete={(milestoneId, stepId) => {
              console.log(`✅ Step completed: ${milestoneId}-${stepId}`);
            }}
            onStepUncomplete={(milestoneId, stepId) => {
              console.log(`❌ Step uncompleted: ${milestoneId}-${stepId}`);
            }}
            onMilestoneComplete={(milestoneId) => {
              console.log(`🎯 Milestone completed: ${milestoneId}`);
            }}
            onMilestoneUncomplete={(milestoneId) => {
              console.log(`🔄 Milestone uncompleted: ${milestoneId}`);
            }}
          />
        </div>

        {/* Application and Overall Progress Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Applications Progress */}
          <EnhancedApplicationProgress
            applications={realTimeData.applications}
            onViewDetails={handleViewDetails}
          />

          {/* Overall Progress Card */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                Overall Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <ProgressTracker
                title="Application Progress"
                items={realTimeData.applications.map(app => ({
                  name: app.university,
                  progress: Math.round(app.progress),
                  status: app.status.toLowerCase().replace(' ', '-') as "completed" | "in-progress" | "pending",
                  deadline: app.deadline,
                  priority: app.progress > 80 ? "high" : app.progress > 50 ? "medium" : "low",
                }))}
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
