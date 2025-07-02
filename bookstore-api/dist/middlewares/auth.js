"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JWTService_1 = __importDefault(require("../services/JWTService"));
const jwtService = JWTService_1.default.getInstance();
class AuthMiddleware {
    static authenticate(req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                res.status(401).json({
                    status: 'error',
                    message: 'Authorization token missing or malformed'
                });
                return;
            }
            const token = authHeader.split(' ')[1];
            const decoded = jwtService.verify(token);
            if (!decoded || !decoded.userId) {
                res.status(401).json({
                    status: 'error',
                    message: 'Invalid or expired token'
                });
                return;
            }
            req.userId = decoded.userId;
            next();
        }
        catch (error) {
            res.status(401).json({
                status: 'error',
                message: 'Unauthorized: Invalid token'
            });
        }
    }
}
exports.default = AuthMiddleware;
