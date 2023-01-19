import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CheckoutResponse } from "src/app/models/checkoutResponse";

@Component({
  selector: "app-order-dialog-failed",
  templateUrl: "./order-dialog-failed.component.html",
  styleUrls: ["./order-dialog-failed.component.css"],
})
export class OrderDialogFailedComponent {
  constructor(
    public dialogRef: MatDialogRef<OrderDialogFailedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CheckoutResponse
  ) {}

  onNoClick(): void {
    console.log(this.data);
    this.dialogRef.close();
  }
}
