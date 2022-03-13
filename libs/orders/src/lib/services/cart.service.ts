import {Injectable} from '@angular/core';
import {Cart, CartItem} from '../models/cart';
import {BehaviorSubject} from 'rxjs';

export const CART_KEY = 'cart';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    cart$: BehaviorSubject<any> = new BehaviorSubject(this.getCart());

    constructor() {}

    initCartLocalStorage() {
        const existCart: Cart = this.getCart();
        if (!existCart) {
            const initCart = {
                items: []
            };
            const initCartJson = JSON.stringify(initCart);
            localStorage.setItem(CART_KEY, initCartJson);
        }
    }

    getCart(): Cart {
        const cartJsonString: string | null = localStorage.getItem(CART_KEY) ?? null;
        if (cartJsonString != null) {
            const cart: Cart = JSON.parse(cartJsonString);
            return cart;
        }
        return { items: [] };
    }

    setCartItem(cartItem: CartItem, updateCartItem?: boolean): Cart {
        const cart = this.getCart();
        const cartItemExist = cart.items?.find((item) => item.productId === cartItem.productId);
        if (cartItemExist) {
            cart.items?.map((item) => {
                if (item.productId === cartItem.productId) {
                    if (cartItem.quantity != null && item.quantity != null) {
                      if (updateCartItem){
                        item.quantity = cartItem.quantity
                      }else{
                        item.quantity = item.quantity + cartItem.quantity;
                        return item;
                      }

                    }
                }
                return item;
            });
        } else {
            cart.items?.push(cartItem);
        }
        const cartJson = JSON.stringify(cart);
        localStorage.setItem(CART_KEY, cartJson);
        this.cart$.next(cart);
        return cart;
    }

    deleteCartItem(productId: string){
      const cart = this.getCart();
      const newCart = cart.items?.filter(item => item.productId !== productId);

      cart.items = newCart;

      const cartJSONString = JSON.stringify(cart);
      localStorage.setItem(CART_KEY, cartJSONString);

      this.cart$.next(cart);
    }

  emptyCart() {
    const intialCart = {
      items: []
    };
    const intialCartJson = JSON.stringify(intialCart);
    localStorage.setItem(CART_KEY, intialCartJson);
    this.cart$.next(intialCart);
  }
}
