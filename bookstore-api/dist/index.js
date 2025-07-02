"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
http_1.default.createServer((req, res) => {
    res.writeHead(200);
    res.write('Api is running');
    res.end();
}).listen(3000, () => {
    console.log('Server is running');
});
