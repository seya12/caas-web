import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { Product } from "../models/product";
@Injectable({
  providedIn: "root",
})
export class ShopService {
  productItems: Product[] = [];

  constructor(private httpClient: HttpClient) {}

  private errorHandler(error: Error | any): Observable<any> {
    console.log(error);
    return of(error);
  }

  public getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      `${environment.server}/shops/1/products`
    );
  }

  public getProduct(productId: number): Observable<Product> {
    return this.httpClient.get<Product>(
      `${environment.server}/shops/1/products/${productId}`
    );
  }
}
