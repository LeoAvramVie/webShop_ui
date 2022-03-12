import { Injectable } from '@angular/core';
import { Cart, CartItem } from '../models/cart';
import { BehaviorSubject } from 'rxjs';

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

    setCartItem(cartItem: CartItem): Cart {
        const cart = this.getCart();
        const cartItemExist = cart.items?.find((item) => item.productId === cartItem.productId);
        if (cartItemExist) {
            cart.items?.map((item) => {
                if (item.productId === cartItem.productId) {
                    if (cartItem.quantity != null && item.quantity != null) {
                        item.quantity = item.quantity + cartItem.quantity;
                        return item;
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
}
