import { Component, OnInit, OnDestroy } from "@angular/core";
import { Product } from "src/app/models/product";
import { ShopService } from "src/app/shared/shop.service";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  destroyed = new Subject<void>();
  columns = 1;

  // Create a map to display breakpoint names for demonstration purposes.
  displayNameMap = new Map([
    [Breakpoints.XSmall, 1],
    [Breakpoints.Small, 1],
    [Breakpoints.Medium, 2],
    [Breakpoints.Large, 3],
    [Breakpoints.XLarge, 4],
  ]);

  constructor(
    private shopService: ShopService,
    breakpointObserver: BreakpointObserver
  ) {
    breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe((result) => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.columns = this.displayNameMap.get(query) ?? 1;
          }
        }
      });
  }

  ngOnInit(): void {
    this.shopService.getProducts().subscribe((res) => (this.products = res));
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
