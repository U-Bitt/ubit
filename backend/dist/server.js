"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const dotenv_1 = __importDefault(require("dotenv"));
const universities_1 = __importDefault(require("./routes/universities"));
const countries_1 = __importDefault(require("./routes/countries"));
const exams_1 = __importDefault(require("./routes/exams"));
const users_1 = __importDefault(require("./routes/users"));
const testScores_1 = __importDefault(require("./routes/testScores"));
const documents_1 = __importDefault(require("./routes/documents"));
const errorHandler_1 = require("./middleware/errorHandler");
const notFound_1 = require("./middleware/notFound");
const database_1 = __importDefault(require("./config/database"));
const seedData_1 = require("./utils/seedData");
dotenv_1.default.config();
const initializeDatabase = async () => {
    await (0, database_1.default)();
    await (0, seedData_1.seedUniversities)();
};
initializeDatabase();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
}));
const limiter = (0, express_rate_limit_1.default)({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000"),
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "100"),
    message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);
app.use((0, morgan_1.default)("combined"));
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "10mb" }));
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "Ubit Education API is running",
        timestamp: new Date().toISOString(),
    });
});
app.use("/api/universities", universities_1.default);
app.use("/api/countries", countries_1.default);
app.use("/api/exams", exams_1.default);
app.use("/api/user", users_1.default);
app.use("/api/test-scores", testScores_1.default);
app.use("/api/documents", documents_1.default);
app.use(notFound_1.notFound);
app.use(errorHandler_1.errorHandler);
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📚 Ubit Education API is ready!`);
    console.log(`🌐 Health check: http://localhost:${PORT}/health`);
});
exports.default = app;
//# sourceMappingURL=server.js.map