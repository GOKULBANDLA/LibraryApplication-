export class Price {
  amount: Number;
  currencyCode: String;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
