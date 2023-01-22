import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, concatMap, Observable, of, tap } from "rxjs";
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
  constructor(private httpClient: HttpClient) {}

  private errorHandler(error: Error | any): Observable<any> {
    console.log(error);
    return of(error);
  }

  public getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${environment.server}/shops/1/products`);
  }

  public getProduct(productId: number): Observable<Product> {
    return this.httpClient.get<Product>(`${environment.server}/shops/1/products/${productId}`);
  }

  public searchForProduct(search: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${environment.server}/shops/1/products`, {
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
      .get<Cart>(`${environment.server}/shops/1/carts/${cartId}`)
      .pipe(catchError(() => this.createCart()));
  }

  public createCart(): Observable<Cart> {
    return this.httpClient.post<Cart>(`${environment.server}/shops/1/carts`, null).pipe(
      tap((cart) => {
        localStorage.setItem("cartId", JSON.stringify(cart.id));
      })
    );
  }

  public addToCart(productId: number, quantity: number): void {
    this.getCart().subscribe((cart) =>
      this.httpClient
        .post<Cart>(`${environment.server}/shops/1/carts/${cart.id}/products`, {
          productId,
          quantity,
        })
        .subscribe()
    );
  }

  public updateCart(cartId: number, productId: number, quantity: number): Observable<Cart> {
    return this.httpClient
      .put(`${environment.server}/shops/1/carts/${cartId}/products/${productId}`, { quantity })
      .pipe(concatMap(() => this.getCart()));
  }

  public deleteProductFromCart(cartId: number, productId: number): Observable<Cart> {
    return this.httpClient
      .delete(`${environment.server}/shops/1/carts/${cartId}/products/${productId}`)
      .pipe(concatMap(() => this.getCart()));
  }

  public getUser(id: number) {
    return this.httpClient.get<User>(`${environment.server}/shops/1/users/${id}`);
  }

  public searchForUser(email: string) {
    return this.httpClient.get<User>(`${environment.server}/shops/1/users?email=${email}`);
  }

  public setUserForCart(cartId: number, userId: number): Observable<unknown> {
    return this.httpClient.put(`${environment.server}/shops/1/carts/${cartId}`, {
      userId,
    });
  }

  public createUser(cartId: number, user: User): Observable<User> {
    return this.httpClient.post<User>(`${environment.server}/shops/1/users`, {
      ...user,
      cartId: cartId,
    });
  }

  public getPayment(userId: number): Observable<Payment> {
    return this.httpClient.get<Payment>(`${environment.server}/shops/1/users/${userId}/payments`);
  }
  public addPayment(userId: number, payment: Payment): Observable<Payment> {
    return this.httpClient.post<Payment>(
      `${environment.server}/shops/1/users/${userId}/payments`,
      payment
    );
  }

  public updatePayment(userId: number, payment: Payment): Observable<Payment> {
    return this.httpClient
      .put(`${environment.server}/shops/1/users/${userId}/payments/${payment.id}`, payment)
      .pipe(concatMap(() => this.getPayment(userId)));
  }

  public redeemCoupon(cartId: number, code: string): Observable<Coupon> {
    return this.httpClient.post<Coupon>(`${environment.server}/shops/1/coupons/redeem`, {
      cartId,
      code,
    });
  }

  public deleteCoupon(cartId: number, code: string): Observable<unknown> {
    return this.httpClient.delete(`${environment.server}/shops/1/coupons`, {
      body: { cartId, code },
    });
  }

  public makeOrder(cartId: number): Observable<CheckoutResponse> {
    return this.httpClient
      .post<CheckoutResponse>(`${environment.server}/shops/1/carts/${cartId}/order`, {})
      .pipe(tap(() => localStorage.removeItem("cartId")));
  }
}
