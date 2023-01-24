import { MatSnackBar } from "@angular/material/snack-bar";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Product } from "src/app/models/product";
import { ShopService } from "src/app/shared/shop.service";

@Component({
  selector: "app-product-list-item",
  templateUrl: "./product-list-item.component.html",
  styleUrls: ["./product-list-item.component.css"],
})
export class ProductListItemComponent implements OnInit {
  product: Product = new Product();
  quantityOptions: number[];
  quantity = 0;
  constructor(
    private shopService: ShopService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.quantityOptions = [...Array(10).keys()].map((i) => i + 1);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.shopService
        .getProduct(Number(params.get("id")))
        .subscribe((res) => (this.product = res));
    });
  }

  addToCart() {
    this.shopService.addToCart(this.product.id as number, this.quantity).subscribe({
      next: () => {
        this.snackBar.open("Produkt erfolgreich hinzugefügt!", "Schließen", { duration: 5000 });
        this.quantity = 0;
      },
      error: () => {
        this.snackBar.open("Fehler beim Hinzufügen!", "Schließen", { duration: 5000 });
      },
    });
  }
}
