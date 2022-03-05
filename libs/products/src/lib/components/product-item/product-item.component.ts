import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Product} from '../../models/product';
import {CartItem, CartService} from '@lav/orders';

@Component({
    selector: 'products-product-item',
    templateUrl: './product-item.component.html',
    styles: [],
    encapsulation: ViewEncapsulation.Emulated
})
export class ProductItemComponent implements OnInit {
    @Input() product: Product | undefined;

    constructor(private cartService: CartService) {}

    ngOnInit(): void {}

    addProduct2Cart() {
        const cartItem: CartItem = {
            productId: this.product?.id,
            quantity: 1
        };
        this.cartService.setCartItem(cartItem);
    }
}
