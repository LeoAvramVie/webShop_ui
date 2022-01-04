import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoriesService, Product, ProductsService} from "@lav/products";
import {timer} from "rxjs";
import {Location} from "@angular/common";
import {MessageService} from "primeng/api";
import {ActivatedRoute} from "@angular/router";

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
  categories = [];
  imageDisplay: string | ArrayBuffer;
  currentProductId: string;

  constructor(private formBuilder: FormBuilder,
              private categoriesService: CategoriesService,
              private locationService: Location,
              private productService: ProductsService,
              private messageService: MessageService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProducts();
    this.initForm();
    this.checkEditMode();
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid){
      return;
    }
    const productFormData = new FormData();

    Object.keys(this.productForm).map((key) => {
      productFormData.append(key, this.productForm[key].value)
    })

    if (this.editMode){
       this.updateProduct(productFormData);
    }else {
      this.addProduct(productFormData);
    }
  }

  onCancel() {
    this.locationService.back();
  }

  onImageUpload(event){
    const file = event.target.files[0];
    if (file){
      this.form.patchValue({image: file});
      this.form.get('image').updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result
      }
      fileReader.readAsDataURL(file)
    }
  }

  private updateProduct(productFormData: FormData){

    this.productService.updateProducts(productFormData, this.currentProductId).subscribe(
      () => {
        this.messageService.add(
          {
            severity: 'success',
            summary: 'Success',
            detail: `Product is edit`
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
            detail: `Product is NOT edit`
          }
        );
      })
    );
  }

  private checkEditMode(){
    this.route.params.subscribe((params)=>{
      if (params.id){
        this.editMode = true;
        this.currentProductId = params.id;
        this.productService.getProductsById(params.id).subscribe(product => {
          this.productForm.name.setValue(product.name);
          this.productForm.category.setValue(product.category.id);
          this.productForm.brand.setValue(product.brand);
          this.productForm.price.setValue(product.price);
          this.productForm.countInStock.setValue(product.countInStock);
          this.productForm.isFeatured.setValue(product.isFeatured);
          this.productForm.description.setValue(product.description);
          this.productForm.richDescription.setValue(product.richDescription);
          this.imageDisplay = product.image;
          this.productForm.image.setValidators([]);
          this.productForm.image.updateValueAndValidity();
        })
      }
    })
  }

  private addProduct(productData: FormData){
    this.productService.createProducts(productData).subscribe(
      (product: Product) => {
        this.messageService.add(
          {
            severity: 'success',
            summary: 'Success',
            detail: `Product ${product.name} is created`
          });
        timer(1000).toPromise().then(() => {
          this.locationService.back();
        })
      },
      ((error) => {
        this.messageService.add(
          {
            severity: 'error',
            summary: 'Error',
            detail: `Product ${error.name} is NOT created`
          }
        );
      })
    )
  }

  private getProducts(){
     this.categoriesService.getCategories().subscribe((categories) => {
       console.log(categories)
       this.categories = categories;
     });
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
      image: ['', Validators.required],
      isFeatured: [false]
    })
  }

  get productForm() {
    return this.form.controls;
  }
}
