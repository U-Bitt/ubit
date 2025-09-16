import { Request, Response, NextFunction } from "express";
import { User, Application, ApiResponse } from "../types";
export declare const getUserProfile: (req: Request<{}, ApiResponse<User>>, res: Response<ApiResponse<User>>, next: NextFunction) => Promise<void>;
export declare const updateUserProfile: (req: Request<{}, ApiResponse<User>, Partial<User>>, res: Response<ApiResponse<User>>, next: NextFunction) => Promise<void>;
export declare const getUserApplications: (req: Request<{}, ApiResponse<Application[]>>, res: Response<ApiResponse<Application[]>>, next: NextFunction) => Promise<void>;
export declare const createApplication: (req: Request<{}, ApiResponse<Application>, Partial<Application>>, res: Response<ApiResponse<Application>>, next: NextFunction) => Promise<void>;
//# sourceMappingURL=userController.d.ts.map