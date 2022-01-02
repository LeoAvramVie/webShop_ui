import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoriesService, Category} from "@lav/products";
import {MessageService} from "primeng/api";
import {timer} from "rxjs";
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.Emulated
})
export class CategoriesFormComponent implements OnInit {

  form: FormGroup;
  isSubmitted = false;
  editMode = false;
  currentCategoryID: string = null;

  constructor(private formBuilder: FormBuilder,
              private categoryService: CategoriesService,
              private messageService: MessageService,
              private locationService: Location,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#fff']
    })
    this.checkEditMode();
  }

  onCancel() {
    this.locationService.back();
  }

  onSubmit() {
    this.isSubmitted = true
    if (this.form.invalid) {
      return;
    }
    const category: Category = {
      id: this.currentCategoryID,
      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value,
      color: this.categoryForm.color.value
    };
    if (this.editMode) {
      this.updateCategory(category);
    } else {
      this.addCategory(category);
    }
  }

  private addCategory(category: Category) {
    this.categoryService.createCategory(category).subscribe(
      () => {
        this.messageService.add(
          {
            severity: 'success',
            summary: 'Success',
            detail: `Category ${category.name} is created`
          });
        timer(1000).toPromise().then(() => {
          this.locationService.back();
        })
      },
      (() => {
        this.messageService.add(
          {
            severity: 'error',
            summary: 'Error',
            detail: `Category ${category.name} is NOT created`
          }
        );
      })
    );
  }

  private updateCategory(category: Category) {
    this.categoryService.updateCategory(category).subscribe(
      () => {
        this.messageService.add(
          {
            severity: 'success',
            summary: 'Success',
            detail: `Category ${category.name} is edit`
          });
        timer(2000).toPromise().then(() => {
          this.locationService.back();
        })
      },
      (() => {
        this.messageService.add(
          {
            severity: 'error',
            summary: 'Error',
            detail: `Category ${category.name} is NOT edit`
          }
        );
      })
    );
  }

  private checkEditMode() {
    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        this.editMode = true;
        this.currentCategoryID = params.id;
        this.categoryService.getCategoryById(params.id).subscribe(category => {
          this.categoryForm.name.setValue(category.name);
          this.categoryForm.icon.setValue(category.icon);
          this.categoryForm.color.setValue(category.color);
        })
      }
    });
  }

  get categoryForm() {
    return this.form.controls;
  }

}
