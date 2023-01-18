export class Payment {
  constructor(
    public id: number = 0,
    public cardNumber: string = "",
    public verificationCode: string = "",
    public expiryDate: string = ""
  ) {}
}
