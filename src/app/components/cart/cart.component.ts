import { Component, OnInit } from "@angular/core";
import { Cart } from "src/app/models/cart";
import { ShopService } from "src/app/shared/shop.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  cart: Cart = new Cart();
  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.shopService.getCart().subscribe((cart) => {
      this.cart = cart;
      console.log(cart);
    });
  }
}
