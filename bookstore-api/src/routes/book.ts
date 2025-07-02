import {Router } from "express";
import AuthMiddleware from "../middlewares/auth";
import BooksController from "../controllers/book";

let router = Router();

router.get('/books',[AuthMiddleware.authenticate],BooksController.getAllBooks);
router.get('/books/:id',[AuthMiddleware.authenticate],BooksController.getBookById);
router.post('/books',[AuthMiddleware.authenticate],BooksController.postBook);
router.put('/books/:id',[AuthMiddleware.authenticate],BooksController.updateBook)
router.delete('/books/:id',[AuthMiddleware.authenticate],BooksController.deleteBook)

export default router;
