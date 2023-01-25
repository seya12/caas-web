import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, concatMap, Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { Cart } from "../models/cart";
import { CheckoutResponse } from "../models/checkoutResponse";
import { Coupon } from "../models/coupon";
import { Payment } from "../models/payment";
import { Product } from "../models/product";
import { User } from "../models/user";
@Injectable({
  providedIn: "root",
})
export class ShopService {
  serverURL = `${environment.server}${environment.shop}`;

  constructor(private httpClient: HttpClient) {}

  public getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.serverURL}/products`);
  }

  public getProduct(productId: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.serverURL}/products/${productId}`);
  }

  public searchForProduct(search: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.serverURL}/products`, {
      params: { search },
    });
  }

  public getCartIdFromLocalStorage(): string | null {
    return localStorage.getItem("cartId");
  }

  public getCart(): Observable<Cart> {
    const cartId = this.getCartIdFromLocalStorage();
    if (!cartId) {
      return this.createCart();
    }

    return this.httpClient
      .get<Cart>(`${this.serverURL}/carts/${cartId}`)
      .pipe(catchError(() => this.createCart()));
  }

  public createCart(): Observable<Cart> {
    return this.httpClient.post<Cart>(`${this.serverURL}/carts`, null).pipe(
      tap((cart) => {
        localStorage.setItem("cartId", JSON.stringify(cart.id));
      })
    );
  }

  public addToCart(productId: number, quantity: number): Observable<Cart> {
    return this.getCart().pipe(
      concatMap((cart) =>
        this.httpClient.post<Cart>(`${this.serverURL}/carts/${cart.id}/products`, {
          productId,
          quantity,
        })
      )
    );
  }

  public updateCart(cartId: number, productId: number, quantity: number): Observable<Cart> {
    return this.httpClient
      .put(`${this.serverURL}/carts/${cartId}/products/${productId}`, { quantity })
      .pipe(concatMap(() => this.getCart()));
  }

  public deleteProductFromCart(cartId: number, productId: number): Observable<Cart> {
    return this.httpClient
      .delete(`${this.serverURL}/carts/${cartId}/products/${productId}`)
      .pipe(concatMap(() => this.getCart()));
  }

  public getUser(id: number) {
    return this.httpClient.get<User>(`${this.serverURL}/users/${id}`);
  }

  public searchForUser(email: string) {
    return this.httpClient.get<User>(`${this.serverURL}/users?email=${email}`);
  }

  public setUserForCart(cartId: number, userId: number): Observable<unknown> {
    return this.httpClient.put(`${this.serverURL}/carts/${cartId}`, {
      userId,
    });
  }

  public createUser(cartId: number, user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.serverURL}/users`, {
      ...user,
      cartId: cartId,
    });
  }

  public getPayment(userId: number): Observable<Payment> {
    return this.httpClient.get<Payment>(`${this.serverURL}/users/${userId}/payments`);
  }
  public addPayment(userId: number, payment: Payment): Observable<Payment> {
    return this.httpClient.post<Payment>(`${this.serverURL}/users/${userId}/payments`, payment);
  }

  public updatePayment(userId: number, payment: Payment): Observable<Payment> {
    return this.httpClient
      .put(`${this.serverURL}/users/${userId}/payments/${payment.id}`, payment)
      .pipe(concatMap(() => this.getPayment(userId)));
  }

  public redeemCoupon(cartId: number, code: string): Observable<Coupon> {
    return this.httpClient.post<Coupon>(`${this.serverURL}/coupons/redeem`, {
      cartId,
      code,
    });
  }

  public deleteCoupon(cartId: number, code: string): Observable<unknown> {
    return this.httpClient.delete(`${this.serverURL}/coupons`, {
      body: { cartId, code },
    });
  }

  public makeOrder(cartId: number): Observable<CheckoutResponse> {
    return this.httpClient
      .post<CheckoutResponse>(`${this.serverURL}/carts/${cartId}/order`, {})
      .pipe(tap(() => localStorage.removeItem("cartId")));
  }
}
