import Book from "../models/Book";
import { Request, Response } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    userId?: string;
  }
}

class BooksController {
  static async getAllBooks(req: Request, res: Response) {
    try {
      const userId = req.userId;
      if (!userId) {
         res.status(401).json({ status: 'error', message: 'Unauthorized' });
         return
      }
      const books = await Book.getAllBooks(userId);
      res.status(200).json({
        status: 'success',
        message: 'Books retrieved successfully',
        data: books
      });
    } catch (err: any) {
      res.status(500).json({ status: 'error', message: 'Error retrieving books' });
    }
  }

  static async getBookById(req: Request, res: Response) {
    try {
      const userId = req.userId;
      const { id } = req.params;
      if (!userId) {
        res.status(401).json({ status: 'error', message: 'Unauthorized' });
         return
      }
      const book = await Book.findById(id);
      console.log(id)
      if (!book || book.userId !== userId) {
         res.status(404).json({ status: 'error', message: 'Book not found' });
         return
      }
      res.status(200).json({
        status: 'success',
        message: 'Book retrieved successfully',
        data: book
      });
    } catch (err: any) {
      res.status(500).json({ status: 'error', message: 'Error retrieving book' });
    }
  }

  static async postBook(req: Request, res: Response) {
    try {
      const userId = req.userId;
      const { title, author, genre, publishedYear } = req.body;

      if (!userId || !title || !author || !genre || !publishedYear) {
        res.status(400).json({ status: 'error', message: 'All fields are required' });
        return 
      }

      const book = new Book(title, author, genre, publishedYear, userId);
      await book.save();

      res.status(201).json({
        status: 'success',
        message: 'Book created successfully',
        data: book
      });
    } catch (error: any) {
      res.status(500).json({ status: 'error', message: 'Error creating book' });
    }
  }

  static async updateBook(req: Request, res: Response) {
    try {
      const userId = req.userId;
      const { id } = req.params;
      const { title, author, genre, publishedYear } = req.body;

      if (!userId) {
        res.status(401).json({ status: 'error', message: 'Unauthorized' });
         return
      }

      const book = await Book.findById(id);
      if (!book || book.userId !== userId) {
        res.status(403).json({ status: 'error', message: 'Unauthorized to update this book' });
         return
      }

      await Book.updateById(id, { title, author, genre, publishedYear });

      res.status(200).json({
        status: 'success',
        message: 'Book updated successfully'
      });
    } catch (error: any) {
      res.status(500).json({ status: 'error', message: 'Error updating book' });
    }
  }

  static async deleteBook(req: Request, res: Response) {
    try {
      const userId = req.userId;
      const { id } = req.params;

      if (!userId) {
         res.status(401).json({ status: 'error', message: 'Unauthorized' });
         return
      }

      const book = await Book.findById(id);
      if (!book || book.userId !== userId) {
         res.status(403).json({ status: 'error', message: 'Unauthorized to delete this book' });
         return
      }

      await Book.deleteById(id);

      res.status(200).json({
        status: 'success',
        message: 'Book deleted successfully'
      });
    } catch (err: any) {
      res.status(500).json({ status: 'error', message: 'Error deleting book' });
    }
  }
}

export default BooksController;
