"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./user"));
const book_1 = __importDefault(require("./book"));
const express_1 = require("express");
let router = (0, express_1.Router)();
router.use(user_1.default);
router.use(book_1.default);
exports.default = router;
