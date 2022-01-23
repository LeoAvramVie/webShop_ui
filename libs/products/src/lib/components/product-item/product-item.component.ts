import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Product } from '@lav/products';

@Component({
    selector: 'products-product-item',
    templateUrl: './product-item.component.html',
    styles: [],
    encapsulation: ViewEncapsulation.Emulated
})
export class ProductItemComponent implements OnInit {
    @Input() product: Product | undefined;

    constructor() {}

    ngOnInit(): void {}
}
