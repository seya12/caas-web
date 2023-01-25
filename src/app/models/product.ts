export class Product {
  constructor(
    public id: number = 0,
    public name: string = "",
    public description: string = "",
    public downloadLink: string = "",
    public price: number = 0,
    public active: boolean = false
  ) {}
}
