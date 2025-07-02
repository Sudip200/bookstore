"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../middlewares/auth"));
const book_1 = __importDefault(require("../controllers/book"));
let router = (0, express_1.Router)();
router.get('/books', [auth_1.default.authenticate], book_1.default.getAllBooks);
router.get('/books/:id', [auth_1.default.authenticate], book_1.default.getBookById);
router.post('/books', [auth_1.default.authenticate], book_1.default.postBook);
router.put('/books/:id', [auth_1.default.authenticate], book_1.default.updateBook);
router.delete('/books/:id', [auth_1.default.authenticate], book_1.default.deleteBook);
exports.default = router;
