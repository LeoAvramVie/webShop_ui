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

  constructor(private httpClient: HttpClient) {
  }

  getOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.apiUrlOrders)
  }

  updateOrder(order: Order): Observable<Order> {
    return this.httpClient.put<Order>(this.apiUrlOrders + '/' + order.id, order)
  }

  deleteOrder(orderId: string): Observable<Order> {
    return this.httpClient.delete<Order>(`${this.apiUrlOrders}/${orderId}`)
  }

  getOrderById(orderId: string): Observable<Order> {
    return this.httpClient.get<Order>(`${this.apiUrlOrders}/${orderId}`)
  }
}
