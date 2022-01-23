import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { OrdersModule } from '@lav/orders';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner/categories-banner.component';
import { RouterModule } from '@angular/router';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
    imports: [CommonModule, OrdersModule, RouterModule, ButtonModule],
    declarations: [ProductsSearchComponent, CategoriesBannerComponent, FeaturedProductsComponent, ProductItemComponent],
    exports: [ProductsSearchComponent, CategoriesBannerComponent, FeaturedProductsComponent, ProductItemComponent]
})
export class ProductsModule {}
