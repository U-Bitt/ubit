// University types
export interface University {
  id: string;
  name: string;
  location: string;
  ranking: number;
  rating: number;
  tuition: string;
  acceptance: string;
  students: string;
  image: string;
  programs: string[];
  highlights: string[];
  deadline: string;
  description?: string;
  website?: string;
  founded?: number;
  type?: "public" | "private";
  size?: "small" | "medium" | "large";
  requirements?: string[];
  scholarships?: {
    name: string;
    amount: string;
    requirements: string[];
    deadline: string;
    description?: string;
  }[];
  campusSize?: string;
  studentFacultyRatio?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Country types
export interface Country {
  id: string;
  name: string;
  flag: string;
  popularCities: string[];
  rating: number;
  description: string;
  visaType: string;
  workRights: string;
  avgTuition: string;
  livingCost: string;
  currency: string;
  language: string[];
  climate: string;
  isEnglishSpeaking?: boolean;
  isLowCost?: boolean;
  hasWorkRights?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Exam types
export interface Exam {
  id: string;
  name: string;
  fullName: string;
  sections: string[];
  nextDate: string;
  preparation: string;
  difficulty: "easy" | "medium" | "hard";
  duration?: string;
  cost?: string;
  validity?: string;
  description?: string;
}

// User types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: string;
  nationality?: string;
  avatar?: string;

  // Personal Information
  personalInfo?: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    dateOfBirth?: string;
    nationality?: string;
  };

  // Academic Information
  academicInfo?: {
    gpa: number; // GPA out of 4
    highSchoolName: string;
    graduationYear: number;
    intendedMajors: string[];
  };

  // Areas of Interest
  areasOfInterest?: string[];

  // Test Scores
  testScores?: Array<{
    id: string;
    testName: string;
    score: string;
    date: string;
    maxScore?: string;
    percentile?: number;
  }>;

  // Documents
  documents?: Array<{
    id: string;
    name: string;
    type: string;
    url?: string;
    uploadedAt: string;
    status: "draft" | "uploaded" | "verified" | "rejected";
  }>;

  // Saved Universities
  savedUniversities?: Array<{
    id: string;
    universityId: string;
    universityName: string;
    savedAt: string;
    notes?: string;
  }>;

  // Legacy fields for backward compatibility
  preferences?: UserPreferences;
  applications?: Application[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  countries: string[];
  programs: string[];
  budget: {
    min: number;
    max: number;
    currency: string;
  };
  examScores?: Record<string, number>;
}

export interface Application {
  id: string;
  universityId?: string;
  program?: string;
  status: "draft" | "submitted" | "under_review" | "accepted" | "rejected";
  documents: string[];
  submittedAt?: Date;
  deadline?: Date;
}

// Visa types
export interface Visa {
  id: string;
  type: string;
  country: string;
  duration?: string;
  requirements: string[];
  processingTime: string;
  cost: string;
  description?: string;
  isWorkPermit?: boolean;
  isStudentVisa?: boolean;
  validityPeriod?: string;
  applicationProcess?: string;
  documents: string[];
  eligibility?: string;
  restrictions?: string[];
  benefits?: string[];
  validity: string;
  officialWebsite: string;
  workRights: string;
  studyRights: string;
  familyRights: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Scholarship types
export interface Scholarship {
  id: string;
  title: string;
  description: string;
  amount: string;
  university: string;
  country: string;
  deadline: string;
  type: string;
  requirements: string[];
  coverage: string;
  duration: string;
  applicationProcess: string;
  eligibility: string;
  benefits: string[];
  image: string;
  donor?: string;
  contactEmail?: string;
  website?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface ApiError {
  success: false;
  error: string;
  message: string;
  statusCode: number;
}

// Request types
export interface PaginationQuery {
  page?: number;
  limit?: number;
  sort?: string;
  order?: "asc" | "desc";
}

export interface SearchQuery extends PaginationQuery {
  q?: string;
  country?: string;
  program?: string;
  minRating?: number;
  maxTuition?: number;
}

// Document types
export interface Document {
  id: string;
  name: string;
  type: string;
  university?: string;
  description?: string;
  filePath: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  uploadedBy: string;
  versions?: DocumentVersion[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DocumentVersion {
  id: string;
  version: number;
  filePath: string;
  fileName: string;
  fileSize: number;
  uploadedAt: Date;
  uploadedBy: string;
}
