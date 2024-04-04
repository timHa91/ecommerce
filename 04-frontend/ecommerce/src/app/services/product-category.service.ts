import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductCategory } from '../models/productCategory';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { GetResponseProductCategories } from '../interfaces/get-response-product-categories';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService {
  baseUrl = environment.baseUrlProductCategory;

  constructor(private http: HttpClient) {}

  getProductCategoriesFromBackend(): Observable<ProductCategory[]> {
    return this.http
      .get<GetResponseProductCategories>(this.baseUrl)
      .pipe(map((response) => response._embedded.productCategory));
  }
}
