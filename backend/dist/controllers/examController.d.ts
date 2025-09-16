import { Request, Response, NextFunction } from "express";
import { Exam, ApiResponse } from "../types";
export declare const getAllExams: (req: Request<{}, ApiResponse<Exam[]>>, res: Response<ApiResponse<Exam[]>>, next: NextFunction) => Promise<void>;
export declare const getExamById: (req: Request<{
    id: string;
}>, res: Response<ApiResponse<Exam>>, next: NextFunction) => Promise<void>;
export declare const getExamsByType: (req: Request<{
    type: string;
}>, res: Response<ApiResponse<Exam[]>>, next: NextFunction) => Promise<void>;
//# sourceMappingURL=examController.d.ts.map