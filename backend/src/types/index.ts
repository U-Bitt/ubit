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
  dateOfBirth?: string;
  nationality?: string;
  phone?: string;
  avatar?: string;
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