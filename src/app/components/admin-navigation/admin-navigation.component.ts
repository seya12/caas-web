import { Breakpoints, BreakpointObserver } from "@angular/cdk/layout";
import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { Observable, map, shareReplay } from "rxjs";
import { AuthenticationService } from "src/app/shared/authentication.service";

@Component({
  selector: "app-admin-navigation",
  templateUrl: "./admin-navigation.component.html",
  styleUrls: ["./admin-navigation.component.css"],
})
export class AdminNavigationComponent implements OnInit {
  adminLogin = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay()
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.adminLogin = this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
  }
}
