"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const documentController_1 = require("../controllers/documentController");
const router = express_1.default.Router();
router.get("/user/:userId", documentController_1.getAllDocuments);
router.get("/:id", documentController_1.getDocumentById);
router.get("/:id/versions", documentController_1.getDocumentVersions);
router.post("/upload/:userId", documentController_1.uploadMiddleware, documentController_1.uploadDocument);
router.post("/:id/version", documentController_1.uploadMiddleware, documentController_1.uploadNewVersion);
router.put("/:id", documentController_1.updateDocument);
router.delete("/:id", documentController_1.deleteDocument);
exports.default = router;
//# sourceMappingURL=documents.js.map