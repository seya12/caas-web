import { Component, OnInit } from "@angular/core";
import { MatSelectChange } from "@angular/material/select";
import { MatSnackBar } from "@angular/material/snack-bar";
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

  constructor(private shopService: ShopService, private snackBar: MatSnackBar) {
    this.quantityOptions = [...Array(10).keys()].map((i) => i + 1);
  }

  ngOnInit(): void {
    this.shopService.getCart().subscribe((cart) => this.assignMembers(cart));
  }

  assignMembers(cart: Cart): void {
    this.sum = 0;
    this.count = 0;
    this.cart = cart;

    cart.products?.forEach((p) => {
      this.sum += (p.price - p.discount) * p.quantity;
      this.count += p.quantity;
    });
  }

  deleteProduct(productId: number): void {
    this.shopService.deleteProductFromCart(this.cart.id, productId).subscribe((cart) => {
      this.assignMembers(cart);
      this.snackBar.open("Produkt erfolgreich gelöscht!", "Schließen", { duration: 5000 });
    });
  }

  update(event: MatSelectChange, productId: number): void {
    this.shopService.updateCart(this.cart.id, productId, event.value).subscribe((cart) => {
      this.assignMembers(cart);
      this.snackBar.open("Menge erfolgreich angepasst!", "Schließen", { duration: 5000 });
    });
  }
}
