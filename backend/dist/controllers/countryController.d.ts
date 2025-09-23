import { Request, Response, NextFunction } from "express";
import { Country, ApiResponse, SearchQuery } from "../types";
export declare const getAllCountries: (req: Request<{}, ApiResponse<Country[]>, {}, SearchQuery>, res: Response<ApiResponse<Country[]>>, next: NextFunction) => Promise<void>;
export declare const getCountryById: (req: Request<{
    id: string;
}>, res: Response<ApiResponse<Country>>, next: NextFunction) => Promise<void>;
export declare const searchCountries: (req: Request<{}, ApiResponse<Country[]>, {}, {
    q: string;
}>, res: Response<ApiResponse<Country[]>>, next: NextFunction) => Promise<void>;
export declare const createCountry: (req: Request<{}, ApiResponse<Country>, Country>, res: Response<ApiResponse<Country>>, next: NextFunction) => Promise<void>;
export declare const deleteCountry: (req: Request<{
    id: string;
}>, res: Response<ApiResponse<{}>>, next: NextFunction) => Promise<void>;
//# sourceMappingURL=countryController.d.ts.map