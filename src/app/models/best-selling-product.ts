export class BestSellingProduct {
  constructor(
    public productId: number = 0,
    public productName: string = "",
    public productDescription: string = "",
    public downloadLink: string = "",
    public productPrice: number = 0,
    public productActive: boolean = true,
    public numberOfSales: number = 0
  ) {}
}
