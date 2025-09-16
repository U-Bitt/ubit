"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const examController_1 = require("../controllers/examController");
const router = express_1.default.Router();
router.get("/", examController_1.getAllExams);
router.get("/type/:type", examController_1.getExamsByType);
router.get("/:id", examController_1.getExamById);
exports.default = router;
//# sourceMappingURL=exams.js.map