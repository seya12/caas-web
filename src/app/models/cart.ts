import { Product } from "./product";

export class Cart {
  constructor(
    public id?: string,
    public cartDiscount?: number,
    public products?: Product[]
  ) {}
}
