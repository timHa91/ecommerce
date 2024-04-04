import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductCategory } from '../common/productCategory';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

interface GetResponseProductCategories {
  _embedded: {
    productCategory: ProductCategory[];
  }
}


@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  
  baseUrl = environment.baseUrlProductCategory;

  constructor(private http: HttpClient) { }

  getProductCategoriesFromBackend() : Observable<ProductCategory[]> {
    return this.http.get<GetResponseProductCategories>(this.baseUrl)
            .pipe(
              map(response => {
                console.log(response);
                return response._embedded.productCategory;
              })
            );
  }
}
