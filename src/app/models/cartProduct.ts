export class CartProduct {
  constructor(
    public productId?: number,
    public name?: string,
    public description?: string,
    public price?: number,
    public quantity?: number,
    public discount?: number
  ) {}
}
