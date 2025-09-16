"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.get("/profile", userController_1.getUserProfile);
router.put("/profile", userController_1.updateUserProfile);
router.get("/applications", userController_1.getUserApplications);
router.post("/applications", userController_1.createApplication);
exports.default = router;
//# sourceMappingURL=users.js.map