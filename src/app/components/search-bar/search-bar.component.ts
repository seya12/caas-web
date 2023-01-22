import { ShopService } from "./../../shared/shop.service";
import { ElementRef, EventEmitter, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { Component } from "@angular/core";
import { Product } from "src/app/models/product";
import { debounceTime, switchMap, distinctUntilChanged, filter } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class SearchBarComponent implements OnInit {
  foundProducts: Product[] = [];
  myKeyup = new EventEmitter<string>();
  @ViewChild("searchTerm") searchTerm!: ElementRef<HTMLInputElement>;
  lastSearch = "";

  constructor(private shopService: ShopService, private router: Router) {}

  ngOnInit(): void {
    this.myKeyup
      .pipe(
        filter((text) => text !== ""),
        debounceTime(500),
        distinctUntilChanged((previous, current) => {
          return previous === current && this.lastSearch != current;
        }),
        switchMap((searchTerm) => this.shopService.searchForProduct(searchTerm))
      )
      .subscribe((products) => {
        this.foundProducts = products;
        this.lastSearch = "";
      });
  }

  openProduct(productId: number) {
    this.router.navigate(["/home/products/", productId]);
    this.foundProducts = [];
    this.lastSearch = this.searchTerm.nativeElement.value;
    this.searchTerm.nativeElement.value = "";
    this.myKeyup.next("");
  }
}
