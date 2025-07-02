"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const config_1 = __importDefault(require("./config"));
const logger_1 = __importDefault(require("./middlewares/logger"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const cors_1 = __importDefault(require("cors"));
const swagger_1 = __importDefault(require("./docs/swagger"));
const app = (0, express_1.default)();
let PORT = config_1.default.port;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// openapi docs
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
// logger middleware
app.use(logger_1.default.loggerMiddleware);
// v1 Routes 
app.use('/api/v1', index_1.default);
// root route 
app.get('/', (req, res, next) => {
    res.status(404).json({ message: 'Server running successfully' });
});
// global error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});
// 404 route
app.use((req, res, next) => {
    res.status(404).json({ error: '404 Not Found' });
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
