import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from "src/app/models/product";
import { ShopService } from "src/app/shared/shop.service";

@Component({
  selector: "app-product-list-item",
  templateUrl: "./product-list-item.component.html",
  styleUrls: ["./product-list-item.component.css"],
})
export class ProductListItemComponent implements OnInit {
  product: Product = new Product();
  amountOptions: number[];
  amount = 0;
  constructor(
    private shopService: ShopService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.amountOptions = [...Array(10).keys()].map((i) => i + 1);
  }

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    this.shopService
      .getProduct(params["id"])
      .subscribe((res) => (this.product = res));
  }

  addToCart() {
    console.log(this.amount);
  }
}
