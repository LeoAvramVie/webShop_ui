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
  isAdmin = 0;


  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private localStorageService: LocalStorageService,
              private route: Router,
              private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.initLoginForm();


  }

  onSubmit(){
    this.isSubmitted = true;
    if (this.loginFormGroup?.invalid) return;
    this.authService.login(this.loginForm?.['email']?.value, this.loginForm?.['password'].value).subscribe(
      (user) => {
        this.authError = false;
        this.checkIfAdmin();
        console.log('success', this.isAdmin)
        this.localStorageService.setToken(user.token)
        this.route.navigateByUrl('/')
    },
      (error: HttpErrorResponse) => {
        this.authError = true;
        console.log('error', this.isAdmin)
        this.checkIfAdmin();
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

  private checkIfAdmin() {
    const token = this.localStorage.getToken();
    if(token){
      const tokenDecode = JSON.parse(atob(token.split(('.'))[1]));
      // this.isAdmin = tokenDecode.isAdmin;
      if (tokenDecode.isAdmin === true || tokenDecode.isAdmin == 'true'){
        this.isAdmin = 1;
      }else {
        this.isAdmin = 2;
      }
    }
    this.isAdmin = 2
  }

}
