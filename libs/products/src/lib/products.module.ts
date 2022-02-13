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
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { RatingModule } from 'primeng/rating';
import { InputNumberModule } from 'primeng/inputnumber';
import { RippleModule } from 'primeng/ripple';

const routes: Routes = [
    {
        path: 'products',
        component: ProductListComponent
    },
    {
        path: 'category/:categoryid',
        component: ProductListComponent
    },
    {
        path: 'products/:productid',
        component: ProductPageComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        OrdersModule,
        RouterModule,
        ButtonModule,
        RouterModule.forChild(routes),
        CheckboxModule,
        FormsModule,
        RatingModule,
        InputNumberModule,
        RippleModule
    ],
    declarations: [
        ProductsSearchComponent,
        CategoriesBannerComponent,
        FeaturedProductsComponent,
        ProductItemComponent,
        ProductListComponent,
        ProductPageComponent
    ],
    exports: [ProductsSearchComponent, CategoriesBannerComponent, FeaturedProductsComponent, ProductItemComponent, ProductListComponent, ProductPageComponent]
})
export class ProductsModule {}
