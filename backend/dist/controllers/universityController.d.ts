import { Request, Response, NextFunction } from "express";
import { University, ApiResponse, SearchQuery } from "../types";
export declare const getAllUniversities: (req: Request<{}, ApiResponse<University[]>, {}, SearchQuery>, res: Response<ApiResponse<University[]>>, next: NextFunction) => Promise<void>;
export declare const getUniversityById: (req: Request<{
    id: string;
}>, res: Response<ApiResponse<University>>, next: NextFunction) => Promise<void>;
export declare const searchUniversities: (req: Request<{}, ApiResponse<University[]>, {}, SearchQuery>, res: Response<ApiResponse<University[]>>, next: NextFunction) => Promise<void>;
export declare const createUniversity: (req: Request<{}, ApiResponse<University>, University>, res: Response<ApiResponse<University>>, next: NextFunction) => Promise<void>;
export declare const updateUniversity: (req: Request<{
    id: string;
}, ApiResponse<University>, Partial<University>>, res: Response<ApiResponse<University>>, next: NextFunction) => Promise<void>;
export declare const deleteUniversity: (req: Request<{
    id: string;
}>, res: Response<ApiResponse<{}>>, next: NextFunction) => Promise<void>;
//# sourceMappingURL=universityController.d.ts.map