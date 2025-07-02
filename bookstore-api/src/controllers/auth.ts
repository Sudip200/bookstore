import User from "../models/User";
import HashService from "../services/HashService";
import JWTSingeltonService from "../services/JWTService";
import { Request, Response } from 'express';
const hashservice = HashService.getInstance();
const jwtService = JWTSingeltonService.getInstance();
class AuthController {
    static async register(req: Request, res: Response) {
        let { name, email, password } = req.body;
        try {
            const existingUser = await User.find(email);
            if (existingUser) {
                res.status(409).json({ status: 'error', message: 'Email already in use.' });
                return
            }
            let hasedPassword = await hashservice.hash(password);
            const user = new User(name, email, hasedPassword);
            await user.save();
            let token = jwtService.sign({ userId: user.id, email: user.email, name: user.name })
            res.status(201).json({
                status: 'success',
                message: 'User registerd successfully',
                token: token
            })
        } catch (err: any) {
            console.error('Register Error:', err.message);
            res.status(500).json({ status: 'error', message: 'Registration failed' });
        }
    }
    static async login(req: Request, res: Response) {
        let { email, password } = req.body;
        try {
            const user: User | null = await User.find(email);
            if (!user) {
                throw new Error('User not found');
            }
            let isMatched = await hashservice.compare(user.password,password);
            console.log(isMatched)
            if (!isMatched) {
                 res.status(401).json({ status: 'error', message: 'Invalid credentials' });
                 return

            }
            let token = jwtService.sign({ userId: user.id, email: user.email, name: user.name })
            res.status(200).json({
                status: 'success',
                message: 'User loggged in successfully',
                token: token
            })
        } catch (err: any) {
            console.error('Login Error:', err.message);
            res.status(500).json({ status: 'error', message: `Login failed ${err.message}` });
        }
    }
}
export default AuthController;