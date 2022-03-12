import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Product, ProductsService } from '@lav/products';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CartItem, CartService } from '@lav/orders';

@Component({
    selector: 'products-product-page',
    templateUrl: './product-page.component.html',
    styles: [],
    encapsulation: ViewEncapsulation.Emulated
})
export class ProductPageComponent implements OnInit, OnDestroy {
    quantity = 1;

    product: Product | undefined;

    endSubs$: Subject<any> = new Subject();

    constructor(private productService: ProductsService, private route: ActivatedRoute, private cartService: CartService) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if (params['productid']) {
                this.getProduct(params['productid']);
            }
        });
    }

    addProductToCart() {
        const cartItem: CartItem = {
            productId: this.product?.id,
            quantity: this.quantity
        };
        this.cartService.setCartItem(cartItem);
    }

    private getProduct(id: string) {
        this.productService
            .getProductsById(id)
            .pipe(takeUntil(this.endSubs$))
            .subscribe((product) => {
                this.product = product;
            });
    }

    ngOnDestroy(): void {
        this.endSubs$.complete();
    }
}
