import mongoose, { Document } from "mongoose";
export interface IUniversity extends Document {
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
    deadline: string;
    description?: string;
    website?: string;
    founded?: number;
    type?: "public" | "private";
    size?: "small" | "medium" | "large";
    requirements?: string[];
    scholarships?: {
        name: string;
        amount: string;
        requirements: string[];
        deadline: string;
        description?: string;
    }[];
    campusSize?: string;
    studentFacultyRatio?: string;
    createdAt: Date;
    updatedAt: Date;
}
declare const University: mongoose.Model<IUniversity, {}, {}, {}, mongoose.Document<unknown, {}, IUniversity, {}, {}> & IUniversity & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default University;
//# sourceMappingURL=University.d.ts.map