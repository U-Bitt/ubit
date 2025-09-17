"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const scholarshipController_1 = require("../controllers/scholarshipController");
const router = express_1.default.Router();
router.get("/", scholarshipController_1.getAllScholarships);
router.get("/search", scholarshipController_1.searchScholarships);
router.get("/:id", scholarshipController_1.getScholarshipById);
exports.default = router;
//# sourceMappingURL=scholarships.js.map