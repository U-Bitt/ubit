import { Request, Response } from "express";
export declare const documentController: {
    getAllDocuments: (req: Request, res: Response) => Promise<void>;
    createDocument: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    updateDocument: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    deleteDocument: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
//# sourceMappingURL=documentController.d.ts.map