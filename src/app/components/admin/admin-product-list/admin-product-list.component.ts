import { AdminService } from "./../../../shared/admin.service";
import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/models/product";
import { MatDialog } from "@angular/material/dialog";
import { EditProductDialogComponent } from "../dialogs/edit-product-dialog/edit-product-dialog.component";

@Component({
  selector: "app-admin-product-list",
  templateUrl: "./admin-product-list.component.html",
  styleUrls: ["./admin-product-list.component.css"],
})
export class AdminProductListComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = [
    "id",
    "name",
    "description",
    "downloadLink",
    "price",
    "active",
    "actions",
  ];

  /**
   *
   */
  constructor(private adminService: AdminService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.adminService
      .getProducts()
      .subscribe((products) => (this.products = products));
  }

  openDeleteModal(productId: number) {}
  openAddModal() {
    const dialogRef = this.dialog.open(EditProductDialogComponent, {
      data: new Product(),
      width: "80%",
    });
  }
  openEditModal(product: Product) {
    const dialogRef = this.dialog.open(EditProductDialogComponent, {
      data: product,
      width: "80%",
    });
  }
}
