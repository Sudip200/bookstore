"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const HashService_1 = __importDefault(require("../services/HashService"));
const JWTService_1 = __importDefault(require("../services/JWTService"));
const hashservice = HashService_1.default.getInstance();
const jwtService = JWTService_1.default.getInstance();
class AuthController {
    static async register(req, res) {
        let { name, email, password } = req.body;
        try {
            const existingUser = await User_1.default.find(email);
            if (existingUser) {
                res.status(409).json({ status: 'error', message: 'Email already in use.' });
                return;
            }
            let hasedPassword = await hashservice.hash(password);
            const user = new User_1.default(name, email, hasedPassword);
            await user.save();
            let token = jwtService.sign({ userId: user.id, email: user.email, name: user.name });
            res.status(201).json({
                status: 'success',
                message: 'User registerd successfully',
                token: token
            });
        }
        catch (err) {
            console.error('Register Error:', err.message);
            res.status(500).json({ status: 'error', message: 'Registration failed' });
        }
    }
    static async login(req, res) {
        let { email, password } = req.body;
        try {
            const user = await User_1.default.find(email);
            if (!user) {
                throw new Error('User not found');
            }
            let isMatched = await hashservice.compare(user.password, password);
            console.log(isMatched);
            if (!isMatched) {
                res.status(401).json({ status: 'error', message: 'Invalid credentials' });
                return;
            }
            let token = jwtService.sign({ userId: user.id, email: user.email, name: user.name });
            res.status(200).json({
                status: 'success',
                message: 'User loggged in successfully',
                token: token
            });
        }
        catch (err) {
            console.error('Login Error:', err.message);
            res.status(500).json({ status: 'error', message: `Login failed ${err.message}` });
        }
    }
}
exports.default = AuthController;
