import {Component, OnInit} from '@angular/core';
import {DashboardService} from "@lav/users";
import {take} from "rxjs";

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  orderCount;
  productsCount;
  userCount;
  totalSales;


  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit(): void {

    this.orderCount = this.dashboardService.getOrdersCount().pipe(take(1)).subscribe(order => {
      this.orderCount = order
    })
    this.productsCount = this.dashboardService.getProductCount().pipe(take(1)).subscribe(product => {
      this.productsCount = product
    })
    this.userCount = this.dashboardService.getUserCount().pipe(take(1)).subscribe(user => {
      this.userCount = user
    })
    this.totalSales = this.dashboardService.getTotalSales().pipe(take(1)).subscribe(totalSales => {
      this.totalSales = totalSales
    })
  }
}
