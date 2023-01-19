import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Shop } from "../models/admin/shop";

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
}
