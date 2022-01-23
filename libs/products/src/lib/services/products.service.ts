import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Product } from '../models/product';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    apiUrlProducts = environment.apiUrl + 'products';

    constructor(private httpClient: HttpClient) {}

    getProducts(): Observable<Product[]> {
        return this.httpClient.get<Category[]>(this.apiUrlProducts);
    }

    createProducts(productsData: FormData): Observable<Product> {
        return this.httpClient.post<Product>(this.apiUrlProducts, productsData);
    }

    updateProducts(productData: FormData, productId: string): Observable<Product> {
        return this.httpClient.put<Product>(`${this.apiUrlProducts}/${productId}`, productData);
    }

    deleteProducts(productsId: string): Observable<Product> {
        return this.httpClient.delete<Product>(`${this.apiUrlProducts}/${productsId}`);
    }

    getProductsById(productsId: string): Observable<Product> {
        return this.httpClient.get<Product>(`${this.apiUrlProducts}/${productsId}`);
    }

    getFeaturedProducts(countNr: number): Observable<Product[]> {
        return this.httpClient.get<Product[]>(`${this.apiUrlProducts}/get/featured/${countNr}`);
    }
}
