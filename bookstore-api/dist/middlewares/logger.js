"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LoggerMiddleWare {
}
LoggerMiddleWare.loggerMiddleware = (req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const elapsed = Date.now() - start;
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${elapsed}ms`);
    });
    next();
};
exports.default = LoggerMiddleWare;
