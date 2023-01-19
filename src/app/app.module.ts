import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LayoutModule } from "@angular/cdk/layout";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { ReactiveFormsModule } from "@angular/forms";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { MatInputModule } from "@angular/material/input";
import { HomeComponent } from "./pages/home/home.component";
import { ProductListComponent } from "./components/product-list/product-list.component";
import { ProductListItemComponent } from "./components/product-list-item/product-list-item.component";
import { HttpClientModule } from "@angular/common/http";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatDividerModule } from "@angular/material/divider";
import { MatSelectModule } from "@angular/material/select";
import { CartComponent } from "./components/cart/cart.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { OrderComponent } from "./pages/order/order.component";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";
import { OrderDialogFailedComponent } from "./components/order-dialog-failed/order-dialog-failed.component";
import { OrderDialogSuccessComponent } from "./components/order-dialog-success/order-dialog-success.component";
import { LoginComponent } from "./pages/login/login.component";
import { AdminComponent } from "./pages/admin/admin.component";
import { AdminNavigationComponent } from "./components/admin-navigation/admin-navigation.component";
import { ShopComponent } from "./components/admin/shop/shop.component";
import { AdminProductListComponent } from "./components/admin/admin-product-list/admin-product-list.component";
import { StatisticsComponent } from "./components/admin/statistics/statistics.component";
import { DiscountsComponent } from "./components/admin/discounts/discounts.component";
import { TestComponent } from "./components/admin/test/test.component";
import { MatRadioModule } from "@angular/material/radio";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ShopDialogComponent } from './components/admin/shop-dialog/shop-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    ProductListComponent,
    ProductListItemComponent,
    CartComponent,
    OrderComponent,
    OrderDialogFailedComponent,
    OrderDialogSuccessComponent,
    LoginComponent,
    AdminNavigationComponent,
    AdminComponent,
    ShopComponent,
    AdminProductListComponent,
    StatisticsComponent,
    DiscountsComponent,
    TestComponent,
    ShopDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatDividerModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatRadioModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
