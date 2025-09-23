import mongoose, { Document } from "mongoose";
export interface IUser extends Document {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
    dateOfBirth?: Date;
    nationality?: string;
    avatar?: string;
    personalInfo?: {
        firstName: string;
        lastName: string;
        email: string;
        phone?: string;
        dateOfBirth?: Date;
        nationality?: string;
    };
    academicInfo?: {
        gpa: number;
        highSchoolName: string;
        graduationYear: number;
        intendedMajors: string[];
    };
    areasOfInterest?: string[];
    testScores?: Array<{
        id: string;
        testName: string;
        score: string;
        date: Date;
        maxScore?: string;
        percentile?: number;
    }>;
    documents?: Array<{
        id: string;
        name: string;
        type: string;
        url?: string;
        uploadedAt: Date;
        status: "draft" | "uploaded" | "verified" | "rejected";
    }>;
    savedUniversities?: Array<{
        id: string;
        universityId: string;
        universityName: string;
        savedAt: Date;
        notes?: string;
    }>;
    preferences?: {
        countries: string[];
        programs: string[];
        budget: {
            min: number;
            max: number;
            currency: string;
        };
        examScores?: Record<string, number>;
    };
    applications?: Array<{
        id: string;
        universityId?: string;
        program?: string;
        status: "draft" | "submitted" | "under_review" | "accepted" | "rejected";
        documents: string[];
        submittedAt?: Date;
        deadline?: Date;
    }>;
    isActive: boolean;
    isEmailVerified: boolean;
    lastLogin?: Date;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
    toJSON(): any;
}
declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default User;
//# sourceMappingURL=User.d.ts.map