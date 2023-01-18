export class User {
  constructor(
    public id: number = 0,
    public cartId: number = 0,
    public firstName: string = "",
    public lastName: string = "",
    public email: string = ""
  ) {}
}
