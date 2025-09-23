// API utility functions for the Ubit education platform

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

console.log("Environment variables:", {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NODE_ENV: process.env.NODE_ENV,
  API_BASE_URL: API_BASE_URL,
});

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
// Note: Application, Exam, University, and other types are now defined in the Dashboard components
// to avoid conflicts. Import them from @/components/Dashboard/types when needed.

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

export interface Exam {
  id: string;
  name: string;
  fullName: string;
  sections: string[];
  nextDate: string;
  preparation: string;
  difficulty: string;
}

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

export interface UniversitySuggestion {
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
  matchScore: number;
  reason: string;
  deadline: string;
}

// Generic API call function
export async function apiCall<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  console.log("Making API call to:", url);
  console.log("API_BASE_URL:", API_BASE_URL);

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    console.log("API response status:", response.status);
    console.log(
      "API response headers:",
      Object.fromEntries(response.headers.entries())
    );

    if (!response.ok) {
      throw new Error(
        `API call failed: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("API response data:", data);
    return data;
  } catch (error) {
    console.error("API call error:", error);
    console.error("Error details:", {
      name: (error as Error)?.name,
      message: (error as Error)?.message,
      stack: (error as Error)?.stack,
    });

    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(
        "Network error: Unable to connect to the server. Please check if the backend is running."
      );
    }
    throw error;
  }
}

// University API functions
export const universityApi = {
  getAll: async (): Promise<University[]> => {
    const response = await apiCall<{ success: boolean; data: University[] }>(
      "/universities"
    );
    return response.data;
  },
  getAllPaginated: async (): Promise<University[]> => {
    const allUniversities: University[] = [];
    let page = 1;
    let hasMore = true;
    const limit = 50; // Increased limit per page

    while (hasMore) {
      try {
        const response = await apiCall<{
          success: boolean;
          data: University[];
          pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
          };
        }>(`/universities?page=${page}&limit=${limit}`);

        if (response.success && response.data) {
          allUniversities.push(...response.data);

          // Check if there are more pages
          hasMore = page < response.pagination.pages;
          page++;
        } else {
          hasMore = false;
        }
      } catch (error) {
        console.error(`Error fetching page ${page}:`, error);
        hasMore = false;
      }
    }

    return allUniversities;
  },
  getById: async (id: string): Promise<University> => {
    const response = await apiCall<{ success: boolean; data: University }>(
      `/universities/${id}`
    );
    return response.data;
  },
  search: async (query: string): Promise<University[]> => {
    const response = await apiCall<{ success: boolean; data: University[] }>(
      `/universities/search?q=${encodeURIComponent(query)}`
    );
    return response.data;
  },
};

// Country API functions
export const countryApi = {
  getAll: async (): Promise<Country[]> => {
    const response = await apiCall<{ success: boolean; data: Country[] }>(
      "/countries"
    );
    return response.data;
  },
  getById: async (id: string): Promise<Country> => {
    const response = await apiCall<{ success: boolean; data: Country }>(
      `/countries/${id}`
    );
    return response.data;
  },
  search: async (query: string): Promise<Country[]> => {
    const response = await apiCall<{ success: boolean; data: Country[] }>(
      `/countries/search?q=${encodeURIComponent(query)}`
    );
    return response.data;
  },
};

// Exam API functions
export const examApi = {
  getAll: (): Promise<Exam[]> => apiCall<Exam[]>("/exams"),
  getById: (id: string): Promise<Exam> => apiCall<Exam>(`/exams/${id}`),
  getByType: (type: string): Promise<Exam[]> =>
    apiCall<Exam[]>(`/exams/type/${type}`),
};

// User API functions
export interface User {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: string;
  nationality?: string;
  avatar?: string;
  personalInfo?: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    dateOfBirth?: string;
    nationality?: string;
  };
  academicInfo?: {
    gpa?: number;
    highSchoolName?: string;
    graduationYear?: number;
    intendedMajors?: string[];
  };
  areasOfInterest?: string[];
  savedUniversities?: Array<{
    id: string;
    universityId: string;
    universityName: string;
    savedAt: string;
    notes?: string;
  }>;
}

export const userApi = {
  getAll: async (): Promise<User[]> => {
    const response = await apiCall<{ success: boolean; data: User[] }>(
      "/users"
    );
    return response.data;
  },
  getById: async (id: string): Promise<User> => {
    const response = await apiCall<{ success: boolean; data: User }>(
      `/users/${id}`
    );
    return response.data;
  },
  update: async (id: string, userData: Partial<User>): Promise<User> => {
    console.log("API update call - ID:", id, "Data:", userData);
    const response = await apiCall<{ success: boolean; data: User }>(
      `/users/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    return response.data;
  },
  create: async (userData: Partial<User>): Promise<User> => {
    const response = await apiCall<{ success: boolean; data: User }>("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    return response.data;
  },
  // Saved Universities
  getSavedUniversities: async (
    userId: string
  ): Promise<Record<string, unknown>[]> => {
    const response = await apiCall<{
      success: boolean;
      data: Record<string, unknown>[];
    }>("/users/saved-universities/me", {
      headers: {
        "x-user-id": userId,
      },
    });
    return response.data;
  },
  saveUniversity: async (
    userId: string,
    universityId: string,
    universityName: string,
    notes?: string
  ): Promise<Record<string, unknown>> => {
    const response = await apiCall<{
      success: boolean;
      data: Record<string, unknown>;
    }>("/users/saved-universities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": userId,
      },
      body: JSON.stringify({
        universityId,
        universityName,
        notes,
      }),
    });
    return response.data;
  },
  unsaveUniversity: async (userId: string, savedId: string): Promise<void> => {
    await apiCall<{ success: boolean; data: Record<string, unknown> }>(
      `/users/saved-universities/${savedId}`,
      {
        method: "DELETE",
        headers: {
          "x-user-id": userId,
        },
      }
    );
  },
  // Legacy functions for backward compatibility
  getProfile: (): Promise<Record<string, unknown>> =>
    apiCall<Record<string, unknown>>("/user/profile"),
  updateProfile: (
    data: Record<string, unknown>
  ): Promise<Record<string, unknown>> =>
    apiCall<Record<string, unknown>>("/user/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  getApplications: (): Promise<Record<string, unknown>[]> =>
    apiCall<Record<string, unknown>[]>("/user/applications"),
  createApplication: (
    data: Record<string, unknown>
  ): Promise<Record<string, unknown>> =>
    apiCall<Record<string, unknown>>("/user/applications", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

// Test Scores API functions
export const testScoreApi = {
  getAll: (): Promise<Record<string, unknown>[]> =>
    apiCall<Record<string, unknown>[]>("/test-scores"),
  create: (data: Record<string, unknown>): Promise<Record<string, unknown>> =>
    apiCall<Record<string, unknown>>("/test-scores", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (
    id: string,
    data: Record<string, unknown>
  ): Promise<Record<string, unknown>> =>
    apiCall<Record<string, unknown>>(`/test-scores/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string): Promise<Record<string, unknown>> =>
    apiCall<Record<string, unknown>>(`/test-scores/${id}`, {
      method: "DELETE",
    }),
};

// Documents API functions
export const documentApi = {
  getAll: (userId: string): Promise<Record<string, unknown>[]> =>
    apiCall<Record<string, unknown>[]>(`/documents/user/${userId}`),
  getById: (id: string): Promise<Record<string, unknown>> =>
    apiCall<Record<string, unknown>>(`/documents/${id}`),
  getVersions: (
    id: string
  ): Promise<{ success: boolean; data: Record<string, unknown>[] }> =>
    apiCall<{ success: boolean; data: Record<string, unknown>[] }>(
      `/documents/${id}/versions`
    ),
  upload: async (
    userId: string,
    file: File,
    documentData: {
      name: string;
      type: string;
      university?: string;
      description?: string;
    }
  ): Promise<Record<string, unknown>> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", documentData.name);
    formData.append("type", documentData.type);
    formData.append("university", documentData.university || "All");
    if (documentData.description) {
      formData.append("description", documentData.description);
    }

    const response = await fetch(`${API_BASE_URL}/documents/upload/${userId}`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Upload failed");
    }

    return response.json();
  },
  uploadNewVersion: async (
    documentId: string,
    userId: string,
    file: File
  ): Promise<Record<string, unknown>> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);

    const response = await fetch(
      `${API_BASE_URL}/documents/${documentId}/version`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Version upload failed");
    }

    return response.json();
  },
  update: (
    id: string,
    data: Record<string, unknown>
  ): Promise<Record<string, unknown>> =>
    apiCall<Record<string, unknown>>(`/documents/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (
    id: string,
    deleteAllVersions = false
  ): Promise<Record<string, unknown>> =>
    apiCall<Record<string, unknown>>(`/documents/${id}`, {
      method: "DELETE",
      body: JSON.stringify({ deleteAllVersions }),
    }),
};

// Scholarship API functions
export const scholarshipApi = {
  getAll: async (): Promise<Record<string, unknown>[]> => {
    const response = await apiCall<{
      success: boolean;
      data: Record<string, unknown>[];
    }>("/scholarships");
    return response.data;
  },
  getById: async (id: string): Promise<Record<string, unknown>> => {
    const response = await apiCall<{
      success: boolean;
      data: Record<string, unknown>;
    }>(`/scholarships/${id}`);
    return response.data;
  },
  search: async (query: string): Promise<Record<string, unknown>[]> => {
    const response = await apiCall<{
      success: boolean;
      data: Record<string, unknown>[];
    }>(`/scholarships/search?q=${encodeURIComponent(query)}`);
    return response.data;
  },
};

// Recommendation API functions
export const recommendationApi = {
  getUniversityRecommendations: async (): Promise<
    Record<string, unknown>[]
  > => {
    const response = await apiCall<{
      success: boolean;
      data: Record<string, unknown>[];
    }>("/recommendations/universities");
    return response.data;
  },
  getProgramRecommendations: async (): Promise<Record<string, unknown>[]> => {
    const response = await apiCall<{
      success: boolean;
      data: Record<string, unknown>[];
    }>("/recommendations/programs");
    return response.data;
  },
  getScholarshipRecommendations: async (): Promise<
    Record<string, unknown>[]
  > => {
    const response = await apiCall<{
      success: boolean;
      data: Record<string, unknown>[];
    }>("/recommendations/scholarships");
    return response.data;
  },
};

// Visa API functions
export const visaApi = {
  getAll: async (): Promise<Record<string, unknown>[]> => {
    const response = await apiCall<{
      success: boolean;
      data: Record<string, unknown>[];
    }>("/visas");
    return response.data;
  },
  getById: async (id: string): Promise<Record<string, unknown>> => {
    const response = await apiCall<{
      success: boolean;
      data: Record<string, unknown>;
    }>(`/visas/${id}`);
    return response.data;
  },
  search: async (query: string): Promise<Record<string, unknown>[]> => {
    const response = await apiCall<{
      success: boolean;
      data: Record<string, unknown>[];
    }>(`/visas/search?q=${encodeURIComponent(query)}`);
    return response.data;
  },
};

// Error handling utility
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public statusText: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// Request interceptor for adding auth tokens
export const setAuthToken = (token: string) => {
  // This would typically be handled by a more sophisticated HTTP client
  // For now, we'll store it in localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem("auth_token", token);
  }
};

// Response interceptor for handling common errors
export const handleApiError = (error: unknown): never => {
  if (error instanceof ApiError) {
    throw error;
  }

  if (
    error instanceof Error &&
    error.name === "TypeError" &&
    error.message.includes("fetch")
  ) {
    throw new ApiError(
      "Network error. Please check your connection.",
      0,
      "Network Error"
    );
  }

  throw new ApiError(
    "An unexpected error occurred",
    500,
    "Internal Server Error"
  );
};

// AI API
export const aiApi = {
  suggestUniversities: async (userData: {
    gpa: string;
    sat: string;
    toefl: string;
    major: string;
  }) => {
    return apiCall<{
      success: boolean;
      message: string;
      data: UniversitySuggestion[];
    }>("/ai/suggest", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },
};

// Test Scores API
export const testScoresApi = {
  getAll: (): Promise<{ success: boolean; data: Record<string, unknown>[] }> =>
    apiCall("/test-scores", {
      method: "GET",
      headers: {
        "user-id": "user-123", // In real app, get from auth context
      },
    }),

  getById: (id: string): Promise<Record<string, unknown>> =>
    apiCall(`/test-scores/${id}`, {
      method: "GET",
      headers: {
        "user-id": "user-123",
      },
    }),

  create: (data: {
    examType: string;
    score: string;
    maxScore: string;
    certified: boolean;
    testDate: string;
    validityDate: string;
  }): Promise<Record<string, unknown>> =>
    apiCall("/test-scores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "user-id": "user-123",
      },
      body: JSON.stringify(data),
    }),

  update: (
    id: string,
    data: Record<string, unknown>
  ): Promise<Record<string, unknown>> =>
    apiCall(`/test-scores/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "user-id": "user-123",
      },
      body: JSON.stringify(data),
    }),

  delete: (id: string): Promise<Record<string, unknown>> =>
    apiCall(`/test-scores/${id}`, {
      method: "DELETE",
      headers: {
        "user-id": "user-123",
      },
    }),
};
