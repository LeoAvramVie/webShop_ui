import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Product, ProductsService } from '@lav/products';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'products-product-page',
    templateUrl: './product-page.component.html',
    styles: [],
    encapsulation: ViewEncapsulation.Emulated
})
export class ProductPageComponent implements OnInit, OnDestroy {
    product: Product | undefined;

    endSubs$: Subject<any> = new Subject();

    constructor(private productService: ProductsService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if (params['productid']) {
                this.getProduct(params['productid']);
            }
        });
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
