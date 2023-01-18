import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { concatMap, Observable, of, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { Cart } from "../models/cart";
import { Payment } from "../models/payment";
import { Product } from "../models/product";
import { User } from "../models/user";
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

  public getCartIdFromLocalStorage(): string | null {
    return localStorage.getItem("cartId");
  }

  public getCart(): Observable<Cart> {
    const cartId = this.getCartIdFromLocalStorage();
    if (!cartId) {
      return this.createCart().pipe(
        tap((cart) => {
          localStorage.setItem("cartId", JSON.stringify(cart.id));
        })
      );
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

  public updateCart(
    cartId: number,
    productId: number,
    quantity: number
  ): Observable<Cart> {
    return this.httpClient
      .put(
        `${environment.server}/shops/1/carts/${cartId}/products/${productId}`,
        { quantity }
      )
      .pipe(concatMap(() => this.getCart()));
  }

  public deleteProductFromCart(
    cartId: number,
    productId: number
  ): Observable<Cart> {
    return this.httpClient
      .delete(
        `${environment.server}/shops/1/carts/${cartId}/products/${productId}`
      )
      .pipe(concatMap(() => this.getCart()));
  }

  public getUser(id: number) {
    return this.httpClient.get<User>(
      `${environment.server}/shops/1/users/${id}`
    );
  }

  public searchForUser(email: string) {
    return this.httpClient.get<User>(
      `${environment.server}/shops/1/users?email=${email}`
    );
  }

  public setUserForCart(userId: number) {
    this.getCart()
      .pipe(
        concatMap((cart) =>
          this.httpClient.put(
            `${environment.server}/shops/1/carts/${cart.id}`,
            {
              userId,
            }
          )
        )
      )
      .subscribe();
  }

  public createUser(user: User) {
    console.log(user);
    this.getCart()
      .pipe(
        concatMap((cart) =>
          this.httpClient.post<User>(`${environment.server}/shops/1/users`, {
            ...user,
            cartId: cart.id,
          })
        )
      )
      .subscribe();
  }

  public getPayment(userId: number): Observable<Payment> {
    return this.httpClient.get<Payment>(
      `${environment.server}/shops/1/users/${userId}/payments`
    );
  }
  public addPayment(userId: number, payment: Payment): Observable<Payment> {
    return this.httpClient.post<Payment>(
      `${environment.server}/shops/1/users/${userId}/payments`,
      payment
    );
  }

  public updatePayment(userId: number, payment: Payment): Observable<Payment> {
    console.log("update", payment);
    return this.httpClient
      .put(
        `${environment.server}/shops/1/users/${userId}/payments/${payment.id}`,
        payment
      )
      .pipe(concatMap(() => this.getPayment(userId)));
  }
}
