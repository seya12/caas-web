import { Component, OnInit } from "@angular/core";
import { MatSelectChange } from "@angular/material/select";
import { Cart } from "src/app/models/cart";
import { ShopService } from "src/app/shared/shop.service";

//TODO: Generalize quantity logic
@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  cart: Cart = new Cart();
  quantityOptions: number[];
  quantity = 0;
  count = 0;
  sum = 0;

  constructor(private shopService: ShopService) {
    this.quantityOptions = [...Array(10).keys()].map((i) => i + 1);
  }

  ngOnInit(): void {
    this.shopService.getCart().subscribe((cart) => {
      this.cart = cart;
      console.log(cart);
    });
  }

  updateQuantity(productId?: number): void {
    console.log(this.cart);
    console.log(`update: ${this.quantity} + ${productId}`);
    this.shopService
      .updateCart(this.cart.id as number, productId as number, this.quantity)
      .subscribe((cart) => (this.cart = cart));
  }

  deleteProduct(productId?: number): void {
    console.log(`delete: ${this.quantity} + ${productId}`);
    this.shopService
      .deleteProductFromCart(this.cart.id as number, productId as number)
      .subscribe((cart) => (this.cart = cart));
  }

  update(event: MatSelectChange, productId?: number): void {
    this.shopService
      .updateCart(this.cart.id as number, productId as number, event.value)
      .subscribe((cart) => (this.cart = cart));
  }
}
