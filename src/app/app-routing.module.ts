import { TestComponent } from "./components/admin/test/test.component";
import { AdminComponent } from "./pages/admin/admin.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CartComponent } from "./components/cart/cart.component";
import { LoginComponent } from "./pages/login/login.component";
import { OrderComponent } from "./pages/order/order.component";
import { ProductListItemComponent } from "./components/product-list-item/product-list-item.component";
import { ProductListComponent } from "./components/product-list/product-list.component";
import { HomeComponent } from "./pages/home/home.component";
import { ShopComponent } from "./components/admin/shop/shop.component";
import { AdminProductListComponent } from "./components/admin/admin-product-list/admin-product-list.component";
import { StatisticsComponent } from "./components/admin/statistics/statistics.component";
import { DiscountsComponent } from "./components/admin/discounts/discounts.component";

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
        path: "",
        component: ProductListComponent,
      },
      {
        path: ":id",
        component: ProductListItemComponent,
      },
    ],
  },
  {
    path: "order",
    component: OrderComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },

  {
    path: "admin",
    component: AdminComponent,
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
        component: StatisticsComponent,
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

  // {
  //   path: 'books',
  //   component: BookListComponent,
  // },
  // {
  //   path: 'books/:id',
  //   component: BookDetailsComponent,
  // },
  // {
  //   path: 'admin',
  //   component: BookFormComponent,
  //   canActivate: [CanNavigateToAdminGuard],
  // },
  // {
  //   path: 'adminR/:id',
  //   component: BookRformComponent,
  // },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  // },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
