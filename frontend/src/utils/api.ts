// API utility functions for the Ubit education platform

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

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
}

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
  id: number;
  name: string;
  type: string;
  university: string;
  status: "Uploaded" | "Draft" | "Pending";
  uploadDate: string | null;
  size: string | null;
  format: string;
  filename?: string;
  path?: string;
}

// Generic API call function
async function apiCall<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
}

// University API functions
export const universityApi = {
  getAll: (): Promise<University[]> => apiCall<University[]>("/universities"),
  getById: (id: string): Promise<University> =>
    apiCall<University>(`/universities/${id}`),
  search: (query: string): Promise<University[]> =>
    apiCall<University[]>(
      `/universities/search?q=${encodeURIComponent(query)}`
    ),
};

// Country API functions
export const countryApi = {
  getAll: (): Promise<Country[]> => apiCall<Country[]>("/countries"),
  getById: (id: string): Promise<Country> =>
    apiCall<Country>(`/countries/${id}`),
  search: (query: string): Promise<Country[]> =>
    apiCall<Country[]>(`/countries/search?q=${encodeURIComponent(query)}`),
};

// Exam API functions
export const examApi = {
  getAll: (): Promise<Exam[]> => apiCall<Exam[]>("/exams"),
  getById: (id: string): Promise<Exam> => apiCall<Exam>(`/exams/${id}`),
  getByType: (type: string): Promise<Exam[]> =>
    apiCall<Exam[]>(`/exams/type/${type}`),
};

// User API functions
export const userApi = {
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

// Recommendation API functions
export const recommendationApi = {
  getUniversityRecommendations: (): Promise<Record<string, unknown>[]> =>
    apiCall<Record<string, unknown>[]>("/recommendations/universities"),
  getProgramRecommendations: (): Promise<Record<string, unknown>[]> =>
    apiCall<Record<string, unknown>[]>("/recommendations/programs"),
  getScholarshipRecommendations: (): Promise<Record<string, unknown>[]> =>
    apiCall<Record<string, unknown>[]>("/recommendations/scholarships"),
};

// Document API functions
export const documentApi = {
  getAll: (): Promise<{ success: boolean; data: Document[]; count: number }> =>
    apiCall<{ success: boolean; data: Document[]; count: number }>(
      "/documents"
    ),

  getById: (id: number): Promise<{ success: boolean; data: Document }> =>
    apiCall<{ success: boolean; data: Document }>(`/documents/${id}`),

  upload: (
    formData: FormData
  ): Promise<{ success: boolean; message: string; data: Document }> =>
    apiCall<{ success: boolean; message: string; data: Document }>(
      "/documents/upload",
      {
        method: "POST",
        body: formData,
      }
    ),

  update: (
    id: number,
    data: Partial<Document>
  ): Promise<{ success: boolean; message: string; data: Document }> =>
    apiCall<{ success: boolean; message: string; data: Document }>(
      `/documents/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      }
    ),

  delete: (id: number): Promise<{ success: boolean; message: string }> =>
    apiCall<{ success: boolean; message: string }>(`/documents/${id}`, {
      method: "DELETE",
    }),

  download: (id: number): Promise<Blob> =>
    fetch(`${API_BASE_URL}/documents/${id}/download`).then(res => res.blob()),
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
