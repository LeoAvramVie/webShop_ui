import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {LocalStorageService} from "../../service/localStorage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'lav-users-login',
  templateUrl: './login.component.html',
  styles: [
  ],
  encapsulation: ViewEncapsulation.Emulated
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup | undefined;
  isSubmitted = false
  authError = false;
  authMessage = 'Email or Password are wrong'

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private localStorageService: LocalStorageService,
              private route: Router) { }

  ngOnInit(): void {
    this.initLoginForm();
  }

  onSubmit(){
    this.isSubmitted = true;
    if (this.loginFormGroup?.invalid) return;
    this.authService.login(this.loginForm?.['email']?.value, this.loginForm?.['password'].value).subscribe(
      (user) => {
        this.authError = false;
        this.localStorageService.setToken(user.token)
        this.route.navigateByUrl('/')
    },
      (error: HttpErrorResponse) => {
        this.authError = true;
        if (error.status !== 400){
          this.authMessage = "Error in the Server, please try again later"
        }
      });

  }

  private initLoginForm(){
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  get loginForm(){
    return this.loginFormGroup?.controls;
  }

}
