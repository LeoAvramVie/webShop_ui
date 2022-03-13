import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CartItemDetailed, CartService} from "@lav/orders";
import {OrdersService} from "../../services/orders.service";

@Component({
  selector: 'lav-order-cart-apge',
  templateUrl: './cart-page.component.html',
  styles: [
  ]
})
export class CartPageComponent implements OnInit {

  cartItemDetailed: CartItemDetailed[] = [];

  constructor(private router: Router,
              private cartService: CartService,
              private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.getCartDetails();
  }
  backToShop(){
    this.router.navigate(['/products'])
  }

  deleteCartItem(){

  }

  private getCartDetails(){
    this.cartService.cart$.pipe().subscribe(respCart => {
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
}
