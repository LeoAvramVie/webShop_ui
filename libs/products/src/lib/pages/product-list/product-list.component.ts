import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { CategoriesService, Category, Product, ProductsService } from '@lav/products';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'products-list',
    templateUrl: './product-list.component.html',
    styles: [],
    encapsulation: ViewEncapsulation.Emulated
})
export class ProductListComponent implements OnInit, OnDestroy {
    products: Product[] = [];
    categories: Category[] = [];
    isCategoryPage: boolean | undefined;

    endSubs$: Subject<any> = new Subject();

    constructor(private productService: ProductsService, private categoryService: CategoriesService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            params['categoryid'] ? this.getProducts([params['categoryid']]) : this.getProducts();
            params['categoryid'] ? (this.isCategoryPage = true) : (this.isCategoryPage = false);
        });

        this.getCategories();
    }

    categoryFilter() {
        const selectedCategories = this.categories.filter((category) => category.checked).map((category) => category.id);

        this.getProducts(selectedCategories);
    }

    private getProducts(categoriesFilter?: (string | undefined)[]) {
        this.productService
            .getProducts(categoriesFilter)
            .pipe(takeUntil(this.endSubs$))
            .subscribe((products) => {
                this.products = products;
            });
    }

    private getCategories() {
        this.categoryService
            .getCategories()
            .pipe(takeUntil(this.endSubs$))
            .subscribe((category) => {
                this.categories = category;
            });
    }

    ngOnDestroy(): void {
        this.endSubs$.complete();
    }
}
