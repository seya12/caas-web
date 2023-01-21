import { Component, OnInit } from "@angular/core";
import { EChartsOption } from "echarts";
import { AdminService } from "src/app/shared/admin.service";

@Component({
  selector: "app-most-sold-products",
  templateUrl: "./most-sold-products.component.html",
  styleUrls: ["./most-sold-products.component.css"],
})
export class MostSoldProductsComponent implements OnInit {
  mergeData: any;
  chartOption: EChartsOption = {
    series: [
      {
        type: "pie",
        data: [],
      },
    ],
  };

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    type PieData = { value: number; name: string };

    this.adminService.getBestSellingProducts(5, 2022, 10).subscribe((products) => {
      const pieData: PieData[] = [];
      products.forEach((product) =>
        pieData.push({ value: product.numberOfSales, name: product.productName })
      );
      this.mergeData = {
        series: [
          {
            data: pieData,
          },
        ],
      };
    });
  }
}
