import { CartProduct } from "./cartProduct";

export class Cart {
  constructor(
    public id?: number,
    public cartDiscount?: number,
    public products?: CartProduct[]
  ) {}
}
