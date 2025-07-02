"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const UuidService_1 = __importDefault(require("../services/UuidService"));
const data_1 = require("../utils/data");
const USERS_PATH = path_1.default.join(__dirname, '..', 'data/users.json');
const uuidService = new UuidService_1.default();
const uuidInstance = uuidService.getInstance();
class User {
    constructor(name, email, password) {
        this.id = uuidInstance.generateId();
        this.name = name;
        this.email = email;
        this.password = password;
    }
    async save() {
        const users = await (0, data_1.readData)(USERS_PATH);
        await (0, data_1.writeData)(USERS_PATH, [...users, this]);
    }
    static async findById(userId) {
        const users = await (0, data_1.readData)(USERS_PATH);
        return users.find(user => user.id === userId);
    }
    static async find(email) {
        let users = await (0, data_1.readData)(USERS_PATH);
        return users.find((user) => user.email == email);
    }
}
exports.default = User;
