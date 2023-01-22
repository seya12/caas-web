import { Injectable } from "@angular/core";
import { OAuthService } from "angular-oauth2-oidc";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  constructor(private oauthService: OAuthService) {}

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
