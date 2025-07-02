
import UuidSingeltonService from "../services/UuidService";
import { readData, writeData } from "../utils/data";
import path from 'path';
const pathDir = path.join(__dirname,'..','data/books.json')
console.log(pathDir)
const uuidService = new UuidSingeltonService();
const uuidInstance = uuidService.getInstance();
class Book {
  public id: string;
  public title: string;
  public author: string;
  public genre: string;
  public publishedYear: number;
  public userId: string;

  constructor(title: string, author: string, genre: string, publishedYear: number, userId: string) {
    this.id = uuidInstance.generateId();
    this.author = author;
    this.title = title;
    this.genre = genre;
    this.publishedYear = publishedYear;
    this.userId = userId;
  }
  async save(): Promise<void> {
    const books = await Book.getAllBooks();
    await writeData<Book>(pathDir, [...books, this]);
  }
  static async getAllBooks(userId?: string): Promise<Book[]> {
    const books = await readData<Book>(pathDir);
    if (userId) {
      return books.filter((book) => book.userId === userId);
    }
    return books;
  }
  static async findById(bookId: string, userId?: string): Promise<Book | undefined> {
    const books = await readData<Book>(pathDir);
    return books.find((book) => book.id === bookId && (!userId || book.userId === userId));
  }
  static async deleteById(bookId: string): Promise<void> {
    let books = await readData<Book>(pathDir);
    await writeData(pathDir, books.filter((book) => book.id != bookId));
  }
  static async updateById(bookId: string, payload: Partial<Book>): Promise<void> {
    const books = await readData<Book>(pathDir);
    const updatedBooks = books.map((book) => {
      if (book.id === bookId) {
        Object.assign(book, payload);
      }
      return book;
    });
    await writeData<Book>(pathDir, updatedBooks);
  }
}
export default Book