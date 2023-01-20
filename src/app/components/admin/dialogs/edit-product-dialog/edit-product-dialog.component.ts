import { Product } from "./../../../../models/product";
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AdminService } from "src/app/shared/admin.service";

@Component({
  selector: "app-edit-product-dialog",
  templateUrl: "./edit-product-dialog.component.html",
  styleUrls: ["./edit-product-dialog.component.css"],
})
export class EditProductDialogComponent implements OnInit {
  productForm!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<EditProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private formBuilder: FormBuilder,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      id: [this.data.id],
      name: [this.data.name, Validators.required],
      description: [this.data.description, Validators.required],
      downloadLink: [this.data.downloadLink, Validators.required],
      price: [this.data.price, Validators.required],
      active: [this.data.active],
    });
  }

  performAction() {
    console.log("perofrm");
    if (this.data.id) {
      this.adminService.updateProduct(this.productForm.value).subscribe();
    } else {
      this.adminService.addProduct(this.productForm.value).subscribe();
    }
  }
}
