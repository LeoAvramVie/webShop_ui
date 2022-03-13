import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Subject, take, takeUntil} from "rxjs";
import {CartService, OrdersService} from "@lav/orders";
import {Router} from "@angular/router";

@Component({
  selector: 'lav-orders-order-summary',
  templateUrl: './order-summary.component.html',
  styles: [
  ],
  encapsulation: ViewEncapsulation.Emulated
})
export class OrderSummaryComponent implements OnInit,OnDestroy {

  endSubs$: Subject<any> = new Subject<any>();
  totalPrice = 0 ;
  isCheckout = false;

  constructor(private cartService: CartService,
              private ordersService: OrdersService,
              private router: Router) {
    this.router.url.includes('checkout') ? this.isCheckout = true : this.isCheckout = false
  }

  ngOnInit(): void {
    this.getOrderSummary();
  }

  getOrderSummary(){
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe((cart) => {
      this.totalPrice = 0;
      if (cart) {
        cart.items.map((item: { productId: any; quantity: number; }) => {
          this.ordersService
            .getProductsById(item.productId)
            .pipe(take(1))
            .subscribe((product) => {
                this.totalPrice += product.price * item.quantity ;
            });
        });
      }

    })
  }

  navigateToCheckout(){
    this.router.navigate(['/checkout']);
  }

  ngOnDestroy(): void {
    this.endSubs$.complete();
  }
}
