import {Injectable} from '@angular/core';
import {environment} from "@env/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order} from "../models/order";


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  apiUrlOrders = environment.apiUrl + 'orders';
  apiUrlProducts = environment.apiUrl + 'products';

  constructor(private httpClient: HttpClient) {
  }

  getOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.apiUrlOrders)
  }

  updateOrder(orderStatus: {status: string}, orderId: string): Observable<Order> {
    return this.httpClient.put<Order>(`${this.apiUrlOrders}/${orderId}`, orderStatus)
  }

  deleteOrder(orderId: string): Observable<Order> {
    return this.httpClient.delete<Order>(`${this.apiUrlOrders}/${orderId}`)
  }

  getOrderById(orderId: string): Observable<Order> {
    return this.httpClient.get<Order>(`${this.apiUrlOrders}/${orderId}`)
  }

  getProductsById(productsId: string): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrlProducts}/${productsId}`);
  }

  createOrder(order: Order): Observable<Order> {
    return this.httpClient.post<Order>(this.apiUrlOrders, order);
  }
}
