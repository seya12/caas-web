import { RedeemedCouponsComponent } from "./components/admin/statistics/redeemed-coupons/redeemed-coupons.component";
import { MostSoldProductsComponent } from "./components/admin/statistics/most-sold-products/most-sold-products.component";
import { AdminComponent } from "./pages/admin/admin.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CartComponent } from "./components/cart/cart.component";
import { OrderComponent } from "./pages/order/order.component";
import { ProductListItemComponent } from "./components/product-list-item/product-list-item.component";
import { ProductListComponent } from "./components/product-list/product-list.component";
import { HomeComponent } from "./pages/home/home.component";
import { ShopComponent } from "./components/admin/shop/shop.component";
import { AdminProductListComponent } from "./components/admin/admin-product-list/admin-product-list.component";
import { DiscountsComponent } from "./components/admin/discounts/discounts.component";
import { StatisticsDashboardComponent } from "./components/admin/statistics/statistics-dashboard/statistics-dashboard.component";
import { RevenueComponent } from "./components/admin/statistics/revenue/revenue.component";
import { CanNavigateToAdminGuard } from "./can-navigate-to-admin.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    component: HomeComponent,
    children: [
      {
        path: "cart",
        component: CartComponent,
      },
      {
        path: "products",
        component: ProductListComponent,
      },
      {
        path: "products/:id",
        component: ProductListItemComponent,
      },
      {
        path: "",
        component: ProductListComponent,
      },
    ],
  },
  {
    path: "order",
    component: OrderComponent,
  },

  {
    path: "admin",
    component: AdminComponent,
    canActivate: [CanNavigateToAdminGuard],
    children: [
      {
        path: "shop",
        component: ShopComponent,
      },
      {
        path: "products",
        component: AdminProductListComponent,
      },
      {
        path: "statistics",
        component: StatisticsDashboardComponent,
      },
      {
        path: "statistics/revenue",
        component: RevenueComponent,
      },
      {
        path: "statistics/sold",
        component: MostSoldProductsComponent,
      },
      {
        path: "statistics/coupons",
        component: RedeemedCouponsComponent,
      },

      {
        path: "discounts",
        component: DiscountsComponent,
      },
      {
        path: "",
        component: ShopComponent,
      },
    ],
  },

  {
    path: "index.html",
    redirectTo: "home",
    pathMatch: "full",
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
