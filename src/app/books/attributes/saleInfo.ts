import {Price} from './price';
import {Saleability} from './saleability';

export class SaleInfo {
  country: String;
  saleability: Saleability;
  isEbook: Boolean;
  listPrice: Price;
  retailPrice: Price;
  buyLink: String;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
