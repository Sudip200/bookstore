import config from "../config";
import jwt from 'jsonwebtoken';
class JWTSingeltonService {
    public static instance: JWTSingeltonService;
    private expiresIn: string;
    private jwtSecret: string;
    private constructor() {
        this.jwtSecret = config.jwtSecret;
        this.expiresIn = config.jwtExpiresIn;
    }
    public static getInstance() {
        if (!JWTSingeltonService.instance) {
            JWTSingeltonService.instance = new JWTSingeltonService();
        }
        return JWTSingeltonService.instance;
    }
    decode(token: string): any {
        return jwt.decode(token);
    }
    sign(payload: string | object): string {
        return jwt.sign(payload, this.jwtSecret, { expiresIn: this.expiresIn as string });
    }
    verify(token: string): any {
        return jwt.verify(token, this.jwtSecret)
    }
}
export default JWTSingeltonService;