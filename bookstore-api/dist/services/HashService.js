"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class HashService {
    constructor() {
        this.saltRound = config_1.default.saltRounds;
    }
    static getInstance() {
        if (!HashService.instance) {
            HashService.instance = new HashService();
        }
        return HashService.instance;
    }
    async hash(password) {
        return await bcryptjs_1.default.hash(password, this.saltRound);
    }
    async compare(hash, password) {
        return await bcryptjs_1.default.compare(password, hash);
    }
}
exports.default = HashService;
