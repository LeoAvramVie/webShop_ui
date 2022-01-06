import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Order, OrdersService} from "@lav/orders";
import {ConfirmationService, MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {ORDER_STATUS} from "../order.constants";


@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.Emulated
})
export class OrdersListComponent implements OnInit {

  orders: Order[] = [];
  orderStatus = ORDER_STATUS;

  constructor(private ordersService: OrdersService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getOrders();
  }

  deleteOrder(orderId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this Order?',
      header: 'Delete Order',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ordersService.deleteOrder(orderId).subscribe(
          () => {
            this.getOrders();
            this.messageService.add(
              {
                severity: 'success',
                summary: 'Success',
                detail: 'Order successful deleted'
              });
          },
          (() => {
            this.messageService.add(
              {
                severity: 'error',
                summary: 'Error',
                detail: 'Order is not deleted'
              }
            );
          }));
      }
    });
  }

  showOrder(orderId: string) {
    this.router.navigateByUrl(`orders/${orderId}`).then();
  }

  private getOrders() {
    this.ordersService.getOrders().subscribe(orders => {
      this.orders = orders
    });
  }

}
