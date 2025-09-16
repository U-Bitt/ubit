"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const universityController_1 = require("../controllers/universityController");
const router = express_1.default.Router();
router.get("/", universityController_1.getAllUniversities);
router.get("/search", universityController_1.searchUniversities);
router.get("/:id", universityController_1.getUniversityById);
router.post("/", universityController_1.createUniversity);
router.put("/:id", universityController_1.updateUniversity);
router.delete("/:id", universityController_1.deleteUniversity);
exports.default = router;
//# sourceMappingURL=universities.js.map