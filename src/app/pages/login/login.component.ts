import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/shared/authentication.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  user = {
    userName: "",
    password: "",
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: [this.user.userName, Validators.required],
      password: [this.user.password, Validators.required],
    });
  }

  login(event: SubmitEvent) {
    event.preventDefault();
    const user = this.loginForm.value;
    if (this.authService.login(user.userName, user.password)) {
      this.router.navigate(["/"]);
    }
  }
}
