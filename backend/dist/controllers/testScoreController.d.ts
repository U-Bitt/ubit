import { Request, Response } from "express";
export declare const testScoreController: {
    getAllTestScores: (req: Request, res: Response) => Promise<void>;
    createTestScore: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    updateTestScore: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    deleteTestScore: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
//# sourceMappingURL=testScoreController.d.ts.map