import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {LocalStorageService} from "./localStorage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private localStorageToken: LocalStorageService) {
  }

  // @ts-ignore
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.localStorageToken.getToken();

    if (token) {
      const tokenDecode = JSON.parse(atob(token.split(('.'))[1]));
      const isAdmin = tokenDecode.isAdmin;
      const expirationsDateofToken = tokenDecode.exp
      if (isAdmin === true || isAdmin === 'true' && !this.tokenExpired(expirationsDateofToken)){
        return true;
      } else {
        return false
      }

    }
        this.router.navigate(['/login'])
        return false;
  }

  private tokenExpired(expiration: any):boolean{
      return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
}
