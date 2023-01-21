import { Product } from "src/app/models/product";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Shop } from "../models/admin/shop";
import { BestSellingProduct } from "../models/best-selling-product";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  headers = {
    headers: {
      AppKey: environment.AppKey,
    },
  };
  serverURL = `${environment.server}${environment.shop}`;
  constructor(private httpClient: HttpClient) {}

  getShop(): Observable<Shop> {
    return this.httpClient.get<Shop>(this.serverURL, this.headers);
  }
  updateShop(shop: Shop): Observable<unknown> {
    return this.httpClient.put(this.serverURL, shop, this.headers);
  }
  addShop(name: string): Observable<Shop> {
    return this.httpClient.post<Shop>(`${environment.server}/shops`, name);
  }
  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.serverURL}/products`, this.headers);
  }
  addProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(`${this.serverURL}/products`, product, this.headers);
  }
  updateProduct(product: Product): Observable<unknown> {
    return this.httpClient.put(`${this.serverURL}/products/${product.id}`, product, this.headers);
  }
  deleteProduct(productId: number): Observable<unknown> {
    return this.httpClient.delete(`${this.serverURL}/products/${productId}`, this.headers);
  }
  getRevenue(year: number, month: number): Observable<number> {
    return this.httpClient
      .get<any>(`${this.serverURL}/statistics/revenue`, {
        ...this.headers,
        params: {
          year,
          month,
        },
      })
      .pipe(map((res) => res.revenue));
  }
  getBestSellingProducts(
    limit: number,
    year: number,
    month: number
  ): Observable<BestSellingProduct[]> {
    return this.httpClient.get<BestSellingProduct[]>(
      `${this.serverURL}/statistics/best-selling-products`,
      {
        ...this.headers,
        params: {
          limit,
          year,
          month,
        },
      }
    );
  }

  getRedeemedCoupons(year: number, month: number): Observable<number> {
    return this.httpClient
      .get<any>(`${this.serverURL}/statistics/redeemed-coupons`, {
        ...this.headers,
        params: {
          year,
          month,
        },
      })
      .pipe(map((res) => res.numberOfRedeemedCoupons));
  }
}
