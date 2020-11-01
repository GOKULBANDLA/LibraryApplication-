import { ImageLinks } from '../books/attributes/imageLinks';

export class AdminBooks{
  id:number;
  title: String;
  authors: Array<String>;
  categories: Array<String>;
  language: String;
  isbn:string;
  imageLinks: ImageLinks;
  ratingsCount: Number;
  averageRating: Number;
  description: String;
  count:number;
}