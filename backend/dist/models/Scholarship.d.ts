import mongoose, { Document } from "mongoose";
export interface IScholarship extends Document {
    title: string;
    description: string;
    amount: string;
    university: string;
    country: string;
    deadline: string;
    type: string;
    requirements: string[];
    coverage: string;
    duration: string;
    applicationProcess: string;
    eligibility: string;
    benefits: string[];
    image: string;
    donor?: string;
    contactEmail?: string;
    website?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
declare const Scholarship: mongoose.Model<IScholarship, {}, {}, {}, mongoose.Document<unknown, {}, IScholarship, {}, {}> & IScholarship & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Scholarship;
//# sourceMappingURL=Scholarship.d.ts.map