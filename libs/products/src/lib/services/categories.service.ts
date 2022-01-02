import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Category} from "../models/category";
import {Observable} from "rxjs";
import {environment} from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  apiUrlCategories = environment.apiUrl + 'categories';

  constructor(private httpClient: HttpClient) {
  }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.apiUrlCategories)
  }

  createCategory(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(this.apiUrlCategories, category)
  }

  updateCategory(category: Category): Observable<Category> {
    return this.httpClient.put<Category>(this.apiUrlCategories + '/' + category.id, category)
  }

  deleteCategory(categoryId: string): Observable<Category> {
    return this.httpClient.delete<Category>(`${this.apiUrlCategories}/${categoryId}`)
  }

  getCategoryById(categoryId: string): Observable<Category> {
    return this.httpClient.get<Category>(`${this.apiUrlCategories}/${categoryId}`)
  }
}
