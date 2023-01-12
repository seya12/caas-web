import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductListItemComponent } from "./components/product-list-item/product-list-item.component";
import { ProductListComponent } from "./components/product-list/product-list.component";
import { HomeComponent } from "./pages/home/home.component";

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
        path: "",
        component: ProductListComponent,
      },
      {
        path: ":id",
        component: ProductListItemComponent,
      },
    ],
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
