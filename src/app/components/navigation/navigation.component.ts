import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/shared/authentication.service";
import { Component, OnInit } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.css"],
})
export class NavigationComponent implements OnInit {
  adminLogin = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay()
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.adminLogin = this.authService.isLoggedIn();
  }
  login() {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl("/admin");
    } else {
      this.authService.login();
    }
  }
}
