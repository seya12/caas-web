import { FormBuilder, Validators } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { AdminService } from "./../../../shared/admin.service";
import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { Shop } from "src/app/models/admin/shop";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ShopDialogComponent } from "../shop-dialog/shop-dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-shop",
  templateUrl: "./shop.component.html",
  styleUrls: ["./shop.component.css"],
})
export class ShopComponent implements OnInit {
  shop: Shop = new Shop();
  shopForm!: FormGroup;
  addShopForm!: FormGroup;
  addShop = false;

  constructor(
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.initShopForm();
    this.initAddShopForm();
  }

  initShopForm() {
    this.shopForm = this.formBuilder.group({
      name: [this.shop.name, Validators.required],
      appKey: [this.shop.appKey],
    });
  }

  initAddShopForm() {
    this.addShopForm = this.formBuilder.group({
      name: ["", Validators.required],
    });
    this.initShop();
  }

  initShop(): void {
    this.adminService.getShop().subscribe((shop) => {
      this.shop = shop;
      this.shopForm.setValue({ name: shop.name, appKey: shop.appKey });
    });
  }

  onSubmit() {
    const shop = { ...this.shop, name: this.shopForm.controls["name"].value };
    this.adminService.updateShop(shop).subscribe(() => {
      this.snackBar.open("Erfolg!", "Schließen");
      this.initShop();
    });
  }

  addNewShop() {
    this.adminService.addShop(this.addShopForm.value).subscribe((shop) => {
      const dialogRef = this.dialog.open(ShopDialogComponent, {
        data: shop,
      });
      dialogRef.afterClosed().subscribe(() => {
        this.initAddShopForm();
        this.addShop = false;
      });
    });
  }
}
