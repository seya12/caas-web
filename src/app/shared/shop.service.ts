import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom, Observable, of, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { Cart } from "../models/cart";
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

  public getCart(): Observable<Cart> {
    const cartId = localStorage.getItem("cartId");
    console.log(cartId);
    if (!cartId) {
      const observable = this.createCart().pipe(
        tap((cart) => {
          localStorage.setItem("cartId", JSON.stringify(cart.id));
          console.log(`created cart:${cart.id} `);
        })
      );
      // observable.subscribe((cart) => {});

      return observable;
    }

    return this.httpClient.get<Cart>(
      `${environment.server}/shops/1/carts/${cartId}`
    );
  }

  public createCart(): Observable<Cart> {
    return this.httpClient.post<Cart>(
      `${environment.server}/shops/1/carts`,
      null
    );
  }
}
