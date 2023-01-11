import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Item } from "../models/item";

@Injectable({
  providedIn: "root",
})
export class ShopService {
  items: Item[] = [];

  constructor(private httpClient: HttpClient) {}
}
