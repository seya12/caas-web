export class CartProduct {
  constructor(
    public productId: number = 0,
    public name: string = "",
    public description: string = "",
    public price: number = 0,
    public quantity: number = 0,
    public discount: number = 0
  ) {}
}
