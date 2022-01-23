import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { CategoriesService } from '../../../services/categories.service';
import { Category } from '@lav/products';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'lav-products-categories-banner',
    templateUrl: './categories-banner.component.html',
    styles: [],
    encapsulation: ViewEncapsulation.Emulated
})
export class CategoriesBannerComponent implements OnInit, OnDestroy {
    categories: Category[] = [];

    endSubs$: Subject<any> = new Subject();

    constructor(private categoriesService: CategoriesService) {}

    ngOnInit(): void {
        this.categoriesService
            .getCategories()
            .pipe(takeUntil(this.endSubs$))
            .subscribe((categories) => {
                this.categories = categories;
            });
    }

    ngOnDestroy(): void {
        this.endSubs$.complete();
    }
}
