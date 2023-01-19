import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  constructor() {}

  login(username: string, password: string): boolean {
    // if (username == 'test' && password == 'test') {
    sessionStorage.setItem("login", "true");
    //   return true;
    // }
    // return false;
    return true;
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem("login") !== null;
  }
}
