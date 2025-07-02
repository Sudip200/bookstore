import { Request, Response, NextFunction, RequestHandler } from 'express';
import JWTSingeltonService from "../services/JWTService";

const jwtService = JWTSingeltonService.getInstance();

declare module 'express-serve-static-core' {
  interface Request {
    userId?: string;
  }
}

class AuthMiddleware {
  static authenticate(req: Request, res: Response, next: NextFunction):void {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
       res.status(401).json({
          status: 'error',
          message: 'Authorization token missing or malformed'
        });
        return
      }
      const token = authHeader.split(' ')[1];
      const decoded = jwtService.verify(token);

      if (!decoded || !decoded.userId) {
       res.status(401).json({
          status: 'error',
          message: 'Invalid or expired token'
        });
        return
      }

      req.userId = decoded.userId;
      next();
    } catch (error) {
       res.status(401).json({
        status: 'error',
        message: 'Unauthorized: Invalid token'
      });
    
    }
  }
}

export default AuthMiddleware;
