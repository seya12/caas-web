import { Component } from "@angular/core";
import { map } from "rxjs/operators";
import { Breakpoints, BreakpointObserver } from "@angular/cdk/layout";

@Component({
  selector: "app-statistics-dashboard",
  templateUrl: "./statistics-dashboard.component.html",
  styleUrls: ["./statistics-dashboard.component.css"],
})
export class StatisticsDashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: "Card 1", cols: 1, rows: 1, link: "sold" },
          { title: "Card 2", cols: 1, rows: 1, link: "revenue" },
          { title: "Card 3", cols: 1, rows: 1, link: "state" },
          { title: "Card 4", cols: 1, rows: 1, link: "coupons" },
        ];
      }

      return [
        {
          title: "Meist-verkaufte Produkte",
          cols: 2,
          rows: 1,
          link: "sold",
        },
        { title: "Umsatz", cols: 1, rows: 1, link: "revenue" },
        { title: "Warenkorb-Status", cols: 1, rows: 2, link: "state" },
        { title: "Eingelöste Coupons", cols: 1, rows: 1, link: "coupons" },
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
