import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Category} from "../models/category";
import {Observable} from "rxjs";
import {environment} from '@env/environment';
import {Product} from "../models/product";


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  apiUrlCategories = environment.apiUrl + 'products';

  constructor(private httpClient: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Category[]>(this.apiUrlCategories)
  }

  createProducts(products: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.apiUrlCategories, products)
  }

  updateProducts(products: Product): Observable<Product> {
    return this.httpClient.put<Product>(this.apiUrlCategories + '/' + products.id, products)
  }

  deleteProducts(productsId: string): Observable<Product> {
    return this.httpClient.delete<Product>(`${this.apiUrlCategories}/${productsId}`)
  }

  getProductsById(productsId: string): Observable<Product> {
    return this.httpClient.get<Product>(`${this.apiUrlCategories}/${productsId}`)
  }
}
