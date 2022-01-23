import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '@lav/products';

@Component({
    selector: 'products-featured-products',
    templateUrl: './featured-products.component.html',
    styles: [],
    encapsulation: ViewEncapsulation.Emulated
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {
    featureProducts: Product[] = [];
    endSubs$: Subject<any> = new Subject();

    constructor(private prodService: ProductsService) {}

    ngOnInit(): void {
        this.getFeaturedProducts();
    }

    private getFeaturedProducts() {
        this.prodService
            .getFeaturedProducts(4)
            .pipe(takeUntil(this.endSubs$))
            .subscribe((products) => {
                console.log(products);
                this.featureProducts = products;
            });
    }
    ngOnDestroy(): void {
        this.endSubs$.complete();
    }
}
