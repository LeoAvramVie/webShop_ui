import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CategoriesService, Category} from "@lav/products";
import {ConfirmationService, MessageService} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.Emulated
})
export class CategoriesListComponent implements OnInit {

  categories: Category[] = [];

  constructor(private categoriesService: CategoriesService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getCategories();
  }

  deleteCategory(categoryId: string) {

    this.confirmationService.confirm({
      message: 'Do you want to delete this category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesService.deleteCategory(categoryId).subscribe(
          () => {
            this.getCategories();
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

  updateCategory(categoryId: string) {
    this.router.navigateByUrl(`categories/form/${categoryId}`).then();
  }

  private getCategories() {
    this.categoriesService.getCategories().subscribe(cats => {
      this.categories = cats
    });
  }
}
