import {IndustryIdentifier} from './industryIdentifier';
import {ImageLinks} from './imageLinks';

export class VolumeInfo {
  title: String;
  authors: Array<String>;
  publisher: String;
  publishedDate: Date;
  description: String;
  industryIdentifiers: Array<IndustryIdentifier>;
  pageCount: Number;
  categories: Array<String>;
  maturityRating: String;
  imageLinks: ImageLinks;
  language: String;
  previewLink: String;
  infoLink: String;
  canonicalVolumeLink: String;
  ratingsCount: Number;
  averageRating: Number;
  subtitle: String;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
