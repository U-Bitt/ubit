"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const visaController_1 = require("../controllers/visaController");
const router = express_1.default.Router();
router.get("/", visaController_1.getAllVisas);
router.get("/search", visaController_1.searchVisas);
router.get("/:id", visaController_1.getVisaById);
exports.default = router;
//# sourceMappingURL=visas.js.map