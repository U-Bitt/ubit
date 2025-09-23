import { Request, Response } from "express";
export declare const getAllDocuments: (req: Request, res: Response) => Promise<void>;
export declare const getDocumentById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getDocumentVersions: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const uploadDocument: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateDocument: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const uploadNewVersion: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteDocument: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const uploadMiddleware: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
//# sourceMappingURL=documentController.d.ts.map