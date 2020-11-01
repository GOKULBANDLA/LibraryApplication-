import { ImageLinks } from '../books/attributes/imageLinks';

export class Cart {
  id: number;
  title: String;
  authors: Array<String>;
  categories: Array<String>;
  isbn: string;
  userId: number;
  username: string;
  fromDate: Date;
  toDate: Date;
  bookid: number;
  imageLinks: ImageLinks;
  renewCode: string;
  requestedDate: Date;
}
