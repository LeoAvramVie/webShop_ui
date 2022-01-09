import {Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardService} from "@lav/users";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
  orderCount;
  productsCount;
  userCount;
  totalSales;

  endSubs$: Subject<any> = new Subject();

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit(): void {

    this.orderCount = this.dashboardService.getOrdersCount().pipe(takeUntil(this.endSubs$)).subscribe(order => {
      this.orderCount = order
    })
    this.productsCount = this.dashboardService.getProductCount().pipe(takeUntil(this.endSubs$)).subscribe(product => {
      this.productsCount = product
    })
    this.userCount = this.dashboardService.getUserCount().pipe(takeUntil(this.endSubs$)).subscribe(user => {
      this.userCount = user
    })
    this.totalSales = this.dashboardService.getTotalSales().pipe(takeUntil(this.endSubs$)).subscribe(totalSales => {
      this.totalSales = totalSales
    })
  }

  ngOnDestroy(): void {
    this.endSubs$.complete();
  }
}
