import { Request, Response, NextFunction } from "express";
import { Visa, ApiResponse, SearchQuery } from "../types";
export declare const getAllVisas: (req: Request<{}, ApiResponse<Visa[]>, {}, SearchQuery>, res: Response<ApiResponse<Visa[]>>, next: NextFunction) => Promise<void>;
export declare const getVisaById: (req: Request<{
    id: string;
}>, res: Response<ApiResponse<Visa>>, next: NextFunction) => Promise<void>;
export declare const searchVisas: (req: Request<{}, ApiResponse<Visa[]>, {}, {
    q: string;
}>, res: Response<ApiResponse<Visa[]>>, next: NextFunction) => Promise<void>;
//# sourceMappingURL=visaController.d.ts.map