import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../types";
interface AISuggestRequest {
    gpa: string;
    sat: string;
    toefl: string;
    major: string;
    documents?: {
        essays?: {
            content?: string;
        };
        recommendations?: Array<{
            completed?: boolean;
            submitted?: boolean;
            letterContent?: string;
        }>;
        documents?: Array<{
            type?: string;
            name?: string;
            verified?: boolean;
            complete?: boolean;
        }>;
    };
}
interface UniversitySuggestion {
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
    scoreDetails: {
        gpa: {
            yourScore: number;
            required: string;
            status: "excellent" | "good" | "average" | "below_average";
            points: number;
        };
        sat: {
            yourScore: number;
            required: string;
            status: "excellent" | "good" | "average" | "below_average";
            points: number;
        };
        ielts: {
            yourScore: number;
            required: string;
            status: "excellent" | "good" | "average" | "below_average";
            points: number;
        };
        major: {
            yourMajor: string;
            matchingPrograms: string[];
            status: "perfect_match" | "good_match" | "partial_match" | "no_match";
            points: number;
        };
    };
}
export declare const suggestUniversities: (req: Request<{}, ApiResponse<UniversitySuggestion[]>, AISuggestRequest>, res: Response<ApiResponse<UniversitySuggestion[]>>, next: NextFunction) => Promise<void>;
export {};
//# sourceMappingURL=aiController.d.ts.map