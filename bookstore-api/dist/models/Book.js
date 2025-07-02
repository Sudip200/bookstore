"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UuidService_1 = __importDefault(require("../services/UuidService"));
const data_1 = require("../utils/data");
const path_1 = __importDefault(require("path"));
const pathDir = path_1.default.join(__dirname, '..', 'data/books.json');
console.log(pathDir);
const uuidService = new UuidService_1.default();
const uuidInstance = uuidService.getInstance();
class Book {
    constructor(title, author, genre, publishedYear, userId) {
        this.id = uuidInstance.generateId();
        this.author = author;
        this.title = title;
        this.genre = genre;
        this.publishedYear = publishedYear;
        this.userId = userId;
    }
    async save() {
        const books = await Book.getAllBooks();
        await (0, data_1.writeData)(pathDir, [...books, this]);
    }
    static async getAllBooks(userId) {
        const books = await (0, data_1.readData)(pathDir);
        if (userId) {
            return books.filter((book) => book.userId === userId);
        }
        return books;
    }
    static async findById(bookId, userId) {
        const books = await (0, data_1.readData)(pathDir);
        return books.find((book) => book.id === bookId && (!userId || book.userId === userId));
    }
    static async deleteById(bookId) {
        let books = await (0, data_1.readData)(pathDir);
        await (0, data_1.writeData)(pathDir, books.filter((book) => book.id != bookId));
    }
    static async updateById(bookId, payload) {
        const books = await (0, data_1.readData)(pathDir);
        const updatedBooks = books.map((book) => {
            if (book.id === bookId) {
                Object.assign(book, payload);
            }
            return book;
        });
        await (0, data_1.writeData)(pathDir, updatedBooks);
    }
}
exports.default = Book;
