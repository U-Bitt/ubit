import { Request, Response, NextFunction } from "express";
import { Scholarship, ApiResponse, SearchQuery } from "../types";
export declare const getAllScholarships: (req: Request<{}, ApiResponse<Scholarship[]>, {}, SearchQuery>, res: Response<ApiResponse<Scholarship[]>>, next: NextFunction) => Promise<void>;
export declare const getScholarshipsByUniversity: (req: Request<{
    universityName: string;
}, ApiResponse<Scholarship[]>, {}, {}>, res: Response<ApiResponse<Scholarship[]>>, next: NextFunction) => Promise<void>;
export declare const getScholarshipById: (req: Request<{
    id: string;
}>, res: Response<ApiResponse<Scholarship>>, next: NextFunction) => Promise<void>;
export declare const searchScholarships: (req: Request<{}, ApiResponse<Scholarship[]>, {}, {
    q: string;
}>, res: Response<ApiResponse<Scholarship[]>>, next: NextFunction) => Promise<void>;
export declare const createScholarship: (req: Request<{}, ApiResponse<Scholarship>, Scholarship>, res: Response<ApiResponse<Scholarship>>, next: NextFunction) => Promise<void>;
export declare const deleteScholarship: (req: Request<{
    id: string;
}>, res: Response<ApiResponse<{}>>, next: NextFunction) => Promise<void>;
//# sourceMappingURL=scholarshipController.d.ts.map