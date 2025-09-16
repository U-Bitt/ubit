import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../types";
declare const universityRecommendations: {
    id: string;
    name: string;
    reason: string;
    matchScore: number;
    location: string;
    ranking: number;
    tuition: string;
}[];
declare const programRecommendations: {
    id: string;
    name: string;
    university: string;
    reason: string;
    matchScore: number;
    duration: string;
    requirements: string[];
}[];
declare const scholarshipRecommendations: {
    id: string;
    name: string;
    university: string;
    amount: string;
    type: string;
    reason: string;
    matchScore: number;
    deadline: string;
    requirements: string[];
}[];
export declare const getUniversityRecommendations: (req: Request<{}, ApiResponse<typeof universityRecommendations>>, res: Response<ApiResponse<typeof universityRecommendations>>, next: NextFunction) => Promise<void>;
export declare const getProgramRecommendations: (req: Request<{}, ApiResponse<typeof programRecommendations>>, res: Response<ApiResponse<typeof programRecommendations>>, next: NextFunction) => Promise<void>;
export declare const getScholarshipRecommendations: (req: Request<{}, ApiResponse<typeof scholarshipRecommendations>>, res: Response<ApiResponse<typeof scholarshipRecommendations>>, next: NextFunction) => Promise<void>;
export {};
//# sourceMappingURL=recommendationController.d.ts.map