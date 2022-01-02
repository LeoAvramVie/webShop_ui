import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'admin-product-form',
  templateUrl: './product-form.component.html',
  styles: [
  ],
  encapsulation: ViewEncapsulation.Emulated
})
export class ProductFormComponent implements OnInit {

  form: FormGroup;
  editMode = false;
  isSubmitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }
  onSubmit() {
  }

  onCancel() {
  }

  private initForm(){
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: [''],
      isFeatured: ['']
    })
  }

  get productForm() {
    return this.form.controls;
  }
}
