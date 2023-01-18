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
  sum = "0";
  //TODO: visualize currencies better

  constructor(private shopService: ShopService) {
    this.quantityOptions = [...Array(10).keys()].map((i) => i + 1);
  }

  ngOnInit(): void {
    this.shopService.getCart().subscribe((cart) => this.assignMembers(cart));
  }

  assignMembers(cart: Cart): void {
    let sum = 0;
    this.count = 0;
    this.cart = cart;

    cart.products?.forEach((p) => {
      sum += (p.price - p.discount) * p.quantity;
      this.count += p.quantity;
    });

    this.sum = new Intl.NumberFormat("de-DE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(sum);
  }

  deleteProduct(productId: number): void {
    this.shopService
      .deleteProductFromCart(this.cart.id, productId)
      .subscribe((cart) => this.assignMembers(cart));
  }

  update(event: MatSelectChange, productId: number): void {
    this.shopService
      .updateCart(this.cart.id, productId, event.value)
      .subscribe((cart) => this.assignMembers(cart));
  }
}
