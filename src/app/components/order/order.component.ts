import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Cart } from "src/app/models/cart";
import { Payment } from "src/app/models/payment";
import { User } from "src/app/models/user";
import { ShopService } from "src/app/shared/shop.service";

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.css"],
})
export class OrderComponent implements OnInit {
  cart = new Cart();
  payment = new Payment();
  user = new User();
  sum = "0";
  found = false;
  newUser = false;
  changeUser = false;
  showPayment = false;
  newUserForm!: FormGroup;
  paymentForm!: FormGroup;

  constructor(
    private shopService: ShopService,
    private formBuilder: FormBuilder
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
    let sum = 0;
    this.cart = cart;

    cart.products?.forEach((p) => (sum += (p.price - p.discount) * p.quantity));

    this.sum = new Intl.NumberFormat("de-DE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(sum);

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
}
