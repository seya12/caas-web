import { forkJoin, map, merge, mergeAll, Observable, zip } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { EChartsOption } from "echarts";
import { AdminService } from "src/app/shared/admin.service";

@Component({
  selector: "app-revenue",
  templateUrl: "./revenue.component.html",
  styleUrls: ["./revenue.component.css"],
})
export class RevenueComponent implements OnInit {
  map = [{}];
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
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "bar",
      },
    ],
  };

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    const requests: Observable<any>[] = [];

    for (let i = 1; i <= 12; i++) {
      requests[i] = this.adminService
        .getRevenue(2022, i)
        .pipe(map((res) => ({ index: i, revenue: res })));

      // this.adminService
      //   .getRevenue(2022, i)
      //   .pipe(map((res) => ({ index: i, revenue: res })))
      //   .subscribe((res) => {
      //     this.map[i] = { month: i, revenue: res };
      //     if (i === 12) {
      //       this.chartOption.series = [{ data: [...this.map.values()], type: "bar" }];
      //     }
      //   });
    }

    // zip(requests).subscribe((res) => console.log(res));
  }
}
