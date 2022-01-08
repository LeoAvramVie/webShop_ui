import {Injectable} from '@angular/core';
import {environment} from "@env/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  apiUrlOrdersCount = environment.apiUrl + 'orders/get/count';
  apiUrlOrdersProduct = environment.apiUrl + 'products/get/count';
  apiUrlUserCount = environment.apiUrl + 'users/get/count';
  apiUrlTotalSales = environment.apiUrl + 'orders/get/totalsales';

  constructor(private httpClient: HttpClient) { }

  getOrdersCount(): Observable<string> {
    return this.httpClient.get<string>(this.apiUrlOrdersCount)
  }

  getProductCount(): Observable<string> {
    return this.httpClient.get<string>(this.apiUrlOrdersProduct)
  }

  getUserCount(): Observable<string> {
    return this.httpClient.get<string>(this.apiUrlUserCount)
  }

  getTotalSales(): Observable<string> {
    return this.httpClient.get<string>(this.apiUrlTotalSales)
  }
}
