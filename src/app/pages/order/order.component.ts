import { MatSnackBar } from "@angular/material/snack-bar";
import { OrderDialogSuccessComponent } from "../../components/order-dialog-success/order-dialog-success.component";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Cart } from "src/app/models/cart";
import { CheckoutResponse } from "src/app/models/checkoutResponse";
import { Coupon } from "src/app/models/coupon";
import { Payment } from "src/app/models/payment";
import { User } from "src/app/models/user";
import { ShopService } from "src/app/shared/shop.service";
import { OrderDialogFailedComponent } from "../../components/order-dialog-failed/order-dialog-failed.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.css"],
})
export class OrderComponent implements OnInit {
  cart = new Cart();
  payment = new Payment();
  user = new User();
  searchUser = new User();
  coupon = new Coupon();
  sum = 0;
  found = false;
  newUser = false;
  changeUser = false;
  showPayment = false;
  showProgressbar = false;
  newUserForm!: FormGroup;
  paymentForm!: FormGroup;

  constructor(
    private shopService: ShopService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.assignCart();
    this.initUserForm();
    this.initPaymentForm();
  }

  onChangePayment(): void {
    this.showPayment = !this.showPayment;
  }

  initUserForm(): void {
    this.newUserForm = this.formBuilder.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }

  initPaymentForm(): void {
    this.paymentForm = this.formBuilder.group({
      cardNumber: [this.payment.cardNumber, Validators.required],
      verificationCode: [this.payment.verificationCode, Validators.required],
      expiryDate: [new Date(this.payment.expiryDate), [Validators.required]],
    });
  }

  assignCart(): void {
    this.shopService.getCart().subscribe((cart) => this.assignMembers(cart));
  }

  assignMembers(cart: Cart): void {
    this.cart = cart;
    this.sum = 0;
    cart.products?.forEach((p) => (this.sum += (p.price - p.discount) * p.quantity));

    if (cart.userId !== 0) {
      this.assignUser(cart.userId);
    }
  }

  assignUser(userId: number) {
    this.changeUser = false;
    this.shopService.getUser(userId).subscribe((user) => {
      this.user = user;
      this.assignPayment(user.id);
    });
  }

  assignPayment(userId: number): void {
    this.shopService.getPayment(userId).subscribe({
      next: (payment) => {
        this.payment = payment;
        this.paymentForm.setValue({
          cardNumber: this.payment.cardNumber,
          verificationCode: this.payment.verificationCode,
          expiryDate: new Date(this.payment.expiryDate),
        });
      },
    });
  }

  searchForUser(email: string): void {
    this.shopService.searchForUser(email).subscribe({
      next: (user) => this.assignSearchUser(user),
      error: () =>
        this.snackBar.open("Kein Benutzer wurde gefunden!", "Schließen", { duration: 5000 }),
    });
  }

  assignSearchUser(user: User): void {
    this.found = true;
    this.searchUser = user;
    this.searchUser.cartId = 0;
  }

  setUser() {
    this.shopService
      .setUserForCart(this.cart.id, this.searchUser.id)
      .subscribe(() => this.assignCart());
  }
  createUser(event: SubmitEvent) {
    event.preventDefault();
    this.shopService
      .createUser(this.cart.id, this.newUserForm.value)
      .subscribe(() => this.assignCart());
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
    this.showPayment = false;
  }

  redeemCoupon(input: string): void {
    this.shopService.redeemCoupon(this.cart.id, input).subscribe({
      next: (coupon) => (this.coupon = coupon),
      error: () =>
        this.snackBar.open("Coupon konnte nicht hinzugefügt werden!", "Schließen", {
          duration: 5000,
        }),
    });
  }

  deleteCoupon(): void {
    this.shopService
      .deleteCoupon(this.cart.id, this.coupon.code)
      .subscribe(() => (this.coupon = new Coupon()));
  }

  makeOrder(): void {
    this.showProgressbar = true;
    this.shopService.makeOrder(this.cart.id).subscribe({
      next: (resp) => this.openOrder(resp),
      error: (resp) => this.showError(resp.error),
      complete: () => (this.showProgressbar = false),
    });
  }

  openOrder(response: CheckoutResponse) {
    const dialogRef = this.dialog.open(OrderDialogSuccessComponent, {
      data: response,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.shopService.createCart().subscribe();
      this.router.navigate([""]);
    });
  }
  showError(response: CheckoutResponse) {
    this.showProgressbar = false;
    this.dialog.open(OrderDialogFailedComponent, {
      data: response,
    });
  }
}
