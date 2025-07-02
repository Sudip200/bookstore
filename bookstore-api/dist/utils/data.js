"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readData = exports.writeData = void 0;
const fs_1 = __importDefault(require("fs"));
const writeData = async (path, data) => {
    try {
        const json = JSON.stringify(data, null, 2);
        await fs_1.default.promises.writeFile(path, json, 'utf-8');
    }
    catch (err) {
        console.log(err);
        throw new Error('Failed to read to file');
    }
};
exports.writeData = writeData;
const readData = async (path) => {
    try {
        console.log(path);
        let data = await fs_1.default.promises.readFile(path, 'utf-8');
        return JSON.parse(data);
    }
    catch (err) {
        console.log(err);
        throw new Error('Failed to read to file');
    }
};
exports.readData = readData;
