import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ProductsService} from "@lav/products";
import {Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'admin-product-list',
  templateUrl: './product-list.component.html',
  styles: [
  ],
  encapsulation: ViewEncapsulation.Emulated
})
export class ProductListComponent implements OnInit, OnDestroy {

  products = [];

  endSubs$: Subject<any> = new Subject();

  constructor(private productService: ProductsService,
              private router: Router,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts(){
    this.productService.getProducts().pipe(takeUntil(this.endSubs$)).subscribe(products=>{
      this.products = products;
    })
  }

  updateProduct(productid: string){
    this.router.navigateByUrl(`products/form/${productid}`)
  }

  deleteProduct(productId: string){
      this.confirmationService.confirm({
        message: 'Do you want to delete this product?',
        header: 'Delete Product',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.productService.deleteProducts(productId).pipe(takeUntil(this.endSubs$)).subscribe(
            () => {
              this.getProducts();
              this.messageService.add(
                {
                  severity: 'success',
                  summary: 'Success',
                  detail: 'Category successful deleted'
                });
            },
            (() => {
              this.messageService.add(
                {
                  severity: 'error',
                  summary: 'Error',
                  detail: 'Category is not deleted'
                }
              );
            }));
        }
      });
    }
  ngOnDestroy(): void {
    this.endSubs$.complete();
  }
}
