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
          {
            title: "Card 1",
            cols: 1,
            rows: 1,
            link: "sold",
            body: "Meist verkauften Produkte für 2022",
          },
          { title: "Card 2", cols: 1, rows: 1, link: "revenue", body: "Umsatz für 2022" },
          {
            title: "Card 3",
            cols: 1,
            rows: 1,
            link: "",
            body: "Warenkorb-Status für 2022 - noch nicht umgesetzt",
          },
          {
            title: "Card 4",
            cols: 1,
            rows: 1,
            link: "coupons",
            body: "Eingeöste Coupons für 2022",
          },
        ];
      }

      return [
        {
          title: "Meist-verkaufte Produkte",
          cols: 2,
          rows: 1,
          link: "sold",
          body: "Meist verkauften Produkte für 2022",
        },
        { title: "Umsatz", cols: 1, rows: 1, link: "revenue", body: "Umsatz für 2022" },
        {
          title: "Warenkorb-Status",
          cols: 1,
          rows: 2,
          link: "/admin/statistics",
          body: "Warenkorb-Status für 2022 - noch nicht umgesetzt",
        },
        {
          title: "Eingelöste Coupons",
          cols: 1,
          rows: 1,
          link: "coupons",
          body: "Eingeöste Coupons für 2022",
        },
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
