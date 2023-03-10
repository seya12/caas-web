import { Component, OnInit } from "@angular/core";
import { EChartsOption } from "echarts";
import { AdminService } from "src/app/shared/admin.service";

@Component({
  selector: "app-revenue",
  templateUrl: "./revenue.component.html",
  styleUrls: ["./revenue.component.css"],
})
export class RevenueComponent implements OnInit {
  mergeData: any;
  chartOption: EChartsOption = {
    xAxis: {
      type: "category",
      data: ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sept", "Okt", "Nov", "Dez"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [],
        type: "bar",
      },
    ],
  };

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    const revenues: number[] = [];
    for (let i = 1; i <= 12; i++) {
      this.adminService.getRevenue(2022, i).subscribe((res) => {
        revenues[i - 1] = res;
        this.mergeData = {
          series: [
            {
              data: revenues,
            },
          ],
        };
        // this.chartOption.series = [{ data: this.revenues, type: "bar" }];
      });
      // .pipe(map((res) => ({ index: i, revenue: res })));

      // this.adminService
      //   .getRevenue(2022, i)
      //   .pipe(map((res) => ({ index: i, revenue: res })))
      //   .subscribe((res) => {
      //     this.map[i] = { month: i, revenue: res };
      //     if (i === 12) {
      //       console.log(...this.map.values());
      //       this.chartOption.series = [{ data: [...this.map.values()], type: "bar" }];
      //     }
      //   });
    }
  }
}
