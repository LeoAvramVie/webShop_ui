import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsSearchComponent} from './components/products-search/products-search.component';
import {OrdersModule} from "@lav/orders";

@NgModule({
    imports: [
      CommonModule,
      OrdersModule],
    declarations: [
      ProductsSearchComponent
    ],
    exports: [ProductsSearchComponent]
})
export class ProductsModule {}
