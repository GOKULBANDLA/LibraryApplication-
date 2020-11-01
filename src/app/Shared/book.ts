import { VolumeInfo } from '../books/attributes/volumeInfo';
import { SaleInfo } from '../books/attributes/saleInfo';


export class Books {
  volumeInfo: VolumeInfo;
  saleInfo: SaleInfo;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
