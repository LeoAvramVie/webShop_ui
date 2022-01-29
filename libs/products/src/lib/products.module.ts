import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { OrdersModule } from '@lav/orders';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner/categories-banner.component';
import { RouterModule, Routes } from '@angular/router';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ButtonModule } from 'primeng/button';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
    {
        path: 'products',
        component: ProductListComponent
    }
];

@NgModule({
    imports: [CommonModule, OrdersModule, RouterModule, ButtonModule, RouterModule.forChild(routes), CheckboxModule, FormsModule],
    declarations: [ProductsSearchComponent, CategoriesBannerComponent, FeaturedProductsComponent, ProductItemComponent, ProductListComponent],
    exports: [ProductsSearchComponent, CategoriesBannerComponent, FeaturedProductsComponent, ProductItemComponent, ProductListComponent]
})
export class ProductsModule {}
