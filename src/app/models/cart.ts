import { CartProduct } from "./cartProduct";

export class Cart {
  constructor(
    public id: number = 0,
    public cartDiscount: number = 0,
    public products: CartProduct[] = []
  ) {}
}
