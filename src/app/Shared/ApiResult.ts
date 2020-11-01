import { Books } from './book';


export class ApiResult {
  kind: String;
  totalItems: Number;
  items: Array<Books>;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
