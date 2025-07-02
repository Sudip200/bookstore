"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JWTSingeltonService {
    constructor() {
        this.jwtSecret = config_1.default.jwtSecret;
        this.expiresIn = config_1.default.jwtExpiresIn;
    }
    static getInstance() {
        if (!JWTSingeltonService.instance) {
            JWTSingeltonService.instance = new JWTSingeltonService();
        }
        return JWTSingeltonService.instance;
    }
    decode(token) {
        return jsonwebtoken_1.default.decode(token);
    }
    sign(payload) {
        const options = {
            expiresIn: this.expiresIn,
        };
        return jsonwebtoken_1.default.sign(payload, this.jwtSecret, options);
    }
    verify(token) {
        return jsonwebtoken_1.default.verify(token, this.jwtSecret);
    }
}
exports.default = JWTSingeltonService;
