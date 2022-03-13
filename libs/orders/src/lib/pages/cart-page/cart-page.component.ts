import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CartItemDetailed, CartService} from "@lav/orders";
import {OrdersService} from "../../services/orders.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'lav-order-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [
  ]
})
export class CartPageComponent implements OnInit, OnDestroy {

  cartItemDetailed: CartItemDetailed[] = [];
  cartCount = 0
  endSubs$: Subject<any> = new Subject<any>();

  constructor(private router: Router,
              private cartService: CartService,
              private ordersService: OrdersService) { }



  ngOnInit(): void {
    this.getCartDetails();
  }
  backToShop(){
    this.router.navigate(['/products'])
  }

  deleteCartItem(cartItem: CartItemDetailed){
    this.cartService.deleteCartItem(cartItem.product.id)
  }

  updateCartItemQuantity(event: { value: any; }, cartItem: CartItemDetailed){
    this.cartService.setCartItem({
      productId: cartItem.product.id,
      quantity: event.value
    }, true);
  }

  private getCartDetails(){
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe(respCart => {
      this.cartItemDetailed = [];
      this.cartCount = respCart?.items?.length ?? 0
      respCart.items.forEach((cartItem: { productId: string, quantity?: number; }) => {
        this.ordersService.getProductsById(cartItem.productId).subscribe((responseProduct)=>{
          this.cartItemDetailed.push({
            product: responseProduct,
            quantity: cartItem.quantity
          });
        })
      })
    })
  }

  ngOnDestroy(): void {
    this.endSubs$.complete();
  }
}
