"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const testScoreController_1 = require("../controllers/testScoreController");
const router = express_1.default.Router();
router.get("/", testScoreController_1.testScoreController.getAllTestScores);
router.post("/", testScoreController_1.testScoreController.createTestScore);
router.put("/:id", testScoreController_1.testScoreController.updateTestScore);
router.delete("/:id", testScoreController_1.testScoreController.deleteTestScore);
exports.default = router;
//# sourceMappingURL=testScores.js.map