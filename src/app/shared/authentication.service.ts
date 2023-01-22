import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { OAuthService } from "angular-oauth2-oidc";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  constructor(private oauthService: OAuthService, private router: Router) {
    this.oauthService.events.subscribe((event) => {
      //workaround as we can not open admin after login (guard doesn't wait for result, would need observable)
      if (event.type === "token_received") {
        this.router.navigate(["/admin"]);
      }
    });
  }

  login(): boolean {
    if (this.isLoggedIn()) return true;

    this.oauthService.initCodeFlow();
    return true;
  }

  isLoggedIn(): boolean {
    return this.oauthService.hasValidAccessToken() && this.oauthService.hasValidIdToken();
  }

  logout() {
    this.oauthService.logOut();
  }
}
