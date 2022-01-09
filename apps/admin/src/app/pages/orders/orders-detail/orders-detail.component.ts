import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {OrdersService} from "@lav/orders";
import {ActivatedRoute} from "@angular/router";
import {ORDER_STATUS} from "../order.constants";
import {Subject, takeUntil, timer} from "rxjs";
import {MessageService} from "primeng/api";
import {Location} from "@angular/common";


@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.Emulated
})
export class OrdersDetailComponent implements OnInit, OnDestroy  {

  order;
  orderStatus = [];
  selectedStatus;

  endSubs$: Subject<any> = new Subject();

  constructor(private orderService: OrdersService,
              private route: ActivatedRoute,
              private locationService: Location,
              private messageService: MessageService) {
  }

  ngOnDestroy(): void {

    this.endSubs$.complete();
    }

  ngOnInit(): void {
    this.mapOrderStatus();
    this.getOrder();
  }

  onStatusChange(event){
    this.orderService.updateOrder({status: event.value}, this.order.id).pipe(takeUntil(this.endSubs$)).subscribe(
      () => {
        this.messageService.add(
          {
            severity: 'success',
            summary: 'Success',
            detail: `Order Staus is updated`
          });
        timer(1000).toPromise().then(() => {
          this.locationService.back();
        })
      },
      (() => {
        this.messageService.add(
          {
            severity: 'error',
            summary: 'Error',
            detail: `Order is NOT updated`
          }
        );
      })
    )
  }

  private getOrder() {
    this.route.params.subscribe(params =>{
      if (params.id){
        this.orderService.getOrderById(params.id).pipe(takeUntil(this.endSubs$)).subscribe(order => {
          this.order = order;
          this.selectedStatus = order.status
        })
      }
    });
  }

  private mapOrderStatus(){
    this.orderStatus = Object.keys(ORDER_STATUS).map(key => {
      return {
        id: key,
        name: ORDER_STATUS[key].label
      }
    })
  }

}
