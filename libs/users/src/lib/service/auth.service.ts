import {Injectable} from '@angular/core';
import {environment} from "@env/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User} from '../models/user';
import {LocalStorageService} from "./localStorage.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrlAuth = environment.apiUrl + 'users';

  constructor(private httpClient: HttpClient,
              private token : LocalStorageService,
              private route: Router) { }

  login(email: string, password: string): Observable<User>{
    return this.httpClient.post<User>(`${this.apiUrlAuth}/login`,
      {
        email: email,
        password: password
      }
    )
  }
  logOut(){
    this.token.removeToken();
    this.route.navigate(['/login'])
  }
}
