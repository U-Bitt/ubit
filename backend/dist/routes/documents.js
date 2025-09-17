"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const documentController_1 = require("../controllers/documentController");
const router = express_1.default.Router();
router.get("/", documentController_1.documentController.getAllDocuments);
router.post("/", documentController_1.documentController.createDocument);
router.put("/:id", documentController_1.documentController.updateDocument);
router.delete("/:id", documentController_1.documentController.deleteDocument);
exports.default = router;
//# sourceMappingURL=documents.js.map