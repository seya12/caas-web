import { ConfirmDialogComponent } from "./../dialogs/confirm-dialog/confirm-dialog.component";
import { AdminService } from "./../../../shared/admin.service";
import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/models/product";
import { MatDialog } from "@angular/material/dialog";
import { EditProductDialogComponent } from "../dialogs/edit-product-dialog/edit-product-dialog.component";
import { MatTableDataSource } from "@angular/material/table";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-admin-product-list",
  templateUrl: "./admin-product-list.component.html",
  styleUrls: ["./admin-product-list.component.css"],
})
export class AdminProductListComponent implements OnInit {
  products: Product[] = [];
  dataSource = new MatTableDataSource(this.products);
  displayedColumns: string[] = [
    "id",
    "name",
    "description",
    "downloadLink",
    "price",
    "active",
    "actions",
  ];

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.adminService.getProducts().subscribe((products) => {
      this.products = products;
      this.dataSource = new MatTableDataSource(this.products);
    });
  }

  openDeleteModal(productId: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {});
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.adminService.deleteProduct(productId).subscribe(() => this.loadProducts());
        this.snackBar.open("Aktion erfolgreich!", "Schließen", { duration: 5000 });
      }
    });
  }
  openAddModal() {
    const dialogRef = this.dialog.open(EditProductDialogComponent, {
      data: new Product(),
      width: "80%",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadProducts();
        this.snackBar.open("Aktion erfolgreich!", "Schließen", { duration: 5000 });
      }
    });
  }
  openEditModal(product: Product) {
    const dialogRef = this.dialog.open(EditProductDialogComponent, {
      data: product,
      width: "80%",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadProducts();
        this.snackBar.open("Aktion erfolgreich!", "Schließen", { duration: 5000 });
      }
    });
  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
