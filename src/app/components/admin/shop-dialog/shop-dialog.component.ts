import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Shop } from "src/app/models/admin/shop";

@Component({
  selector: "app-shop-dialog",
  templateUrl: "./shop-dialog.component.html",
  styleUrls: ["./shop-dialog.component.css"],
})
export class ShopDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ShopDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Shop
  ) {}
}
