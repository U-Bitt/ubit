import { Request, Response, NextFunction } from "express";
import { IUser } from "../models/User";
import { User as UserType, Application, ApiResponse, SearchQuery } from "../types";
export declare const registerUser: (req: Request<{}, ApiResponse<{
    user: UserType;
    token: string;
}>, {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    nationality?: string;
    phone?: string;
}>, res: Response<ApiResponse<{
    user: UserType;
    token: string;
}>>, next: NextFunction) => Promise<void>;
export declare const loginUser: (req: Request<{}, ApiResponse<{
    user: UserType;
    token: string;
}>, {
    email: string;
    password: string;
}>, res: Response<ApiResponse<{
    user: UserType;
    token: string;
}>>, next: NextFunction) => Promise<void>;
export declare const getAllUsers: (req: Request<{}, ApiResponse<UserType[]>, {}, SearchQuery>, res: Response<ApiResponse<UserType[]>>, next: NextFunction) => Promise<void>;
export declare const getUserById: (req: Request<{
    id: string;
}>, res: Response<ApiResponse<UserType>>, next: NextFunction) => Promise<void>;
export declare const updateUserById: (req: Request<{
    id: string;
}, ApiResponse<UserType>, Partial<IUser>>, res: Response<ApiResponse<UserType>>, next: NextFunction) => Promise<void>;
export declare const getUserProfile: (req: Request<{}, ApiResponse<UserType>>, res: Response<ApiResponse<UserType>>, next: NextFunction) => Promise<void>;
export declare const updateUserProfile: (req: Request<{}, ApiResponse<UserType>, Partial<UserType>>, res: Response<ApiResponse<UserType>>, next: NextFunction) => Promise<void>;
export declare const deleteUser: (req: Request<{
    id: string;
}>, res: Response<ApiResponse<{}>>, next: NextFunction) => Promise<void>;
export declare const getUserApplications: (req: Request<{}, ApiResponse<Application[]>>, res: Response<ApiResponse<Application[]>>, next: NextFunction) => Promise<void>;
export declare const createApplication: (req: Request<{}, ApiResponse<Application>, Partial<Application>>, res: Response<ApiResponse<Application>>, next: NextFunction) => Promise<void>;
export declare const updateApplication: (req: Request<{
    appId: string;
}, ApiResponse<Application>, Partial<Application>>, res: Response<ApiResponse<Application>>, next: NextFunction) => Promise<void>;
export declare const deleteApplication: (req: Request<{
    appId: string;
}>, res: Response<ApiResponse<{}>>, next: NextFunction) => Promise<void>;
export declare const getTestScores: (req: Request<{}, ApiResponse<any[]>>, res: Response<ApiResponse<any[]>>, next: NextFunction) => Promise<void>;
export declare const addTestScore: (req: Request<{}, ApiResponse<any>, {
    testName: string;
    score: string;
    date: string;
    maxScore?: string;
    percentile?: number;
}>, res: Response<ApiResponse<any>>, next: NextFunction) => Promise<void>;
export declare const updateTestScore: (req: Request<{
    testId: string;
}, ApiResponse<any>, {
    testName?: string;
    score?: string;
    date?: string;
    maxScore?: string;
    percentile?: number;
}>, res: Response<ApiResponse<any>>, next: NextFunction) => Promise<void>;
export declare const deleteTestScore: (req: Request<{
    testId: string;
}>, res: Response<ApiResponse<{}>>, next: NextFunction) => Promise<void>;
export declare const getDocuments: (req: Request<{}, ApiResponse<any[]>>, res: Response<ApiResponse<any[]>>, next: NextFunction) => Promise<void>;
export declare const addDocument: (req: Request<{}, ApiResponse<any>, {
    name: string;
    type: string;
    url?: string;
}>, res: Response<ApiResponse<any>>, next: NextFunction) => Promise<void>;
export declare const updateDocument: (req: Request<{
    docId: string;
}, ApiResponse<any>, {
    name?: string;
    type?: string;
    url?: string;
    status?: string;
}>, res: Response<ApiResponse<any>>, next: NextFunction) => Promise<void>;
export declare const deleteDocument: (req: Request<{
    docId: string;
}>, res: Response<ApiResponse<{}>>, next: NextFunction) => Promise<void>;
export declare const getSavedUniversities: (req: Request<{}, ApiResponse<any[]>>, res: Response<ApiResponse<any[]>>, next: NextFunction) => Promise<void>;
export declare const saveUniversity: (req: Request<{}, ApiResponse<any>, {
    universityId: string;
    universityName: string;
    notes?: string;
}>, res: Response<ApiResponse<any>>, next: NextFunction) => Promise<void>;
export declare const unsaveUniversity: (req: Request<{
    savedId: string;
}>, res: Response<ApiResponse<{}>>, next: NextFunction) => Promise<void>;
export declare const updatePersonalInfo: (req: Request<{}, ApiResponse<any>, {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    dateOfBirth?: string;
    nationality?: string;
}>, res: Response<ApiResponse<any>>, next: NextFunction) => Promise<void>;
export declare const updateAcademicInfo: (req: Request<{}, ApiResponse<any>, {
    gpa?: number;
    highSchoolName?: string;
    graduationYear?: number;
    intendedMajors?: string[];
}>, res: Response<ApiResponse<any>>, next: NextFunction) => Promise<void>;
export declare const updateAreasOfInterest: (req: Request<{}, ApiResponse<string[]>, {
    areasOfInterest: string[];
}>, res: Response<ApiResponse<string[]>>, next: NextFunction) => Promise<void>;
//# sourceMappingURL=userController.d.ts.map