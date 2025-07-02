"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    jwtSecret: process.env.JWT_SECRET || '123',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
    saltRounds: process.env.SALT_ROUND || 10,
    port: process.env.PORT || 3000
};
exports.default = config;
