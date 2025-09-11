import { Document } from "mongoose";

// User types
export interface IUser extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  dateOfBirth?: Date;
  nationality?: string;
  role: "student" | "admin" | "counselor";
  isActive: boolean;
  emailVerified: boolean;
  profileImage?: string;
  preferences: {
    language: string;
    notifications: boolean;
    marketing: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// University types
export interface IUniversity extends Document {
  _id: string;
  name: string;
  country: string;
  city: string;
  description: string;
  website: string;
  logo: string;
  images: string[];
  ranking: number;
  tuitionFee: {
    undergraduate: number;
    graduate: number;
    currency: string;
  };
  requirements: {
    ielts: number;
    toefl: number;
    gpa: number;
    sat?: number;
    gre?: number;
  };
  majors: string[];
  scholarships: IScholarship[];
  dormitories: IDormitory[];
  createdAt: Date;
  updatedAt: Date;
}

// Scholarship types
export interface IScholarship extends Document {
  _id: string;
  name: string;
  university: string;
  description: string;
  amount: number;
  currency: string;
  type: "merit" | "need-based" | "athletic" | "academic";
  requirements: string[];
  deadline: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Dormitory types
export interface IDormitory extends Document {
  _id: string;
  name: string;
  university: string;
  type: "single" | "double" | "triple" | "quad";
  price: number;
  currency: string;
  amenities: string[];
  description: string;
  images: string[];
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Exam types
export interface IExam extends Document {
  _id: string;
  name: string;
  type: "ielts" | "toefl" | "sat" | "gre" | "gmat" | "other";
  description: string;
  sections: {
    name: string;
    duration: number; // in minutes
    questions: number;
    maxScore: number;
  }[];
  totalDuration: number;
  maxScore: number;
  validity: number; // in months
  cost: number;
  currency: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Package types
export interface IPackage extends Document {
  _id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  duration: number; // in months
  features: string[];
  includes: {
    universities: string[];
    exams: string[];
    consultations: number;
    documents: string[];
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Training types
export interface ITraining extends Document {
  _id: string;
  title: string;
  description: string;
  instructor: string;
  duration: number; // in hours
  price: number;
  currency: string;
  level: "beginner" | "intermediate" | "advanced";
  category: string;
  schedule: {
    startDate: Date;
    endDate: Date;
    days: string[];
    time: string;
  };
  maxStudents: number;
  enrolledStudents: string[];
  materials: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Visa types
export interface IVisa extends Document {
  _id: string;
  country: string;
  type: "student" | "tourist" | "work" | "business";
  requirements: {
    documents: string[];
    processingTime: number; // in days
    cost: number;
    currency: string;
    validity: number; // in months
  };
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Query parameters
export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  filter?: Record<string, any>;
}

// JWT Payload
export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}
