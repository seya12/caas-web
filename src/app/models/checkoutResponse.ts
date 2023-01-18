export class CheckoutResponse {
  constructor(
    public isSuccess: boolean = false,
    public orderId: number = 0,
    public errorMessage: string = ""
  ) {}
}
