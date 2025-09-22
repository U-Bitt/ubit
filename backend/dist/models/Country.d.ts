import mongoose, { Document } from "mongoose";
export interface ICountry extends Document {
    name: string;
    flag: string;
    popularCities: string[];
    rating: number;
    description: string;
    visaType: string;
    workRights: string;
    avgTuition: string;
    livingCost: string;
    currency: string;
    language: string[];
    climate: string;
    isEnglishSpeaking?: boolean;
    isLowCost?: boolean;
    hasWorkRights?: boolean;
    createdAt: Date;
    updatedAt: Date;
}
declare const Country: mongoose.Model<ICountry, {}, {}, {}, mongoose.Document<unknown, {}, ICountry, {}, {}> & ICountry & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Country;
//# sourceMappingURL=Country.d.ts.map