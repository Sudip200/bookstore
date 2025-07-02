import { Request, Response, NextFunction } from 'express';
class LoggerMiddleWare {
    static loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
        const start = Date.now();
        res.on('finish', () => {
            const elapsed = Date.now() - start;
            console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${elapsed}ms`);
        });
        next();
    };
}
export default LoggerMiddleWare;