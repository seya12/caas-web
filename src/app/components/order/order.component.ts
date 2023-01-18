import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Cart } from "src/app/models/cart";
import { CheckoutResponse } from "src/app/models/checkoutResponse";
import { Coupon } from "src/app/models/coupon";
import { Payment } from "src/app/models/payment";
import { User } from "src/app/models/user";
import { ShopService } from "src/app/shared/shop.service";
import { OrderDialogComponent } from "../order-dialog/order-dialog.component";

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.css"],
})
export class OrderComponent implements OnInit {
  cart = new Cart();
  payment = new Payment();
  user = new User();
  coupon = new Coupon();
  sum = 0;
  found = false;
  newUser = false;
  changeUser = false;
  showPayment = false;
  newUserForm!: FormGroup;
  paymentForm!: FormGroup;

  constructor(
    private shopService: ShopService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.shopService.getCart().subscribe((cart) => this.assignMembers(cart));

    this.newUserForm = this.formBuilder.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
    this.initPaymentForm();
  }

  onChangePayment(): void {
    this.showPayment = !this.showPayment;
  }

  initPaymentForm() {
    this.paymentForm = this.formBuilder.group({
      cardNumber: [this.payment.cardNumber, Validators.required],
      verificationCode: [this.payment.verificationCode, Validators.required],
      expiryDate: [new Date(this.payment.expiryDate), [Validators.required]],
    });
  }

  assignMembers(cart: Cart): void {
    this.cart = cart;

    cart.products?.forEach(
      (p) => (this.sum += (p.price - p.discount) * p.quantity)
    );

    if (cart.id !== 0) {
      this.shopService.getUser(cart.userId).subscribe((user) => {
        this.user = user;
        this.assignPayment(user.id);
      });
    }
  }

  assignPayment(userId: number): void {
    this.shopService.getPayment(userId).subscribe({
      next: (payment) => {
        this.payment = payment;
        console.log(payment);
        this.paymentForm.setValue({
          cardNumber: this.payment.cardNumber,
          verificationCode: this.payment.verificationCode,
          expiryDate: new Date(this.payment.expiryDate),
        });
      },
      error: () => console.log("no payment exists"),
    });
  }

  searchForUser(email: string): void {
    this.shopService
      .searchForUser(email)
      .subscribe((user) => this.assignUser(user));
  }

  assignUser(user: User): void {
    this.found = true;
    this.user = user;
    this.user.cartId = 0;
    console.log(this.user);
  }

  setUser() {
    this.shopService.setUserForCart(this.user.id);
    this.user.cartId = this.cart.id;
  }
  createUser(event: SubmitEvent) {
    event.preventDefault();
    this.shopService.createUser(this.newUserForm.value);
    this.shopService.getCart().subscribe((cart) => this.assignMembers(cart));
  }

  paymentAction(event: SubmitEvent) {
    event.preventDefault();
    const date = this.paymentForm.controls["expiryDate"].value.toISOString();
    const paymentDto = {
      ...this.paymentForm.value,
      id: this.payment.id,
      expiryDate: date,
    };
    if (this.payment.id === 0) {
      this.shopService
        .addPayment(this.user.id, paymentDto)
        .subscribe((payment) => (this.payment = payment));
    } else {
      this.shopService
        .updatePayment(this.user.id, paymentDto)
        .subscribe((payment) => (this.payment = payment));
    }
    console.log(new Date().toISOString());
    console.log(new Date(this.payment.expiryDate));
  }

  redeemCoupon(input: string): void {
    this.shopService.redeemCoupon(this.cart.id, input).subscribe((coupon) => {
      console.log(coupon);
      this.coupon = coupon;
    });
  }

  deleteCoupon(): void {
    this.shopService
      .deleteCoupon(this.cart.id, this.coupon.code)
      .subscribe(() => (this.coupon = new Coupon()));
  }

  makeOrder(): void {
    this.shopService.makeOrder(this.cart.id).subscribe({
      next: (resp) => this.openOrder(resp),
      error: (resp) => this.showError(resp),
    });
  }

  openOrder(response: CheckoutResponse) {
    const dialogRef = this.dialog.open(OrderDialogComponent, {
      data: { response },
    });
  }
  showError(response: CheckoutResponse) {
    const dialogRef = this.dialog.open(OrderDialogComponent, {
      data: { response },
    });
  }
}
