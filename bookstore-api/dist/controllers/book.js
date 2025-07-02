"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Book_1 = __importDefault(require("../models/Book"));
class BooksController {
    static async getAllBooks(req, res) {
        try {
            const userId = req.userId;
            if (!userId) {
                res.status(401).json({ status: 'error', message: 'Unauthorized' });
                return;
            }
            const books = await Book_1.default.getAllBooks(userId);
            res.status(200).json({
                status: 'success',
                message: 'Books retrieved successfully',
                data: books
            });
        }
        catch (err) {
            res.status(500).json({ status: 'error', message: 'Error retrieving books' });
        }
    }
    static async getBookById(req, res) {
        try {
            const userId = req.userId;
            const { id } = req.params;
            if (!userId) {
                res.status(401).json({ status: 'error', message: 'Unauthorized' });
                return;
            }
            const book = await Book_1.default.findById(id);
            console.log(id);
            if (!book || book.userId !== userId) {
                res.status(404).json({ status: 'error', message: 'Book not found' });
                return;
            }
            res.status(200).json({
                status: 'success',
                message: 'Book retrieved successfully',
                data: book
            });
        }
        catch (err) {
            res.status(500).json({ status: 'error', message: 'Error retrieving book' });
        }
    }
    static async postBook(req, res) {
        try {
            const userId = req.userId;
            const { title, author, genre, publishedYear } = req.body;
            if (!userId || !title || !author || !genre || !publishedYear) {
                res.status(400).json({ status: 'error', message: 'All fields are required' });
                return;
            }
            const book = new Book_1.default(title, author, genre, publishedYear, userId);
            await book.save();
            res.status(201).json({
                status: 'success',
                message: 'Book created successfully',
                data: book
            });
        }
        catch (error) {
            res.status(500).json({ status: 'error', message: 'Error creating book' });
        }
    }
    static async updateBook(req, res) {
        try {
            const userId = req.userId;
            const { id } = req.params;
            const { title, author, genre, publishedYear } = req.body;
            if (!userId) {
                res.status(401).json({ status: 'error', message: 'Unauthorized' });
                return;
            }
            const book = await Book_1.default.findById(id);
            if (!book || book.userId !== userId) {
                res.status(403).json({ status: 'error', message: 'Unauthorized to update this book' });
                return;
            }
            await Book_1.default.updateById(id, { title, author, genre, publishedYear });
            res.status(200).json({
                status: 'success',
                message: 'Book updated successfully'
            });
        }
        catch (error) {
            res.status(500).json({ status: 'error', message: 'Error updating book' });
        }
    }
    static async deleteBook(req, res) {
        try {
            const userId = req.userId;
            const { id } = req.params;
            if (!userId) {
                res.status(401).json({ status: 'error', message: 'Unauthorized' });
                return;
            }
            const book = await Book_1.default.findById(id);
            if (!book || book.userId !== userId) {
                res.status(403).json({ status: 'error', message: 'Unauthorized to delete this book' });
                return;
            }
            await Book_1.default.deleteById(id);
            res.status(200).json({
                status: 'success',
                message: 'Book deleted successfully'
            });
        }
        catch (err) {
            res.status(500).json({ status: 'error', message: 'Error deleting book' });
        }
    }
}
exports.default = BooksController;
