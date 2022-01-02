import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ProductsService} from "@lav/products";

@Component({
  selector: 'admin-product-list',
  templateUrl: './product-list.component.html',
  styles: [
  ],
  encapsulation: ViewEncapsulation.Emulated
})
export class ProductListComponent implements OnInit {

  products = [];

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts(){
    this.productService.getProducts().subscribe(products=>{
      this.products = products;
    })
  }


}
