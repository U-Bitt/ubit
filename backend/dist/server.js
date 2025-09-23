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
const scholarships_1 = __importDefault(require("./routes/scholarships"));
const visas_1 = __importDefault(require("./routes/visas"));
const ai_1 = __importDefault(require("./routes/ai"));
const errorHandler_1 = require("./middleware/errorHandler");
const notFound_1 = require("./middleware/notFound");
const database_1 = __importDefault(require("./config/database"));
dotenv_1.default.config();
const initializeDatabase = async () => {
    await (0, database_1.default)();
};
initializeDatabase();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5001;
app.use((0, helmet_1.default)({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
    crossOriginResourcePolicy: false,
    frameguard: false,
}));
app.use((0, cors_1.default)({
    origin: [
        process.env.CORS_ORIGIN || "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3000",
    ],
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
app.use("/uploads", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
}, express_1.default.static("uploads"));
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running",
        timestamp: new Date().toISOString(),
    });
});
app.use("/api/universities", universities_1.default);
app.use("/api/countries", countries_1.default);
app.use("/api/exams", exams_1.default);
app.use("/api/users", users_1.default);
app.use("/api/test-scores", testScores_1.default);
app.use("/api/documents", documents_1.default);
app.use("/api/scholarships", scholarships_1.default);
app.use("/api/visas", visas_1.default);
app.use("/api/ai", ai_1.default);
app.use(notFound_1.notFound);
app.use(errorHandler_1.errorHandler);
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`🌐 API Base URL: http://localhost:${PORT}/api`);
});
exports.default = app;
//# sourceMappingURL=server.js.map