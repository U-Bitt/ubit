import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../types";
interface AISuggestRequest {
    gpa: string;
    sat: string;
    toefl: string;
    major: string;
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
}
export declare const suggestUniversities: (req: Request<{}, ApiResponse<UniversitySuggestion[]>, AISuggestRequest>, res: Response<ApiResponse<UniversitySuggestion[]>>, next: NextFunction) => Promise<void>;
export {};
//# sourceMappingURL=aiController.d.ts.map