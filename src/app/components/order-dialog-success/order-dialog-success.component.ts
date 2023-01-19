import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CheckoutResponse } from "src/app/models/checkoutResponse";

@Component({
  selector: "app-order-dialog-success",
  templateUrl: "./order-dialog-success.component.html",
  styleUrls: ["./order-dialog-success.component.css"],
})
export class OrderDialogSuccessComponent {
  constructor(
    public dialogRef: MatDialogRef<OrderDialogSuccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CheckoutResponse
  ) {}
}
