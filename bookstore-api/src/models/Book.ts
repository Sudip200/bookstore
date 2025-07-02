// {
// ■ "id": "auto-generated UUID",
// ■ "title": "String",
// ■ "author": "String",
// ■ "genre": "String",
// ■ "publishedYear": Number,
// ■ "userId": "ID of user who added the book"
// ■ }

class Book {
  private id:string;
  public title:string;
  public author:string;
  public genre:string;
  public publishedYear:number;
  private userId:string;

  constructor(title:string,author:string,genre:string,publishedYear:number,userId:string){
    this.id = '23';
    this.author = author;
    this.title = title;
    this.genre = genre;
    this.publishedYear = publishedYear;
    this.userId = userId;
  }
  
  save():void{
    
  }
  static getAllBooks():Book[]{
    return []
  }
  static findById(bookId:String):Book{
    return {};
  }
  static deleteById(bookId:String):void{
    
  }
  static update(bookId:String,details:{}):void{

  }

}