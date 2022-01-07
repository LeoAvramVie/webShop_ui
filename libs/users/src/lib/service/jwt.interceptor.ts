import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LocalStorageService} from "./localStorage.service";
import {environment} from "@env/environment";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private localStorage: LocalStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.localStorage.getToken();
    const isApiUrl = request.url.startsWith(environment.apiUrl);

    if (token && isApiUrl){
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    }
    return next.handle(request);
  }
}
