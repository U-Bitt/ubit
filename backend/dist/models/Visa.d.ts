import mongoose, { Document } from "mongoose";
export interface IVisa extends Document {
    country: string;
    type: string;
    processingTime: string;
    cost: string;
    validity: string;
    requirements: string[];
    documents: string[];
    officialWebsite: string;
    description?: string;
    eligibility?: string[];
    restrictions?: string[];
    benefits?: string[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
declare const Visa: mongoose.Model<IVisa, {}, {}, {}, mongoose.Document<unknown, {}, IVisa, {}, {}> & IVisa & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Visa;
//# sourceMappingURL=Visa.d.ts.map